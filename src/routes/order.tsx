import {createFileRoute} from '../route';
import {NativeOrder} from '../components/NativeOrder';
// @ts-ignore: CI generates route types concurrently.
export const Route=createFileRoute('/smokey-doughs-bolton/order')({head:()=>({meta:[{title:'Order | Smokey Doughs Bolton'}],links:[{rel:'canonical',href:'https://dn1m0z.github.io/smokey-doughs-bolton/order'}]}),component:()=> <NativeOrder catalogue={false}/>});