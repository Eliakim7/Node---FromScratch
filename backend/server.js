const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv").config(); //permet que la variable d'environnement soit connue dans tout le projet
const app = express();
const port = 4000;
const postRoutes = require("./routes/post.routes")

//connexion à la BDD
connectDB() //j'appelle la fonction connectDB()

//middleware
app.use (express.json());
app.use (express.urlencoded({extended:false}));


//lancer le server
app.listen(port, () => console.log("le serveur a démarré au port "+ port));

app.use("/post", postRoutes)