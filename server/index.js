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
const API_PORT = process.env.PORT || 5000;
app.use(express.json());

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../client/build')));

app.listen(API_PORT, () =>
	console.log("Listening on port " + API_PORT + "..."),
);
require("./cors")(app);

// DB connection ----------------------------------------------------------
mongoose
	.connect("mongodb+srv://jaroslav:eff52523@cluster0.pggcl.mongodb.net/mertadb?retryWrites=true&w=majority", { useNewUrlParser: true })
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

const webPageSchema = new mongoose.Schema({
	name: String,
	link: String,
	techInfo: {
		backend:String,
		db:String
	},
	description: String,
	dateAdded: {
		type: Date,
		default: Date.now,
	},
});

const programSchema = new mongoose.Schema({
	name: String,
	link: String,
	techInfo: {
		lang:String,
		
		db:String
	},
	description: String,
	dateAdded: {
		type: Date,
		default: Date.now,
	},
});

const Article = mongoose.model("Article", articleSchema);
const WebPage = mongoose.model("WebPage", webPageSchema);
const Program = mongoose.model("Program", programSchema);
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
function validateWebPage(webpage, required = true) {
	const schema = Joi.object({
		name: Joi.string().min(3),
		link: Joi.string().min(3),
		techInfo: {
			backend: Joi.string().min(2),
		
			db: Joi.string().min(3),
		},
		description: Joi.string().min(10),
	});

	return schema.validate({
		name: webpage.name,
		link: webpage.link,
		techInfo: {
			backend: webpage.backend,

			db: webpage.db,
		},
		description: webpage.description,
	});
}
function validateProgram(program, required = true) {
	const schema = Joi.object({
		name: Joi.string().min(3),
		link: Joi.string().min(3),
		techInfo: {
			lang: Joi.string().min(2),
			db: Joi.string().min(3),
		},
		description: Joi.string().min(10),
	});

	return schema.validate({
		name: program.name,
		link: program.link,
		techInfo: {
			lang: program.lang,
			db: program.db,
		},
		description: program.description,
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

app.get("/api/webpages", (req, res) => {
	let dbQuery = WebPage.find();
	dbQuery
		.then((webpages) => {
			res.json(webpages);
		})
		.catch((err) => {
			res.status(400).send("Chyba požadavku na webobé stránky!");
		});
});

app.get("/api/webpage/:id", (req, res) => {
	WebPage.findById(req.params.id, (err, webpage) => {
		// if (err || !result)
		if (err) res.status(404).send("Webová stránka s daným ID nebyla nalezena.");
		else res.json(webpage);
	});
});

app.get("/api/programs", (req, res) => {
	let dbQuery = Program.find();
	dbQuery
		.then((programs) => {
			res.json(programs);
		})
		.catch((err) => {
			res.status(400).send("Chyba požadavku na programy!");
		});
});

app.get("/api/program/:id", (req, res) => {
	Program.findById(req.params.id, (err, program) => {
		// if (err || !result)
		if (err) res.status(404).send("Program s daným ID nebyl nalezen.");
		else res.json(program);
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
				res.send("Nepodařilo se uložit článek!");
			});
	}
});
app.post("/api/webPage", (req, res) => {
	const { error } = validateWebPage(req.body);
	if (error) {
		res.status(400).send(error.details[0]);
	} else {
		WebPage.create(req.body)
			.then((result) => {
				res.json(result);
			})
			.catch((err) => {
				res.send("Nepodařilo se uložit web stránku!");
			});
	}
});

app.post("/api/program", (req, res) => {
	const { error } = validateProgram(req.body);
	if (error) {
		res.status(400).send(error.details[0]);
	} else {
		Program.create(req.body)
			.then((result) => {
				res.json(result);
			})
			.catch((err) => {
				res.send("Nepodařilo se uložit program!");
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
app.put("/api/webpage/:id", (req, res) => {
	const { error } = validateWebPage(req.body, false);
	if (error) {
		res.status(400).send(error.details[0]);
	} else {
		WebPage.findByIdAndUpdate(req.params.id, req.body, { new: true })
			.then((result) => {
				res.json(result);
			})
			.catch((err) => {
				res.send("Nepodařilo se uložit web stránku!");
			});
	}
});
app.put("/api/program/:id", (req, res) => {
	const { error } = validateProgram(req.body, false);
	if (error) {
		res.status(400).send(error.details[0]);
	} else {
		Program.findByIdAndUpdate(req.params.id, req.body, { new: true })
			.then((result) => {
				res.json(result);
			})
			.catch((err) => {
				res.send("Nepodařilo se uložit program!");
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

app.delete("/api/webpage/:id", (req, res) => {
	WebPage.findByIdAndDelete(req.params.id)
		.then((result) => {
			res.json(result);
		})
		.catch((err) => {
			res.send("Nepodařilo se smazat web stránku!");
		});
});

app.delete("/api/program/:id", (req, res) => {
	Program.findByIdAndDelete(req.params.id)
		.then((result) => {
			res.json(result);
		})
		.catch((err) => {
			res.send("Nepodařilo se smazat program!");
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
  