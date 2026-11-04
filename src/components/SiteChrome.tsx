import {useEffect,useRef,useState} from 'react';
import {PosterFooter} from './PosterSections';

const links=[
  {label:'Menu',path:'menu'},
  {label:'Deals',path:'deals'},
  {label:'Order online',path:'order'},
  {label:'Reviews',path:'reviews'},
  {label:'Find us',path:'find-us'},
  {label:'Contact',path:'contact'},
];

export function Header(){
  const [menuOpen,setMenuOpen]=useState(false);
  const headerRef=useRef<HTMLElement>(null);
  useEffect(()=>{
    if(!menuOpen)return;
    const onPointerDown=(event:PointerEvent)=>{
      if(headerRef.current && !headerRef.current.contains(event.target as Node))setMenuOpen(false);
    };
    const onKeyDown=(event:KeyboardEvent)=>{
      if(event.key==='Escape')setMenuOpen(false);
    };
    const onResize=()=>{
      if(window.innerWidth>980)setMenuOpen(false);
    };
    document.addEventListener('pointerdown',onPointerDown);
    document.addEventListener('keydown',onKeyDown);
    window.addEventListener('resize',onResize);
    return()=>{
      document.removeEventListener('pointerdown',onPointerDown);
      document.removeEventListener('keydown',onKeyDown);
      window.removeEventListener('resize',onResize);
    };
  },[menuOpen]);

  const path=window.location.pathname.replace(/\/$/,'');
  return <><div className="delivery-promo" role="note" aria-label="Delivery offer">
    <span className="delivery-promo-star" aria-hidden="true">✦</span>
    <strong>FREE DELIVERY</strong>
    <span>on orders over £12 within 3 miles</span>
  </div><header ref={headerRef} className="nav site-header">
    <a href="/smokey-doughs-bolton/" className="original-brand" aria-label="Smokey Doughs Bolton home">
      <img src="/smokey-doughs-bolton/assets/original-logo.png" alt="Smokey Doughs Bolton"/>
    </a>
    <button
      className="mobile-menu-toggle"
      type="button"
      aria-label={menuOpen?'Close navigation menu':'Open navigation menu'}
      aria-controls="site-main-navigation"
      aria-expanded={menuOpen}
      onClick={()=>setMenuOpen(open=>!open)}
    >
      <span className="mobile-menu-icon" aria-hidden="true"><span/><span/><span/></span>
      <span>{menuOpen?'Close':'Menu'}</span>
    </button>
    <nav id="site-main-navigation" className={'site-nav'+(menuOpen?' is-open':'')} aria-label="Main navigation">
      {links.map(link=>{
        const href='/smokey-doughs-bolton/'+link.path;
        return <a key={link.path} href={href} aria-current={path===href?'page':undefined} onClick={()=>setMenuOpen(false)}>{link.label}</a>;
      })}
    </nav>
  </header></>;
}
export function Footer(){return <PosterFooter/>}
