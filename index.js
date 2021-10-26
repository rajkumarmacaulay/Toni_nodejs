const express = require('express');
const multer = require("multer");
const bodyparser= require('body-parser');
var app =  express();
var upload = multer();

app.use(express.json());
app.use(upload.array());
app.use(bodyparser.json());
app.use(bodyparser.text());
app.use(bodyparser.urlencoded({ extended: true }));



// Post function for inbound/outbound
app.post('/mask/:value', function (req, res){

  //Data Initialization 
    var param = req.params.value;
    
     var arr = req.body;

    
   
    // var arr=["my account is 1234 5678 9012 2345", "and Im great. 123", 
    // "my credit card is 123456789", " 123 pin 1234 nip 1233", "qwerty@gmail.com"];
    var item =["my credit card is","my account is","my card number is",
    "my product is",
    "account number",
    "account #",
    // "pin number",
    "number on the back of my card",
    "number on back of my card","cvv", 
    "CVV",
    // "pin",
    "ID",
    "social security number",
    "social security #",
    "driver's license",
    "identity card",
    "firearms possesion license",
    "military identification card",
    "military card", "account#",
    "act#",
    "act #",
    "act number",
    "numbers on the back",
    "CVV2",
    "SIN",
    "Social Insurance Number",
    "@gmail",
    "@hotmail",
    "@yahoo",
    "Tax ID",
    "tax",
    "voter ID",
    "voter",
    "DL#",
    "DL",
    "TRN",
    "Tax Registration Number",
    "ACC",
    "Passport number-",
    "passport #",
    "Passport no",
    "passport number",
    "card number",
    "card number:",
    "CC",
    "C.C.",
    "c.c",
    "CC:",
    "C.C.:",
    "CC#",
    "C.C#",
    "C.C.#",
    "C. C.",
    "credit card"];

if(param=='inbound'){
    
    arr=search(arr);    // calling function

    function search (arr) {
      let i;
      console.log([arr]);
     for(i=0; i<arr.length; i++){
        var string=arr[i];
        if(item.some(the => string.includes(the))){

            
      string =string.replace(/(\d[ -]*){14,}/g, function(match, capture) {
        return new Array(match.length-4).join("*") + capture;
      });

      string=string.replace( /\b(^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$)\b/g,
      function(match, capture) { 
        return new Array(match.length-3).join("*") + capture.substr(capture.length-9);
      });


      string =string.replace( /\b(\d{3,4})\b/g,function(match, capture) { 
        return new Array(match.length-1).join("*") + capture.substr(capture.length-2);
      });
      arr[i]=string.replace( /\b(((\d{4}[ \-]?){3,4})|(\d{3}[\-|\s]?\d {5}[\-|\s]?\d{7})|\d{7,16})\b/g,
      function(match, capture) { 
        return new Array(match.length-1).join("*") + capture.substr(capture.length-2);
    });
              

    
         }
         
      }
      return arr;
    }}


    else if(param=='outbound'){
    
    arr=search(arr); 
    // calling function

    function search (arr) {
      let i;
      console.log([arr]);
     for(i=0; i<arr.length; i++){
        var string=arr[i];
        if(item.some(the => string.includes(the))){

            string =string.replace(/(\d[ -]*){14,}/g, function(match, capture) {
                return new Array(match.length-4).join("*") + capture;
              });
               
            string  =string.replace( /\b(\d{3,4})\b/g,function(match, capture) { 
              return new Array(match.length-1).join("*") + capture.substr(capture.length-2);
            });

            string=string.replace( /\b(^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$)\b/g,
              function(match, capture) { 
                return new Array(match.length-3).join("*") + capture.substr(capture.length-9);
              });
        
              
              arr[i]=string.replace( /\b(((\d{4}[ \-]?){3,4})|(\d{3}[\-|\s]?\d {5}[\-|\s]?\d{7})|\d{7,16})\b/g,
              function(match, capture) { 
                return new Array(match.length-1).join("*") + capture.substr(capture.length-2);
              });
              

        }}return arr;}}
  
        //Error Part
    else{
      arr="Enter correct url";
    }          
    
    res.json(arr);
});


  //Server listener
  app.listen(8000,() => {
    console.log(`Now listening on port 8000`)});