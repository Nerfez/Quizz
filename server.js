const express = require("express");
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

let players = [];
let compteur_question = 0;
let mode_jeu = "Cinéma";
let number = 0;

let Questionnaire_Random = [
{
  question: "Le nom du dernier album de booba ?",
  reponse: "Ultra"
   },
  {
  question: "Un jeu bac à sable composé de cubes par un studio suédois ?",
  reponse: "Minecraft"
   },
  {
  question: "Qui a écrit Germinal ?",
  reponse: "Zola"
   },
  {
  question: "Un youtubeur qui réalise des tests sur des jeux rétro ?",
  reponse: "Joueur du Grenier"
   },
  {
  question: "Complétez l'expression : Mettre du beurre dans les...",
  reponse: "Epinards"
   }
];

let Questionnaire_Manga = [
{
  question: "Le manga ayant inspiré Hunter X Hunter ?",
  reponse: "Yu Yu Hakusho"
   },
  {
  question: "Le Héro principal de Black Clover ?",
  reponse: "Asta"
   },
  {
  question: "Un héro qui veut devenir le roi des pirates ?",
  reponse: "Luffy"
   },
  {
  question: "Un anime où tout le monde meurt à la fin ?",
  reponse: "Akame Ga Kill"
   },
  {
  question: "La Deuxième transformation de sangoku ?",
  reponse: "Kaioken"
   }
];
  
let Questionnaire_Cinema = [
{
     question: "Quel est le réalisateur de Minority Report ?",
     reponse: "Steven Spielberg"
   },
   {
     question: "Pour quel film de guerre Sam Mendes est-il connu ?",
     reponse: "1917"
   },
   {
     question: "L'Héroine de mad max fury road ?",
     reponse: "Furiosa"
   },
   {
     question: "Question en cours ?",
     reponse: "test"
   }
];


let Questionnaire_Rap = [
{
     album: "Temps Mort",
     singer: "Booba"
   },
   {
     album: "Land",
     singer: "Kekra"
   },
   {
     album: "Kolaf",
     singer: "La Fève"
   },
   {
     album: "Destin",
     singer: "Ninho"
   },
   {
     album: "Que La Famille",
     singer: "PNL"
   },
   {
     album: "LA VIE EST BELLE",
     singer: "Gambi"
   },
   {
     album: "Pacifique",
     singer: "Disiz"
   },
   {
     album: "L'Amour",
     singer: "Disiz"
   },
   {
     album: "Nuit",
     singer: "Jazzy Bazz"
   },
   {
     album: "BLO",
     singer: "13 Block"
   },
   {
     album: "Civilisation",
     singer: "Orelsan"
   },
   {
     album: "Adios Bahamas",
     singer: "Népal"
   },
   {
     album: "Dans la légende",
     singer: "PNL"
   },
   {
     album: "Thank You God",
     singer: "F430"
   },
   {
     album: "1994",
     singer: "Hamza"
   },
   {
     album: "Spécial",
     singer: "Siboy"
   },
   {
     album: "Projet Blue Beam",
     singer: "Freeze Corleone"
   },
   {
     album: "Sans rêve",
     singer: "DTF"
   },
   {
     album: "Lithopédion",
     singer: "Damso"
   },
   {
     album: "Trinity",
     singer: "Laylow"
   },
   {
     album: "Imany",
     singer: "Dinos"
   },
   {
     album: "Jeannine",
     singer: "Lomepal"
   },
   {
     album: "UMLA",
     singer: "Alpha Wann"
   },
   {
     album: "A7",
     singer: "SCH"
   },
   {
     album: "Le Monde Chico",
     singer: "PNL"
   },
   {
     album: "Xeu",
     singer: "Vald"
   },
   {
     album: "Ateyaba",
     singer: "Ateyaba"
   }
];

app.use(express.static(__dirname+'/public'));

app.get("/", (request, response) => {
  response.sendFile(__dirname + "/views/index.html");
});

/*
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});*/

