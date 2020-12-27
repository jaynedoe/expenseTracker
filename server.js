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

  let expenseObject = {
    title: itemTitle,
    category: itemCategory,
    amount: itemAmount,
  };

  expenseItems.push(expenseObject);

  res.redirect("/");
});

app.get("/dashboard", function (req, res) {
  let totalDailySpend = 0;
  let totalGrocerySpend = 0;
  let totalFunSpend = 0;
  let totalBillsSpend = 0;

  expenseItems.forEach(function (item) {
    totalDailySpend = Number(item.amount) + totalDailySpend;
  });

  expenseItems.forEach(function (item) {
    if (item.category === "Groceries") {
      totalGrocerySpend = Number(item.amount) + totalGrocerySpend;
    } else if (item.category === "Fun") {
      totalFunSpend = Number(item.amount) + totalFunSpend;
    } else if (item.category === "Bills") {
      totalBillsSpend = Number(item.amount) + totalBillsSpend;
    }
  });

  let yearlySpend = totalDailySpend * 365;

  res.render("dashboard", {
    totalDailySpend: totalDailySpend,
    yearlySpend: yearlySpend,
    totalGrocerySpend: totalGrocerySpend,
    totalBillsSpend: totalBillsSpend,
    totalFunSpend: totalFunSpend,
  });
});

app.listen(3000, function () {
  console.log("Server listening on port 3000. Press Ctr + C to exit.");
});
