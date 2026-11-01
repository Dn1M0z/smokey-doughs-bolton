import {ReviewsPanel} from '../components/PosterSections';
import {createFileRoute} from '../route';
import {Header,Footer} from '../components/SiteChrome';
// @ts-ignore: CI generates route types concurrently.
export const Route=createFileRoute('/smokey-doughs-bolton/reviews')({head:()=>({meta:[{title:'Google Reviews | Smokey Doughs Bolton'}],links:[{rel:'canonical',href:'https://dn1m0z.github.io/smokey-doughs-bolton/reviews'}]}),component:Page});
function Page(){return <><Header/><main><h1 className="sr-only">Customer reviews</h1><ReviewsPanel /></main><Footer/></>}
