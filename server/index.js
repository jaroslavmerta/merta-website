/*
 *  _____ _______         _                      _
 * |_   _|__   __|       | |                    | |
 *   | |    | |_ __   ___| |___      _____  _ __| | __  ___ ____
 *   | |    | | '_ \ / _ \ __\ \ /\ / / _ \| '__| |/ / / __|_  /
 *  _| |_   | | | | |  __/ |_ \ V  V / (_) | |  |   < | (__ / /
 * |_____|  |_|_| |_|\___|\__| \_/\_/ \___/|_|  |_|\_(_)___/___|
 *                   ___
 *                  |  _|___ ___ ___
 *                  |  _|  _| -_| -_|  LICENCE
 *                  |_| |_| |___|___|
 *
 * IT ZPRAVODAJSTVÍ  <>  PROGRAMOVÁNÍ  <>  HW A SW  <>  KOMUNITA
 *
 * Tento zdrojový kód pochází z IT sociální sítě WWW.ITNETWORK.CZ
 *
 * Můžete ho upravovat a používat jak chcete, musíte však zmínit
 * odkaz na http://www.itnetwork.cz
 */
const path = require('path');
const mongoose = require("mongoose");
const Joi = require("joi");
const express = require("express");
const app = express();
const API_PORT = 5000;
app.use(express.json());

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../client/build')));

app.listen(API_PORT, () =>
	console.log("Listening on port " + API_PORT + "..."),
);
require("./cors")(app);

// DB connection ----------------------------------------------------------
mongoose
	.connect("mongodb+srv://jaroslav:eff52523@cluster0.pggcl.mongodb.net/test?authSource=admin&replicaSet=atlas-5zpz7q-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true/mertadb", { useNewUrlParser: true })
	.then(() => console.log("Connected to MongoDB!"))
	.catch((error) => console.error("Could not connect to MongoDB... ", error));
// -----------------------------------------------------------------------------

// Mongoose schemas ------------------------------------------------------

const articleSchema = new mongoose.Schema({
	name: String,
	biography: String,
	dateAdded: {
		type: Date,
		default: Date.now,
	},
});

const Article = mongoose.model("Article", articleSchema);
// -----------------------------------------------------------------------------


const usersSchema = new mongoose.Schema({
	name: String,
	email: {
	  type: String,
	  unique: true,
	},
	password: {
	  type: String,
	  required: true,
	},
	dateAdded: {
	  type: Date,
	  default: Date.now,
	}
  });
  
const Users = mongoose.model('Users', usersSchema);

// Validation functions --------------------------------------------------------
function validateArticle(article, required = true) {
	const schema = Joi.object({
		name: Joi.string().min(3),
		biography: Joi.string().min(10),
	});

	return schema.validate({
		name: article.name,
		biography: article.biography,
	});
}



// -----------------------------------------------------------------------------

// GET requests ----------------------------------------------------------------

app.get("/api/articles", (req, res) => {

	
	let dbQuery = Article.find();
	dbQuery
		.then((articles) => {
			res.json(articles);
		})
		.catch((err) => {
			res.status(400).send("Chyba požadavku na články!");
		});
});

app.get("/api/article/:id", (req, res) => {
	Article.findById(req.params.id, (err, article) => {
		// if (err || !result)
		if (err) res.status(404).send("Článek s daným ID nebyl nalezen.");
		else res.json(article);
	});
});

// ---------------------------------------------------------------------------

// POST requests -------------------------------------------------------------

app.post("/api/article", (req, res) => {
	const { error } = validateArticle(req.body);
	if (error) {
		res.status(400).send(error.details[0]);
	} else {
		Article.create(req.body)
			.then((result) => {
				res.json(result);
			})
			.catch((err) => {
				res.send("Nepodařilo se uložit osobu!");
			});
	}
});
// -----------------------------------------------------------------------------

// PUT requests ----------------------------------------------------------------

app.put("/api/article/:id", (req, res) => {
	const { error } = validateArticle(req.body, false);
	if (error) {
		res.status(400).send(error.details[0]);
	} else {
		Article.findByIdAndUpdate(req.params.id, req.body, { new: true })
			.then((result) => {
				res.json(result);
			})
			.catch((err) => {
				res.send("Nepodařilo se uložit článek!");
			});
	}
});
// -----------------------------------------------------------------------------

// DELETE requsets ------------------------------------------------------------------

app.delete("/api/article/:id", (req, res) => {
	Article.findByIdAndDelete(req.params.id)
		.then((result) => {
			res.json(result);
		})
		.catch((err) => {
			res.send("Nepodařilo se smazat článek!");
		});
});
// -----------------------------------------------------------------------------

//user requests
app.post('/api/addUsers', (req, res) => {
	Users.find({ email: req.body.email })
	  .then((user) => {
		if (user.length == 0) {
		  Users.create(req.body)
			.then((result) => {
			  let data = {
				message: 'User Created Successfully!',
				data: result,
			  };
			  res.json(data);
			})
			.catch((err) => {
			  res.json(error);
			});
		} else {
		  let data = {
			message: 'User Already Exists!',
		  };
		  res.send(data);
		}
	  })
	  .catch((e) => {
		console.log(e);
		res.status(400).send(e);
	  });
  });
  
  //  ----------------------------------------------------------------
app.get('/api/getUser', (req, res) => {
console.log(req.query.email);
Users.find({ email: req.query.email, password: req.query.password })
	.then((user) => {
	if (user.length == 0) {
		let data = {
		message: 'No User Exists Against these Credentials!',
		data: [],
		};
		res.send(data);
	} else {
		let data = {
		message: 'User Available!',
		data: user,
		};
		res.json(data);
	}
	})
	.catch((e) => {
	console.log(e);
	res.status(400).send(e);
	});
  });

  // All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
	res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
  });
  