import {readFileSync,writeFileSync,mkdirSync} from 'node:fs';
const html=readFileSync('dist/index.html','utf8');
for(const route of ['menu','order','deals','checkout','reviews','find-us','contact']){mkdirSync('dist/'+route,{recursive:true});writeFileSync('dist/'+route+'/index.html',html.replace('<title>Smokey Doughs Bolton | Pizza, Burgers & More</title>','<title>'+route+' | Smokey Doughs Bolton</title>'))}
writeFileSync('dist/404.html',html);writeFileSync('dist/.nojekyll','');
writeFileSync('dist/robots.txt','User-agent: *\nAllow: /\nDisallow: /smokey-doughs-bolton/checkout/\nSitemap: https://dn1m0z.github.io/smokey-doughs-bolton/sitemap.xml\n');
writeFileSync('dist/sitemap.xml','<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+['','menu/','deals/','reviews/','find-us/','contact/'].map(p=>'<url><loc>https://dn1m0z.github.io/smokey-doughs-bolton/'+p+'</loc></url>').join('')+'</urlset>');
