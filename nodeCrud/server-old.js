const express = require('express');
const bodyParser= require('body-parser');
const app = express();
const MongoClient = require('mongodb').MongoClient



app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(bodyParser.json())

app.listen(3000, function() {
  console.log('listening on 3000')
})

// app.get(endpoint, callback)	

MongoClient.connect('mongodb+srv://adminNode:nodeAdmin@cluster0.38str.mongodb.net/test?retryWrites=true&w=majority', (err, client) => {
  if (err) return console.error(err)
  	console.log('Connected to Database')
	const db = client.db('star-wars-quotes')
	const quotesCollection = db.collection('quotes')

	// get all records
	app.get('/', (req, res) => {

  	db.collection('quotes').find().toArray()

	    .then(results => {
	    	res.render('index.ejs', { quotes: results })	      	
	    })
	    .catch(error => console.error(error))
	  // ...
	})


	// view one reocord
	app.get('/view/', (req, res) => {

	 db.collection("quotes").findOne({name : 'Alex James'}, function(err, result) {
	    if (err) throw err;
	    console.log(result.name);
	  	
	  	res.render('view.ejs', { quotes: result })
	  })	    
	})

	// insert record
	app.post('/quotes', (req, res) => {
  		quotesCollection.insertOne(req.body)
    	.then(result => {
    	res.redirect('/')
    })
    .catch(error => console.error(error))
	})

	// update record
	app.get('/update/:id', async (req, res) => {
	  const id = req.params.id
	  const temp = await (updateTemplet({id}))
	  res.render('update.ejs')
	})


	app.post('/update/:id', async (req, res) => {
  const id = req.params.id
  const record = await repo.update(id, req.body)
  console.log(`Record Updated : 
    \n${JSON.stringify(record, null, 2)}`)
  res.send('Record Updated')
})
	app.put('/quotes', (req, res) => {
		  quotesCollection.findOneAndUpdate(
		  	{ name: 'Darth Vadar' },
	  {
	    $set: {
	      name: req.body.name,
	      quote: req.body.quote
	    }
	  },	
	  {
	    upsert: true
	  }
	  )
	     .then(result => {
	       res.json('Success')
	     })
	    .catch(error => console.error(error))
	})

	// delete record
	app.delete('/quotes', (req, res) => {
		 quotesCollection.deleteOne(
			  { name: 'Alex James' },			
			)

	  	.catch(error => console.error(error))
	    .then(result => {
	      if (result.deletedCount === 0) {
	        return res.json('No quote to delete')
	      }
	      res.json('Deleted Darth Vadars quote')
	    })
	    .catch(error => console.error(error))
		})
	})