const express = require("express");
const path = require("path");
const exphbs = require('express-handlebars');
const logger = require("../Expressjs/middleware/logger");
const members = require("./Models/Member");

const app = express();

//Init Logger MiddleWare
app.use(logger);

//Body parser MiddleWare
app.use(express.json());

//Form Submission MiddleWare
app.use(express.urlencoded({extended:false}));

//Handlebars MiddleWare (To render hbs templates)
app.engine('handlebars', exphbs.engine({ defaultLayout: "main"}));
app.set('view engine', 'handlebars');

//To make public folder content(html, css) path static
//Only one method can only be used at time either render view
//Or make server side application i.e making content folder static to send content from there.
//Home page route --render view from api
app.get('/' , (req, res) => res.render("index", {
    title:'Member App',
    members : members
}));

//Routes for member/instrument api
app.use('/api/members', require("../Expressjs/routes/api/members"));
app.use('/api/instruments', require("../Expressjs/routes/api/instruments"));


//Adding static folder path 
app.use(express.static(path.join(__dirname, "public")));
app.get('/document' , (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));
app.get('/about' , (req, res) => res.sendFile(path.join(__dirname, 'public', 'about.html')));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`server is running on ${PORT}`));