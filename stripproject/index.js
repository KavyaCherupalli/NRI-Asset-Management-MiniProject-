const express = require('express') 
const bodyparser = require('body-parser') 
const path = require('path') 
const app = express() 
var PUBLISHABLE_KEY="pk_test_51N3DgfSC9lr50jggMMd3pdviTexdIJuS7ytHghmUWuSRLrQ7qHgvwxTTKXecbRvM6FzhTxlXZ6ltXlCU7Pm6BXeu00SCz1zwIW"
var  SECRET_KEY="sk_test_51N3DgfSC9lr50jggT4oNBJoSrqC1HGtXWa7QJ08Dw2YMQEvRmDmjooy7CktZdUo9Ox6URj00jfI05Ent0u2wl1ZG00tW6ut9n5"
const stripe = require('stripe')(SECRET_KEY) 
const port = process.env.PORT || 3000 
app.use(bodyparser.urlencoded({extended:false})) 
app.use(bodyparser.json()) 
// View Engine Setup 
app.set('views', path.join(__dirname, 'views')) 
app.set('view engine', 'ejs') 
app.get('/', function(req, res){ 
	res.render('Home', { 
	key: PUBLISHABLE_KEY 
	}) 
}) 
app.listen(port, function(error){ 
	if(error) throw error 
	console.log("Server created Successfully") 
}) 
app.post('/payment', function(req, res){ 

	// Moreover you can take more details from user 
	// like Address, Name, etc from form 
	stripe.customers.create({ 
		email: req.body.stripeEmail, 
		source: req.body.stripeToken,
		name: 'Cherupally Kavya', 
		address: { 
			line1: 'TC 9/4 Old MES colony', 
			postal_code: '110092', 
			city: 'New Delhi', 
			state: 'Delhi', 
			country: 'India', 
		} 
	}) 
	.then((customer) => { 
		return stripe.charge.create({ 
			amount: 7000,	 // Charing Rs 25 
			description: 'Web Development Product', 
			currency: 'USD', 
			customer: customer.id 
		}); 
		// console.log("heyyyyyyy")

	}) 
	.then((charge) => { 

		res.send("Success") // If no error occurs 
	}) 
	.catch((err) => { 
		// console.log("what")
		res.send(err)	 // If some error occurs 
	}); 
})
