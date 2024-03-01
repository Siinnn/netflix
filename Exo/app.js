const express = require('express')
const mysql = require("mysql2")
const moment = require('moment');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';





// framework web
const app = express()
const port = 5000
const salt = bcrypt.genSaltSync(saltRounds);
const hash = bcrypt.hashSync(myPlaintextPassword, salt);

const bdd= require('./model/pool.js')

app.use(express.urlencoded({ extended: false }))
// permet la recuperation des champs POST 
app.use(express.json())
// permet l'echange de donnée en format JSON

app.set('views', __dirname + '/view');
app.set("view engine", "ejs");


app.get('/', (req, res) => {
res.send('Bienvenue')
})


// FONCTIONS
app.get('/accueil', (req, res) => {
    res.render('accueil')
})

app.get('/acteur/:id', (req, res) => {
    bdd.getActeur(req.params.id, function(row){
        res.render('modif', {data : row, cat : "acteur"})
        
    })  
})

app.get('/real/:id', (req, res) => {
    bdd.getReal(req.params.id, function(row){
        res.render('modif', {data : row, cat : "real"})
    })  
})

app.get('/genre/:id', (req, res) => {
    bdd.getGenre(req.params.id, function(row){
        res.render('modif', {data : row, cat : "genre"})
    })  
})
app.get('/film/:id', (req, res) => {
    bdd.getFilm(req.params.id, function(row){
        bdd.getReals(function(raw){
            bdd.getGenres(function(riw){
        res.render('modif', {data : row,genres:riw,reals:raw ,cat : "film", moment: moment})
         })  
        })  
    })  
})


app.get('/acteurs', (req, res) => {
    bdd.getActeurs(function(row){
        res.render('liste', {data : row , cat : "acteur"})

    })  
})
app.get('/reals', (req, res) => {
    bdd.getReals(function(row){
        res.render('liste', {data : row, cat : "real"})

    })  
})

app.get('/genres', (req, res) => {
    bdd.getGenres(function(row){
        res.render('liste', {data : row, cat : "genre"})

    })  
})

app.get('/films', (req, res) => {
    bdd.getFilms(function(row){
        res.render('liste', {data : row, cat : "film", moment: moment})

    })  
})


app.get('/addpersonne', (req, res) => {
    bdd.getGenres(function(row){
            bdd.getReals(function(raw){
                res.render('addpersonne',{genres: row,reals:raw})
            })
    
    })

})

app.post('/send', (req, res) => {
   const post= req.body
    bdd.addPersonne(post)
    res.redirect('../'+ post.choix+'s')
})
app.post('/inscription', (req, res) => {
    const post= req.body
    
    bcrypt.genSalt(saltRounds,function(er, salt){
        bcrypt.hash(post.mdp,salt, function(err, hash){
        bdd.inscription(post,hash) 

     res.render('accueil')
        })
    })
    })

app.post('/connexion', (req, res) => {
        const post= req.body
         bdd.login(post)
         res.render('accueil')
        })

app.post('/modif', (req, res) => {
    const post= req.body
    bdd.modif(post)
    res.redirect('../'+ post.choix+'s')
 })
app.listen(port, ()=>{console.log('listen to port'+ port)})

