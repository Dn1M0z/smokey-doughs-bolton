import {createFileRoute} from '../route';
import {NativeOrder} from '../components/NativeOrder';
// @ts-ignore: CI generates route types concurrently.
export const Route=createFileRoute('/smokey-doughs-bolton/deals')({head:()=>({meta:[{title:'Pizza Meal Deals | Smokey Doughs Bolton'},{name:'description',content:'Explore all four Smokey Doughs pizza meal deals, from £17. Build your basket with pizzas, sides and drinks.'}],links:[{rel:'canonical',href:'https://dn1m0z.github.io/smokey-doughs-bolton/deals'}]}),component:()=> <NativeOrder deals/>});
