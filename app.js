const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));
app.listen(process.env.PORT||"3000", function() {
  console.log("started");
});
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/failure",function(req,res)
{
  res.redirect("/");
});
app.post("/", function(req, res) {
  var fname = req.body.fname;
  var lname = req.body.lname;
  var email = req.body.email;
  var data = {
    members: [{
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: fname,
        LNAME: lname
      }
    }]
  };

  var jdata = JSON.stringify(data);
  var option = {
    url: /*use your url*/sample,
    method: "POST",
    headers: {
      "Authorization": /*enter username and password*/
    },
    body: jdata
  };
  request(option, function(error, response, body) {
    if (error) {
      res.sendFile(__dirname+"/failure.html");
      console.log(error);
    } else {
      console.log(response.statusCode);
      if(response.statusCode==200)
      res.sendFile(__dirname+"/success.html");
      else
      res.sendFile(__dirname+"/failure.html");
    }
  });

});
