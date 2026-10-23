import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import {config} from '../content.mjs';
const root=path.resolve(import.meta.dirname,'../dist');
const files=fs.readdirSync(root,{recursive:true}).filter(p=>p.endsWith('.html'));
assert.equal(files.length,17);let links=0;
for(const file of files){const html=fs.readFileSync(path.join(root,file),'utf8');assert.match(html,/noindex,follow/);assert.doesNotMatch(html,/<form\b|https:\/\/apps\.apple\.com|https:\/\/play\.google\.com|googletagmanager|google-analytics/i);
 if(!['index.html'].includes(file))assert.equal((html.match(/<h1\b/g)||[]).length,1,file);
 for(const [,href] of html.matchAll(/(?:href|src)="([^"]+)"/g)){if(href.startsWith('mailto:')||href.startsWith('#'))continue;const u=new URL(href,config.url);if(u.origin!==new URL(config.url).origin)continue;assert.ok(u.pathname.startsWith(config.base+'/'),href);let p=decodeURIComponent(u.pathname.slice(config.base.length+1));if(p.endsWith('/'))p+='index.html';assert.ok(fs.existsSync(path.join(root,p)),`${file}: ${href}`);links++;}}
for(const locale of ['ja','en','ko']){const html=fs.readFileSync(path.join(root,locale,'index.html'),'utf8');assert.ok(html.includes('data-answer="correct"'));assert.ok(html.includes('data-answer="wrong"'));assert.ok(html.includes('role="status"'));assert.match(html,/<html lang="(?:ja|en|ko)"/);}
console.log(JSON.stringify({status:'STATIC_CHECK_PASS',htmlPages:files.length,internalReferencesChecked:links,languages:3,storeLinks:0,forms:0}));
