
const express = require('express');
const hbs     = require('hbs');
const app     = express();
const path    = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));
hbs.registerPartials(__dirname + "/views/partials");


app.get("/home", (req,res)=>{
  res.render(__dirname+'/views/index.hbs')
})

app.get("/beers", (req,res)=>{
  punkAPI.getBeers()
  .then(beers => {
    res.render(__dirname + "/views/beers.hbs", {beers:beers})
  })
  .catch(error => {
    console.log(error)
  })

})

app.get("/random-beer", (req,res)=>{
  punkAPI.getRandom()
  .then(beers => {
    res.render(__dirname +"/views/random-beer", {beers:beers})
  })
  .catch(error => {
    console.log(error)
  })
})

app.get('/', (req, res, next) => {
  res.render(__dirname+'/views/index.hbs');
});



app.listen(3000);
