const express=require('express');
const Router=express.Router();
const request=require('request');
const fs=require('fs');
const apiKey= "1fb720b97cc13e580c2c35e1138f90f8";
const apiBaseUrl = 'http://api.themoviedb.org/3';
const nowPlayingUrl = `${apiBaseUrl}/movie/now_playing?api_key=${apiKey}`
const imageBaseUrl = 'http://image.tmdb.org/t/p/w300';



var options = {
  url: 'https://github.com/openbangalore/bangalore/blob/master/bangalore/Education/Bangalore_schools.csv',
  json:true
};


Router.get("",(req,res,next)=>{
    let movieData;
    request({
       "uri":nowPlayingUrl,
        "json": true,
      },(error,response,body)=>{
          if(error)
          {
              console.log(error);
          }
          else{
            movieData=body.results;
            res.json(movieData);
          }
  
      });
})

Router.get("/files",(req,res,next)=>{
var da="";
fs.createReadStream('newfile.json').pipe(request.post('https://github.com/anilkaliya/Blog-post/blob/master/newone.json'))


});

Router.get('/:id',(req,res,next)=>{
const movieId=req.params.id;
const movieurl=`${apiBaseUrl}/movie/${movieId}?api_key=${apiKey}`
console.log("this is what i got");

request({
  "uri": movieurl,
   "json": true,
 },(error,response,body)=>{
     if(error)
     {
         console.log(error);
     }
     else{
     var  movieData=body;
       console.log(movieData);
       res.json(movieData);
     }

 });


}) 




module.exports=Router;