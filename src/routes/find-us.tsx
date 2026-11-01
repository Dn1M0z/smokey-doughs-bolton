import {VisitPanel} from '../components/PosterSections';
import {createFileRoute} from '../route';
import {Header,Footer} from '../components/SiteChrome';
// @ts-ignore: CI generates route types concurrently.
export const Route=createFileRoute('/smokey-doughs-bolton/find-us')({head:()=>({meta:[{title:'Find Us | Smokey Doughs Bolton'}],links:[{rel:'canonical',href:'https://dn1m0z.github.io/smokey-doughs-bolton/find-us'}]}),component:Page});
function Page(){return <><Header/><main><h1 className="sr-only">Find Smokey Doughs Bolton</h1><VisitPanel /></main><Footer/></>}
