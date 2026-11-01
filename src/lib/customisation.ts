import {menuItems} from './menu-data';
export type PizzaChoice={id:string;size:string;extras:string[];instructions:string};
export type Configuration={pizzas:PizzaChoice[];drinks:string[];instructions:string};
export const sizes=[{name:'7"',extra:0},{name:'9"',extra:200},{name:'12"',extra:400},{name:'14"',extra:600}];
export const dough=[{name:'vegan cheese',price:0},{name:'smokey garlic crust',price:50},{name:'truffle oil',price:100},{name:'sauce swirl',price:50},{name:'chip',price:100}];
export const toppings=['mozzarella','smokey pancetta','bbq chicken','smokey brisket','sucuk','German sausage','’nduja','smokey chicken','peperoni','chicken tikka','spicy beef','meatballs','donner meat','mushrooms','caramelised onion','hot honey','olives','pineapple','halloumi','red onions','Sweetcorn','Rokita Peppers'];
export const pizzas=menuItems.filter(p=>p.category==='Pizzas');
export const cans=menuItems.filter(p=>['COKE 0.33L','VIMTO','FANTA ORANGE 0.33L','SPRITE 0.33L','DR PEPPER 0.33L'].includes(p.name));
export const dealSpec=(id:string)=>{const item=menuItems.find(p=>p.id===id);const n=Number(item?.name.match(/MEAL DEAL (\d)/)?.[1]);return n?{count:n===3?1:2,size:n===1?'9"':n===2?'12"':'14"',drinks:n<3?2:1,bottle:n>=3}:null};
export const options=(size:string)=>[...dough,...(size==='7"'?[{name:'Stuffed Crust',price:100},...toppings.map(name=>({name:'Extra '+name,price:200}))]:[])];
export const extraPrice=(p:PizzaChoice)=>options(p.size).filter(o=>p.extras.includes(o.name)).reduce((n,o)=>n+o.price,0);
export const basePrice=(p:PizzaChoice)=>(pizzas.find(x=>x.id===p.id)?.price||0)+(sizes.find(x=>x.name===p.size)?.extra||0);
export const unitPrice=(id:string,c:Configuration)=>id==='pizza-bogof'?Math.max(...c.pizzas.map(basePrice),0)+c.pizzas.reduce((n,p)=>n+extraPrice(p),0):dealSpec(id)?(menuItems.find(p=>p.id===id)?.price||0)+c.pizzas.reduce((n,p)=>n+extraPrice(p),0):c.pizzas.length?basePrice(c.pizzas[0])+extraPrice(c.pizzas[0]):menuItems.find(p=>p.id===id)?.price||0;
export const newConfig=(id:string):Configuration=>{const item=menuItems.find(p=>p.id===id),spec=dealSpec(id);return {pizzas:Array.from({length:id==='pizza-bogof'?2:spec?spec.count:item?.category==='Pizzas'?1:0},()=>({id:spec||id==='pizza-bogof'?'':id,size:spec?.size||'',extras:[],instructions:''})),drinks:Array.from({length:spec?.drinks||0},()=>''),instructions:''}};
export function validConfig(id:string,c:Configuration){if(!c||!Array.isArray(c.pizzas)||!Array.isArray(c.drinks)||typeof c.instructions!=='string'||c.instructions.length>400)return false;
 const init=newConfig(id),spec=dealSpec(id);
 if(c.pizzas.length!==init.pizzas.length||c.drinks.length!==init.drinks.length)return false;
 if(id!=='pizza-bogof'&&!menuItems.some(p=>p.id===id))return false;
 return c.pizzas.every(p=>p&&pizzas.some(x=>x.id===p.id)&&(!spec&&id!=='pizza-bogof'?p.id===id:true)&&sizes.some(s=>s.name===p.size)&&(!spec||p.size===spec.size)&&Array.isArray(p.extras)&&new Set(p.extras).size===p.extras.length&&p.extras.every(e=>options(p.size).some(o=>o.name===e))&&typeof p.instructions==='string'&&p.instructions.length<=400&&(pizzas.find(x=>x.id===p.id)?.name!=='CREATE YOUR OWN'||p.instructions.trim().length>0))&&c.drinks.every(d=>typeof d==='string'&&d.trim().length>0&&d.length<=100&&(spec?.bottle||cans.some(x=>x.name===d)));
}
export function describe(c:Configuration){return [...c.pizzas.map((p,i)=>'Pizza '+(i+1)+': '+pizzas.find(x=>x.id===p.id)?.name+' · '+p.size+(p.extras.length?' · '+p.extras.join(', '):'')+(p.instructions?' · '+p.instructions:'')),...c.drinks.map((d,i)=>'Drink '+(i+1)+': '+d),c.instructions].filter(Boolean).join('\n')}
