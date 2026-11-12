import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
import {writeFile} from 'node:fs/promises';
const require=createRequire(`${process.env.AUDIT_TOOLS_DIR ?? '/tmp/portfolio-audit-tools'}/package.json`);const{chromium}=require('playwright');
const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_PATH || chromium.executablePath(),args:['--no-sandbox']});
try{
 const page=await browser.newPage({viewport:{width:390,height:844}});
 await page.route('**/*.api.sanity.io/**',r=>r.abort());
 let status=500,requests=0;await page.route('https://api.emailjs.com/**',async r=>{requests++;await r.fulfill({status,contentType:'text/plain',body:status===200?'OK':'Test failure'});});
 await page.goto('http://127.0.0.1:4175/#contact');await page.locator('#contact form').waitFor();await page.waitForTimeout(1000);
 const submit=page.getByRole('button',{name:'Send message'});await submit.click();assert.equal(await page.locator('.field-error').count(),3);assert.equal(await page.evaluate(()=>document.activeElement.id),'contact-name');
 await page.getByLabel('Your name').fill('Test Visitor');await page.getByLabel('Your email').fill('visitor@example.com');await page.getByLabel('Your message').fill('A sample project enquiry for a mocked test.');
 assert.equal(await page.getByLabel('Your email').evaluate(el=>getComputedStyle(el).fontSize),'16px');
 await submit.click();await page.getByRole('status').filter({hasText:'could not be sent'}).waitFor();assert.equal(await page.getByLabel('Your message').inputValue(),'A sample project enquiry for a mocked test.');
 status=200;await submit.click();await page.getByRole('status').filter({hasText:'Message sent.'}).waitFor();assert.equal(await page.getByLabel('Your message').inputValue(),'');
 await page.getByLabel('Your name').fill('Test Bot');await page.getByLabel('Your email').fill('bot@example.com');await page.getByLabel('Your message').fill('A bot test message.');await page.locator('#contact-website').evaluate(el=>el.value='spam');await submit.click();await page.waitForTimeout(300);assert.equal(requests,2);
 const result={inlineValidation:true,focusFirstError:true,failurePreservesDraft:true,successClearsForm:true,honeypotPreventsRequest:true,inputFontSize:16,allEmailRequestsMocked:true,realEmailsSent:0};await writeFile('/tmp/portfolio-ux-audit/after/contact.json',JSON.stringify(result,null,2));console.log(result);
}finally{await browser.close()}
