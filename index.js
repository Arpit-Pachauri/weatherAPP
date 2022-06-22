// https://api.openweathermap.org/data/2.5/weather?q=agra&appid=00394d0ef78ace6c29dfb4e469d3ccf6
const http=require("http");
const requests=require("requests");
const fs=require("fs");
const homefile=fs.readFileSync("home.html","utf-8");
const replaced=((tempval,orgval)=>{
  let temperature=tempval.replace("%tempval%",orgval.main.temp);
   temperature=temperature.replace("%tempmin%",orgval.main.temp_min);
   temperature=temperature.replace("%tempmax%",orgval.main.temp_max);
   temperature=temperature.replace("%location%",orgval.name);
   temperature=temperature.replace("%country%",orgval.sys.country);
   temperature=temperature.replace("%status%",orgval.weather[0].main);
  return temperature;
});
const server=http.createServer((req,res)=>{
  if(req.url=="/"){
    requests('https://api.openweathermap.org/data/2.5/weather?q=agra&appid=00394d0ef78ace6c29dfb4e469d3ccf6')
   .on("data", (chunk)=>{
       const objdata=JSON.parse(chunk);
       const arrData=[objdata];
      console.log(arrData[0].main.temp);
      const realtimeData=arrData.map((val)=>{
        return replaced(homefile,val);
      }).join("");
      res.write(realtimeData);
      // console.log(realtimeData);
     })
   .on('end', (err)=> {
    if (err) return console.log('connection closed due to errors', err);
    // console.log('end');
    res.end();
   });
  }  
});
server.listen(8000,"127.0.0.1");


