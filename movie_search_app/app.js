var express = require("express");
var app = express();
var request = require("request");
app.set("view engine","ejs");

//install body-parser to read data from the body
var body = require("body-parser");
app.use(body.urlencoded({extended: true}));
////install body-parser to read data from the body

var movieSearching;

app.get("/homePage", function(req, res) {
    res.render("homePage");
});

app.get("/", function(req, res) {
    res.render("homePage"); 
});

/*app.post("/homePage", function(req, res){
    movieSearching = body.query.movieName;
    console.log(movieSearching);
    res.redirect("/search");
});*/

app.get("/search", function(req, res){
    movieSearching = req.query.movieName;
    //console.log(movieSearching);
    var url = "http://www.omdbapi.com/?s=" + movieSearching + "&apikey=thewdb";
    request(url, function(error, respone, body) {
        if(!error && respone.statusCode == 200){
            var parseData = JSON.parse(body);
            res.render("search.ejs", {data : parseData}); 
        }
    });    
});



app.listen(process.env.PORT,process.env.IP, function(){
    console.log("Movie Search Server is stared!!!");
});