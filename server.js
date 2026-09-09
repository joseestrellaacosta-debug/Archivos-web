const http=require("http"),fs=require("fs"),path=require("path");
const port=process.env.PORT||3000, root=__dirname;
const types={".html":"text/html; charset=utf-8",".js":"text/javascript; charset=utf-8",".css":"text/css; charset=utf-8",".json":"application/json; charset=utf-8"};
http.createServer((req,res)=>{
 if(req.url==="/api/data"){res.writeHead(200,{"Content-Type":types[".json"],"Cache-Control":"no-store"});return res.end(fs.readFileSync(path.join(root,"data.json")))}
 let p=req.url.split("?")[0]; if(p==="/")p="/index.html";
 let file=path.join(root,p);
 if(!file.startsWith(root)||!fs.existsSync(file)||fs.statSync(file).isDirectory()){res.writeHead(404);return res.end("Not found")}
 let ext=path.extname(file);res.writeHead(200,{"Content-Type":types[ext]||"application/octet-stream"});res.end(fs.readFileSync(file));
}).listen(port,()=>console.log(`Registro app listening on ${port}`));