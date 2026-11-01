import {validConfig} from './customisation';
import type {Configuration} from './customisation';
export type BasketLine={id:string;quantity:number;config:Configuration};
export type Customer={name:string;phone:string;email:string;method:'collection'|'delivery';address:string;address2:string;city:string;postcode:string;notes:string};
export const emptyCustomer:Customer={name:'',phone:'',email:'',method:'collection',address:'',address2:'',city:'',postcode:'',notes:''};
export function customerErrors(c:Customer){const e:Record<string,string>={};
if(c.name.trim().length<2)e.name='Enter your full name.';
if(!/^(?:\+?\d[\d ()-]{7,18}\d)$/.test(c.phone.trim()))e.phone='Enter a valid contact phone number.';
if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(c.email.trim()))e.email='Enter a valid email address.';
if(c.method==='delivery'){if(c.address.trim().length<5)e.address='Enter your house number or name and street.';if(!c.city.trim())e.city='Enter your town or city.';if(!/^[A-Z]{1,2}[0-9][A-Z0-9]?\s*[0-9][A-Z]{2}$/i.test(c.postcode.trim()))e.postcode='Enter a valid UK postcode.'}
return e;}
export function parseBasket(raw:string|null):BasketLine[]{try{const data=JSON.parse(raw||'[]');if(!Array.isArray(data)||data.length>200)return [];return data.filter((x)=>{try{return x&&typeof x.id==='string'&&Number.isInteger(x.quantity)&&x.quantity>0&&x.quantity<=20&&validConfig(x.id,x.config)}catch{return false}})}catch{return []}}
