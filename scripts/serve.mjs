import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
import {config} from '../content.mjs';
const root=path.resolve(import.meta.dirname,'../dist'),port=Number(process.env.PORT??4321);
const mime={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'application/javascript; charset=utf-8','.png':'image/png'};
http.createServer(async(req,res)=>{try{let p=decodeURIComponent(new URL(req.url,'http://127.0.0.1').pathname);if(!p.startsWith(config.base+'/')){res.writeHead(302,{Location:config.base+'/ja/'}).end();return;}p=p.slice(config.base.length+1);if(p.endsWith('/'))p+='index.html';const file=path.resolve(root,p);if(!file.startsWith(root+'/'))throw Error('path');const data=await fs.readFile(file);res.writeHead(200,{'Content-Type':mime[path.extname(file)]??'application/octet-stream','Cache-Control':'no-store'}).end(data);}catch{res.writeHead(404).end('Not found');}}).listen(port,'127.0.0.1',()=>console.log(`Local: http://127.0.0.1:${port}${config.base}/ja/`));
