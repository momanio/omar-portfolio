import {createRequire} from 'node:module';
import{mkdir,writeFile,readFile}from'node:fs/promises';
const require=createRequire(`${process.env.AUDIT_TOOLS_DIR ?? '/tmp/portfolio-audit-tools'}/package.json`);
const{chromium}=require('playwright');const{AxeBuilder}=require('@axe-core/playwright');
const phase=process.argv[2]??'before';const base='http://127.0.0.1:4173';const dir=`/tmp/portfolio-ux-audit/${phase}`;await mkdir(dir,{recursive:true});
const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_PATH || chromium.executablePath(),args:['--no-sandbox']});
async function newPage(options={}){const context=await browser.newContext(options);return context.newPage();}
const report={phase,date:new Date().toISOString(),viewports:[],scenarios:{},seo:{},console:[],errors:[]};const cms=new Map();
const sections=['hero','about','Tech','experience','projects','contact'];
async function proxy(page,mode='success'){
 await page.route('**/*.api.sanity.io/**',async route=>{
 const url=route.request().url();
 if(mode==='slow')await new Promise(r=>setTimeout(r,7000));
 if(mode==='failure'){await route.fulfill({status:503,contentType:'application/json',body:'{"error":"Test unavailable"}'});return;}
 if(!cms.has(url)){const response=await page.request.get(url);cms.set(url,await response.text());}
 await route.fulfill({status:200,contentType:'application/json',headers:{'access-control-allow-origin':'*'},body:cms.get(url)});
 });
}
async function settle(page){await page.waitForTimeout(1800);await page.evaluate(()=>document.fonts.ready);}
async function collect(page){return page.evaluate(()=>({
 width:innerWidth,overflow:document.documentElement.scrollWidth>innerWidth,documentWidth:document.documentElement.scrollWidth,
 sections:[...document.querySelectorAll('section[id]')].map(el=>({id:el.id,top:el.getBoundingClientRect().top+scrollY,height:el.offsetHeight})),
 targets:[...document.querySelectorAll('a,button,input,textarea,[role="button"],[onclick]')].filter(el=>el.getClientRects().length>0&&getComputedStyle(el).visibility!=='hidden').map(el=>{const r=el.getBoundingClientRect();return{tag:el.tagName,label:el.getAttribute('aria-label')||el.textContent.trim().slice(0,60),w:r.width,h:r.height,font:getComputedStyle(el).fontSize}}),
 h1:[...document.querySelectorAll('h1')].map(el=>el.textContent),headings:[...document.querySelectorAll('h1,h2,h3')].map(el=>({tag:el.tagName,text:el.textContent.trim().slice(0,80)})),main:document.querySelectorAll('main').length,
 resources:performance.getEntriesByType('resource').map(r=>({name:r.name,type:r.initiatorType,transfer:r.transferSize,encoded:r.encodedBodySize,decoded:r.decodedBodySize,duration:r.duration})),
 images:[...document.images].map(i=>({src:i.currentSrc,alt:i.alt,w:i.width,h:i.height,naturalWidth:i.naturalWidth,loading:i.loading})),
 bodyText:document.body.innerText.slice(0,1200),animations:document.getAnimations().filter(a=>a.playState==='running').length,
}));}
try{
 for(const [width,height]of[[360,740],[390,844],[768,1024],[1280,800],[1440,900]]){
 const page=await newPage({viewport:{width,height}});await proxy(page);page.on('pageerror',e=>report.errors.push(e.message));
 page.on('console',e=>{if(['error','warning'].includes(e.type()))report.console.push(e.text().slice(0,400))});
 await page.goto(base,{waitUntil:'networkidle'});await settle(page);
 await page.screenshot({path:`${dir}/${width}-initial.png`});
 for(const id of sections){const locator=id==='hero'?page.locator('section').first():page.locator(`[id="${id}"]`);if(await locator.count()){await locator.first().scrollIntoViewIfNeeded();await page.waitForFunction(id=>!document.querySelector(`[id="${id}"][aria-busy="true"]`),id==='hero'?'top':id);await page.waitForTimeout(350);await locator.first().screenshot({path:`${dir}/${width}-${id}.png`});}}
 await page.evaluate(()=>scrollTo(0,0));await page.waitForTimeout(300);await page.screenshot({path:`${dir}/${width}-full.png`,fullPage:true});
 const geometry=await collect(page);geometry.axe=(await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze()).violations.map(v=>({id:v.id,impact:v.impact,description:v.description,nodes:v.nodes.map(n=>({target:n.target,summary:n.failureSummary})).slice(0,20)}));
 geometry.smallTargets=geometry.targets.filter(t=>t.w<44||t.h<44);
 const openButtons=page.locator('[data-project-open]');const routes=[];
 for(let i=0;i<await openButtons.count();i++){await openButtons.nth(i).focus();await page.keyboard.press('Enter');await page.locator('dialog[open]').waitFor();await page.waitForTimeout(550);routes.push({hash:new URL(page.url()).hash,title:await page.locator('dialog[open] h2').textContent()});await page.screenshot({path:`${dir}/${width}-route-${i+1}.png`});await page.keyboard.press('Escape');await page.waitForFunction(()=>!document.querySelector('dialog[open]'));}
 geometry.routes=routes;
 await page.goto(`${base}/__audit_missing`);await page.waitForTimeout(300);geometry.notFound=await page.locator('body').innerText();await page.screenshot({path:`${dir}/${width}-404.png`,fullPage:true});
 report.viewports.push(geometry);await writeFile(`${dir}/browser.json`,JSON.stringify(report,null,2));await page.close();
 }
 for(const mode of['raw','slow','failure','4g']){
 const page=await newPage({viewport:{width:390,height:844}});if(mode!=='raw')await proxy(page,mode);if(mode==='4g'){const cdp=await page.context().newCDPSession(page);await cdp.send('Network.enable');await cdp.send('Network.emulateNetworkConditions',{offline:false,latency:150,downloadThroughput:1600000/8,uploadThroughput:750000/8,connectionType:'cellular4g'});await cdp.send('Emulation.setCPUThrottlingRate',{rate:4});}await page.goto(base,{waitUntil:'domcontentloaded'});await page.waitForTimeout(700);await page.screenshot({path:`${dir}/scenario-${mode}-early.png`});const early=await collect(page);await page.waitForTimeout(mode==='raw'?22000:mode==='failure'?12000:8000);await page.screenshot({path:`${dir}/scenario-${mode}-settled.png`});report.scenarios[mode]={earlyText:early.bodyText,settledText:(await collect(page)).bodyText};await page.close();
 }
 const reduced=await newPage({viewport:{width:390,height:844},reducedMotion:'reduce'});await proxy(reduced);await reduced.goto(base);await settle(reduced);report.scenarios.reduced=await collect(reduced);await reduced.screenshot({path:`${dir}/reduced.png`});await reduced.close();
 const keyboard=await newPage({viewport:{width:1280,height:800}});await proxy(keyboard);await keyboard.goto(base);await settle(keyboard);const tabStops=[];for(let i=0;i<16;i++){await keyboard.keyboard.press('Tab');tabStops.push(await keyboard.evaluate(()=>({tag:document.activeElement.tagName,label:document.activeElement.getAttribute('aria-label')||document.activeElement.textContent.trim().slice(0,60),outline:getComputedStyle(document.activeElement).outlineStyle})));}report.scenarios.keyboard=tabStops;await keyboard.close();
 const assets={};for(const path of['/og-image.png','/robots.txt','/sitemap.xml','/site.webmanifest','/favicon.ico','/apple-touch-icon.png']){const response=await newPage();const r=await response.request.get(base+path);assets[path]={status:r.status(),type:r.headers()['content-type'],size:(await r.body()).length};await response.close();}report.seo.assets=assets;
 report.seo.initialHTML=await(await fetch(base)).text();await writeFile(`${dir}/browser.json`,JSON.stringify(report,null,2));await writeFile(`/tmp/portfolio-ux-audit/cms-cache.json`,JSON.stringify([...cms]));console.log(JSON.stringify({phase,viewports:report.viewports.map(v=>({width:v.width,overflow:v.overflow,smallTargets:v.smallTargets.length,axe:v.axe.map(x=>x.id),main:v.main})),scenarios:report.scenarios.raw,seo:assets},null,2));
}finally{await browser.close()}
