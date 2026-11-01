import React from 'react';
import {createRoot} from 'react-dom/client';
import './styles.css';
import {Route as Page0} from './routes/index';
import {Route as Page1} from './routes/menu';
import {Route as Page2} from './routes/order';
import {Route as Page3} from './routes/deals';
import {Route as Page4} from './routes/checkout';
import {Route as Page5} from './routes/reviews';
import {Route as Page6} from './routes/find-us';
import {Route as Page7} from './routes/contact';
const pages:Record<string,any>={'':Page0,'menu':Page1,'order':Page2,'deals':Page3,'checkout':Page4,'reviews':Page5,'find-us':Page6,'contact':Page7};
const path=location.pathname.replace(/^\/smokey-doughs-bolton\/?/,'').replace(/\/$/,'');
const page=pages[path];
if(page){const metadata=page.head?.();for(const m of metadata?.meta||[]){if(m.title)document.title=m.title;else if(m.name){let el=document.querySelector('meta[name="'+m.name+'"]');if(!el){el=document.createElement('meta');el.setAttribute('name',m.name);document.head.append(el)}el.setAttribute('content',m.content)}}}
document.querySelector('link[rel="canonical"]')?.setAttribute('href','https://dn1m0z.github.io/smokey-doughs-bolton/'+path+(path?'/':''));
const Component=page?.component||(()=> <main><h1>Page not found</h1><a href="/smokey-doughs-bolton/">Return to Smokey Doughs</a></main>);
createRoot(document.getElementById('root')!).render(<Component/>);