io.on('connection', function(socket){
  socket.on('user_join', (name) => {
    const player = {
      id: socket.id,
      name,
      points: 0
    }
    //on ajoute le joueur a la liste de joueurs
    players.push(player);
    
    console.log(name, ' vient de se connecter');
    
    console.log(players);
    
    updateGame_Cinema();
    
  });  
  
  socket.on('send_response_Cinema', reponse =>{
     if(reponse == Questionnaire_Cinema[compteur_question].reponse){
      increasePoints(socket.id);
       compteur_question += 1;
       updateGame_Cinema();
    }
  });
  
    socket.on('send_response_Manga', reponse =>{
     if(reponse == Questionnaire_Manga[compteur_question].reponse){
      increasePoints(socket.id);
       compteur_question += 1;
       updateGame_Manga();
    }
  });
  
    socket.on('send_response_Random', reponse =>{
     if(reponse == Questionnaire_Random[compteur_question].reponse){
      increasePoints(socket.id);
       compteur_question += 1;
       updateGame_Random();
    }
  });
  
    socket.on('send_response_Rap', reponse =>{
     if(reponse == Questionnaire_Rap[compteur_question].album){
      increasePoints(socket.id);
       Questionnaire_Rap[compteur_question].album = "qmpfijdqz349824qZD3Q2";
       updateGame_Rap();
    } else if(reponse == Questionnaire_Rap[compteur_question].singer){
      increasePoints(socket.id);
       Questionnaire_Rap[compteur_question].singer = "qmpfijdqz349824qZD3Q2"; 
       updateGame_Rap();
    } 
      if (Questionnaire_Rap[compteur_question].singer == "qmpfijdqz349824qZD3Q2" && Questionnaire_Rap[compteur_question].album == "qmpfijdqz349824qZD3Q2"){
        compteur_question += 1;
      }
  });
  
  //Récupération de l'image
	socket.on('user_image',function(image){
		io.emit('addimage',image);
	});
  
  //Changement de theme
	socket.on('themeChangeRAP',function(data){
    compteur_question = 0;
    io.emit('send_question_Rap', "Trouve le nom de l'album et du rappeur");
	});
  
    //Changement de theme
	socket.on('themeChangeManga',function(data){
    compteur_question = 0;
    io.emit('send_question_Manga', Questionnaire_Manga[compteur_question]);
	});
  
    //Changement de theme
	socket.on('themeChangeCinema',function(data){
    compteur_question = 0;
    io.emit('send_question_Cinema', Questionnaire_Cinema[compteur_question]);
	});
  
    //Changement de theme
	socket.on('themeChangeRandom',function(data){
    compteur_question = 0;
    io.emit('send_question_Random', Questionnaire_Random[compteur_question]);
	});
  
  socket.on('disconnect', function(){
    //on retire le joueur de la liste
    players = [...players.filter(player => player.id !== socket.id)];
    console.log(socket.id, ' vient de se deconnecter');
  });
});

function updateGame_Cinema(){
  const leaderboard = players.sort((a,b) => b.points - a.points).slice(0,10);
    io.emit('send_question_Cinema', Questionnaire_Cinema[compteur_question]);
    
    io.emit('leaderboard', leaderboard);
}

function updateGame_Manga(){
  const leaderboard = players.sort((a,b) => b.points - a.points).slice(0,10);
    io.emit('send_question_Manga', Questionnaire_Manga[compteur_question]);
    
    io.emit('leaderboard', leaderboard);
}
    

function updateGame_Random(){
  const leaderboard = players.sort((a,b) => b.points - a.points).slice(0,10);
  io.emit('send_question_Random', Questionnaire_Random[compteur_question]);
    io.emit('leaderboard', leaderboard);
}

function updateGame_Rap(){
  const leaderboard = players.sort((a,b) => b.points - a.points).slice(0,10);
    io.emit('leaderboard', leaderboard);
}


function increasePoints(id){
  players = players.map(player => {
    if(player.id == id){
      return {
        ...player,
        points: player.points + 1
      }
    } else {
      return player;
    }
  });
}

http.listen(3000, function(){
  console.log('listening on : 3000');
});