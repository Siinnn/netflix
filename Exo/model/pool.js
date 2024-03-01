const connect = require('./mysqlconfig.js')
const bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';

exports.getActeur = function(idacteur, cb){
    connect.query('SELECT * FROM acteur WHERE id_acteur ='+ idacteur,
    function(err,result){
        cb(...result)//cb est une fonction de callback 
    })
}
exports.getReal = function(idreal, cb){
    connect.query('SELECT * FROM `real` WHERE id_real = '+ idreal,
    function(err,result){
        cb(...result)//cb est une fonction de callback 
    })
}
exports.getGenre = function(idgenres, cb){
    connect.query('SELECT * FROM genre WHERE id_genre ='+ idgenres,
    function(err,result){
        cb(...result)//cb est une fonction de callback 
    })
}
exports.getFilm = function(idfilm, cb){
    connect.query('SELECT * FROM film WHERE id_film ='+ idfilm,
    function(err,result){
        cb(...result)//cb est une fonction de callback 
    })
}

exports.getActeurs = function(cb){
    connect.query('SELECT * FROM acteur',
    function(err,result){
        cb(result)
    })
}

exports.getReals = function(cb){
    connect.query('SELECT * FROM `real`',
    function(err,result){
        cb(result)
    })
}

exports.getGenres = function(cb){
    connect.query('SELECT * FROM `genre`',
    function(err,result){
        cb(result)
    })
}

exports.getFilms = function(cb){
    connect.query('SELECT * FROM film',
    function(err,result){
        cb(result)
    })
}



exports.addPersonne = function(post){
    if ( post.choix=== "acteur"){
    connect.query('INSERT INTO acteur (`nom`,`prenom`,`photo`) VALUES (?,?,?);',
    [post.nom,post.prenom,post.photo],function(err,result){
       
    })
   
}
    else if( post.choix=== "real"){
        connect.query('INSERT INTO `real`(`nomr`,`prenom`,`photo`) VALUES (?,?,?);',
        [post.nom,post.prenom,post.photo],function(err,result){
       
        })
    }

    else if( post.choix=== "genre"){
        connect.query('INSERT INTO `genre`(`nom`) VALUES (?);',
        [post.nomg],function(err,result){
       
        })
    }
    else if( post.choix=== "film"){
        connect.query('INSERT INTO `film` (`titre`,`date_de_sortie`,`affiche`,`id_genre`,`id_real`) VALUES (?,?,?,?,?);',
        [post.titre,post.date,post.affiche,post.genre,post.real,post.id],function(err,result){
          
        })
    }

}

exports.modif = function(post){
   
    if ( post.choix=== "acteur"){
    connect.query('UPDATE acteur SET `nom`=?,`prenom`=?,`photo`=? WHERE `id_acteur`=?;',
    [post.nom,post.prenom,post.photo,post.id],function(err,result){
   
    })
   
}
    else if( post.choix=== "real"){
        connect.query('UPDATE `real` SET `nomr`=?,`prenom`=?,`photo`=? WHERE `id_real`=?;',
        [post.nom,post.prenom,post.photo,post.id],function(err,result){
       
        })
    }

    else if( post.choix=== "genre"){
        connect.query('UPDATE genre SET `nom`=? WHERE `id_genre`=?;',
        [post.nom,post.id],function(err,result){
       
        })
    }
    else if( post.choix=== "film"){
        connect.query('UPDATE `film` SET `titre`=?,`date_de_sortie`=?,`affiche`=?,`id_genre`=?,`id_real`=? WHERE `id_film`=?;',
        [post.titre,post.date,post.affiche,post.genre,post.real,post.id],function(err,result){
          
        })
    }

}

exports.inscription = function(post,hash){
    connect.query('INSERT INTO user (`email`,`mdp`,`nom`,`prenom`,`role`) VALUES (?,?,?,?,?);',
    [post.email,hash,post.nom,post.prenom,post.role],function(err,result){
       
    })
}

exports.login = function (login, cb) {
    connect.query(
      "SELECT *  FROM user WHERE email = ?",
      [login.email],
      function (err, user) {
        bcrypt.compare(login.mdp, user[0].mdp).then(function (result) {
            console.log(result);
          })
          .catch(err);
      }
    )
  }