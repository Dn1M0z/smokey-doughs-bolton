import {AboutPanel,MenuPanel,ReviewsPanel,VisitPanel} from '../components/PosterSections';
import {Header,Footer} from '../components/SiteChrome';
import { createFileRoute } from '../route';
import { useEffect, useRef, useState } from 'react';
export const Route = createFileRoute('/smokey-doughs-bolton/')({component: Home});
function Home(){
 const hero=useRef<HTMLElement>(null); const video=useRef<HTMLVideoElement>(null); const [paused,setPaused]=useState(false);
 useEffect(()=>{const mq=matchMedia('(prefers-reduced-motion: reduce)');let raf=0,current=0,target=0;const el=hero.current;const v=video.current;
 const layers=el?.querySelectorAll<HTMLElement>('[data-depth]');
 const tick=()=>{current+=(target-current)*.075; layers?.forEach(n=>{n.style.transform=`translate3d(0,${current*Number(n.dataset.depth)}px,0)`});if(Math.abs(target-current)>.1)raf=requestAnimationFrame(tick);else raf=0;};
 const scroll=()=>{target=Math.min(window.scrollY,window.innerHeight)* (innerWidth<700?.5:1);if(!raf)raf=requestAnimationFrame(tick)};
 const setup=()=>{cancelAnimationFrame(raf);raf=0;window.removeEventListener('scroll',scroll);if(mq.matches){v?.pause();v?.removeAttribute('src');v?.load();layers?.forEach(n=>n.style.transform='none');setPaused(true);}else{if(v){v.src='/smokey-doughs-bolton/assets/hero.mp4';v.play().catch(()=>{});}setPaused(false);window.addEventListener('scroll',scroll,{passive:true});scroll();}};
 setup();mq.addEventListener('change',setup);return()=>{cancelAnimationFrame(raf);window.removeEventListener('scroll',scroll);mq.removeEventListener('change',setup);};},[]);
 const toggle=()=>{const v=video.current;if(!v)return;if(v.paused){if(!v.getAttribute('src'))v.src='/smokey-doughs-bolton/assets/hero.mp4';v.play().catch(()=>{});setPaused(false)}else{v.pause();setPaused(true)}};
 return <><a className="skip" href="#main">Skip to content</a><Header/>
 <main id="main"><section className="hero poster-hero" ref={hero} aria-labelledby="hero-title"><div className="film-layer" data-depth="0.23"><video ref={video} poster="/smokey-doughs-bolton/assets/poster.webp" muted loop autoPlay playsInline preload="none" aria-label="Cinematic pizza film"/></div><div className="hero-shade"/><div className="hero-content" data-depth="-0.09"><img className="hero-original-logo" src="/smokey-doughs-bolton/assets/original-logo.png" alt="Smokey Doughs Bolton"/><h1 id="hero-title">SMOKEY<br/><span>DOUGHS</span><span className="sr-only"> Bolton</span></h1><a href="/smokey-doughs-bolton/menu" className="order">View menu <span>→</span></a></div><aside className="poster-hero-rail"><p className="eyebrow">BIG APPETITE?</p><h2>Proper<br/>takeaway</h2><p className="poster-rail-place">LITTLE LEVER · BOLTON</p><div data-depth="-0.19" className="poster-rail-features"><p><span>✦</span><b>Pizza night.<small>Find your favourite.</small></b></p><p><span>◉</span><b>Burger mood.<small>Meet our smash burgers.</small></b></p><p><span>→</span><b>Make it yours.<small>Build a basket here.</small></b></p></div><a href="/smokey-doughs-bolton/order" className="poster-rail-end">YOUR NIGHT.<strong>YOUR PICK.</strong></a></aside><button className="pause" onClick={toggle} aria-label={paused?'Play background video':'Pause background video'}>{paused?'▶ Play film':'Ⅱ Pause film'}</button></section>
 <div className="ticker" aria-hidden="true"><span>PIZZA ✳ SMASH BURGERS ✳ FATAYER ✳ CHICKEN ✳ PIZZA ✳ SMASH BURGERS ✳</span></div>
 <AboutPanel/><MenuPanel/><section className="home-deals"><div><p className="eyebrow">PIZZA MEAL DEALS</p><h2>Bring an appetite.<br/>Bring your people.</h2></div><div><p>Four ways to share pizza night, with sides and drinks. From £17.</p><a className="poster-button" href="/smokey-doughs-bolton/deals">Explore the deals →</a></div></section><ReviewsPanel/><VisitPanel/></main>
 <Footer/></>;
}
