import{createRequire}from'node:module';import{mkdir,writeFile}from'node:fs/promises';import{pathToFileURL}from'node:url';
const require=createRequire(`${process.env.AUDIT_TOOLS_DIR ?? '/tmp/portfolio-audit-tools'}/package.json`);const{chromium}=require('playwright');const{default:lighthouse}=await import(pathToFileURL(require.resolve('lighthouse')).href);
const phase=process.argv[2]??'before';const dir=`/tmp/portfolio-ux-audit/${phase}`;await mkdir(dir,{recursive:true});const summaries=[];
for(const [index,mode]of['mobile','desktop'].entries()){
 const port=9330+index;const context=await chromium.launchPersistentContext(`/tmp/portfolio-lh-${phase}-${mode}-${Date.now()}`,{headless:true,executablePath:process.env.CHROME_PATH || chromium.executablePath(),args:['--no-sandbox',`--remote-debugging-port=${port}`]});
 const apiCache=new Map();await context.route('**/*.api.sanity.io/**',async route=>{
 const url=route.request().url();if(!apiCache.has(url)){const response=await context.request.get(url);apiCache.set(url,await response.text());}
 await new Promise(r=>setTimeout(r,350));await route.fulfill({status:200,contentType:'application/json',headers:{'access-control-allow-origin':'*'},body:apiCache.get(url)});
 });
 try{
 const desktop=mode==='desktop';const settings={port,logLevel:'error',output:['json','html'],onlyCategories:['performance','accessibility','best-practices','seo'],formFactor:mode,screenEmulation:{mobile:!desktop,width:desktop?1440:390,height:desktop?900:844,deviceScaleFactor:1,disabled:false}};
 if(desktop)settings.throttling={rttMs:40,throughputKbps:10240,cpuSlowdownMultiplier:1,requestLatencyMs:0,downloadThroughputKbps:0,uploadThroughputKbps:0};
 const result=await lighthouse('http://127.0.0.1:4173/',settings);const lhr=result.lhr;await writeFile(`${dir}/lighthouse-${mode}.json`,result.report[0]);await writeFile(`${dir}/lighthouse-${mode}.html`,result.report[1]);
 const metric=(name)=>lhr.audits[name]?.numericValue??null;
 const summary={mode,scores:Object.fromEntries(Object.entries(lhr.categories).map(([name,value])=>[name,Math.round((value.score??0)*100)])),FCP:metric('first-contentful-paint'),LCP:metric('largest-contentful-paint'),CLS:metric('cumulative-layout-shift'),TBT:metric('total-blocking-time'),speedIndex:metric('speed-index'),bytes:metric('total-byte-weight'),resourceSummary:lhr.audits['resource-summary']?.details?.items,failed:Object.values(lhr.audits).filter(a=>a.score!==null&&a.score<1&&['binary','numeric'].includes(a.scoreDisplayMode)).map(a=>({id:a.id,title:a.title,score:a.score,value:a.displayValue,details:a.details})),environment:lhr.configSettings,version:lhr.lighthouseVersion};summaries.push(summary);console.log(JSON.stringify({...summary,failed:summary.failed.map(a=>({id:a.id,score:a.score,value:a.value}))},null,2));
 }finally{await context.close()}
}
await writeFile(`${dir}/lighthouse-summary.json`,JSON.stringify(summaries,null,2));
