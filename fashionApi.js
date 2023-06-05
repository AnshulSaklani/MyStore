let express = require("express");
let app = express();
app.use(express.json());
app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header(
		"Access-Control-Allow-Methods",
		"GET, POST, OPTIONS, PUT, PATCH, DELETE, HEAD"
	);
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept"
	);
	next();
});

//const port = 2410;
var port = process.env.PORT || 2410;
app.listen(port, () => console.log(`Node app listening on port ${port}!`));

let { items,users } = require("./fashion.js");

app.get("/orders", function(req, res) {
	let arr1 = items;
	res.send(arr1);
});

app.get("/products/:id", function(req, res) {
	let id = req.params.id;
	let item = items.find((itm) => Number(itm.id) === Number(id));
	if (item)
		res.send(item);
	else
		res.status(404).send("No Data Found");
});

app.get("/product/:category", function(req, res) {
	let category = req.params.category;
	console.log(items);
	let item = "";
	if(category != "All") {
		item = items.filter((itm) => itm.category === category);
		console.log(item);
	}
	else {
		item = items;
	}
	if (item)
		res.send(item);
	else
		res.status(404).send("No Data Found");
});

app.post("/products", function (req, res) {
	let body = req.body;
	let maxid = items.reduce((acc,curr) => (curr.id > acc ? curr.id : acc), 0);
	let newid = maxid + 1;
	let newItem = {...body, id:newid};
	items.push(newItem);
	res.send(newItem);
});

app.put("/products/:id", function(req, res) {
	let id = req.params.id;
	let body = req.body;
	let index = items.findIndex((itm) => Number(itm.id) === Number(id));
	if (index>=0) {
		let updatedItem = {...body};
		items[index] = updatedItem;
		res.send(updatedItem);
	}
	else {
		res.status(404).send("No item found");
	}
});

app.delete("/products/:id", function (req, res) {
	let id = req.params.id;
	let index = items.findIndex((itm) => Number(itm.id) === Number(id));
	if(index >= 0) {
		let deletedItem = items.splice(index, 1);
		res.send(deletedItem);
	}
	else {
		res.status(404).send("No item found");
	}
});

app.post("/login", function(req, res) {
  var email = req.body.email;
  var password = req.body.password;

  var cust = users.find(function(item) {
    return item.email === email && item.password === password;
  });
  console.log(cust);
	if(cust) {
		res.send(cust);
	}
	else {
		res.send("Invalid");
	}
});

app.post("/register", function(req, res) {
  const cust = {
    name: req.body.name,
		email: req.body.email,
    password: req.body.password,
    role: req.body.role
  };
	customers.unshift(cust);
  var customerRes= {
    name: req.body.name,
    role: req.body.role,
		email: req.body.email
  }

  res.send(customerRes);
});