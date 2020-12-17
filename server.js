const express = require("express");
const bodyParser = require("body-parser");

const app = express();

let expenseItems = [];

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

app.get("/", function (req, res) {

    res.render("home", { items: expenseItems });
 
});

app.post("/", function (req, res) {
  
  let itemTitle = req.body.title;
  let itemCategory = req.body.category;
  let itemAmount = req.body.amount;
  let date = new Date();
  let hour = date.getHours();
  let minutes = date.getMinutes;

  let expenseObject = {
      title: itemTitle,
      category: itemCategory,
      amount: itemAmount
  };

  console.log(expenseObject);
  
  expenseItems.push(expenseObject);

  res.redirect('/');  
});

app.get('/dashboard', function(req, res){
    res.render('dashboard');
});

app.listen(3000, function () {
  console.log("Server listening on port 3000. Press Ctr + C to exit.");
});
