import {chromium} from 'playwright';
import {spawn} from 'node:child_process';
import {mkdir} from 'node:fs/promises';

const base='http://127.0.0.1:4173/smokey-doughs-bolton/';
const routes=['','menu/','order/','deals/','checkout/','reviews/','find-us/','contact/'];
const phoneWidths=[320,360,375,390,430,768,980,1024];
const browser=await chromium.launch({headless:true,args:['--no-sandbox']});
const server=spawn('npx',['vite','preview','--host','127.0.0.1','--port','4173','--strictPort'],{stdio:'pipe'});
let failures=0;
async function waitForServer(){
  for(let i=0;i<50;i++){
    try{const r=await fetch(base);if(r.ok)return}catch{}
    await new Promise(r=>setTimeout(r,200));
  }
  throw new Error('Vite preview did not start');
}
await mkdir('mobile-audit-screenshots',{recursive:true});
try{
  await waitForServer();
  const page=await browser.newPage({viewport:{width:390,height:844},deviceScaleFactor:1,hasTouch:true,isMobile:true});
  const jsErrors=[];
  page.on('pageerror',e=>jsErrors.push(e.message));
  for(const width of phoneWidths){
    await page.setViewportSize({width,height:844});
    for(const route of routes){
      const url=base+route;
      const response=await page.goto(url,{waitUntil:'domcontentloaded',timeout:15000});
      await page.waitForTimeout(70);
      if(response?.status()!==200){console.log('BAD_STATUS',width,route,response?.status());failures++}
      const metrics=await page.evaluate(()=>{
        const docWidth=document.documentElement.scrollWidth;
        const overflow=[];
        if(docWidth>innerWidth+2){
          for(const el of document.querySelectorAll('body *')){
            const style=getComputedStyle(el),rect=el.getBoundingClientRect();
            if(style.display==='none'||style.visibility==='hidden'||style.position==='fixed')continue;
            if(rect.width>0 && (rect.left< -2 || rect.right>innerWidth+2) && !el.closest('[class*="film-layer"]') && !el.closest('[class*="ticker"]'))overflow.push({tag:el.tagName,cls:typeof el.className==='string'?el.className.slice(0,60):'',left:Math.round(rect.left),right:Math.round(rect.right)});
            if(overflow.length>=10)break;
          }
        }
        return {viewport:innerWidth,scrollWidth:docWidth,overflow,headerLinks:getComputedStyle(document.querySelector('.site-nav')).display,menuToggle:getComputedStyle(document.querySelector('.mobile-menu-toggle')).display};
      });
      if(metrics.scrollWidth>width+2){failures++;console.log('HORIZONTAL_OVERFLOW',width,route,JSON.stringify(metrics))}
      else console.log('PASS_WIDTH',width,route,metrics.scrollWidth);
      if(width<=980 && metrics.menuToggle==='none'){failures++;console.log('MISSING_MOBILE_MENU',width,route)}
      if(width>980 && metrics.menuToggle!=='none'){failures++;console.log('DESKTOP_MENU_SHOWN',width,route)}
      if(width===390 && ['','menu/','order/','checkout/'].includes(route)){
        await page.screenshot({path:'mobile-audit-screenshots/'+(route.replace('/','')||'home')+'-390.png'});
      }
    }
  }
  await page.setViewportSize({width:390,height:844});
  await page.goto(base+'menu/',{waitUntil:'domcontentloaded'});
  let toggle=page.getByRole('button',{name:'Open navigation menu'});
  await toggle.click();
  if((await page.getByRole('button',{name:'Close navigation menu'}).getAttribute('aria-expanded'))!=='true'){failures++;console.log('MENU_FAILED_TO_OPEN')}
  await page.getByRole('navigation',{name:'Main navigation'}).getByRole('link',{name:'Order online'}).click();
  if(!page.url().includes('/order/')){failures++;console.log('MENU_LINK_FAILED',page.url())}
  else console.log('PASS_MENU_LINK');
  const basketShortcut=page.getByRole('button',{name:/View basket/i});
  if(!(await basketShortcut.isVisible())){failures++;console.log('BASKET_SHORTCUT_MISSING')}
  else {await basketShortcut.click();console.log('PASS_BASKET_SHORTCUT')}
  const customize=page.getByRole('button',{name:/Customise /}).first();
  await customize.click();
  const dialog=page.locator('dialog.food-customiser');
  if(!(await dialog.isVisible())){failures++;console.log('CUSTOMISER_FAILED_TO_OPEN')}
  else {
    const rect=await dialog.boundingBox();
    if(rect && (rect.x< -2 || rect.x+rect.width>390+2)){failures++;console.log('CUSTOMISER_OVERFLOW',rect)}
    await page.screenshot({path:'mobile-audit-screenshots/customiser-390.png'});
    await page.getByRole('button',{name:'Close customisation'}).click();
    console.log('PASS_CUSTOMISER_OPEN_CLOSE');
  }
  if(jsErrors.length){failures+=jsErrors.length;console.log('JS_ERRORS',JSON.stringify(jsErrors))}
  else console.log('PASS_NO_JS_ERRORS');
}finally{
  await browser.close();
  server.kill();
}
console.log('TOTAL_FAILURES',failures);
if(failures)process.exitCode=1;
