const express = require("express");
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

let players = [];
let compteur_question = 0;
let answer_chanteur = "";
let answer_chanson = "";

let Questionnaire_Random = [
{
  question: "Le nom du dernier album de booba ?",
  reponse: "Ultra",
  mode: "quizz_random"
   },
  {
  question: "Un jeu bac à sable composé de cubes par un studio suédois ?",
  reponse: "Minecraft",
  mode: "quizz_random"
   },
  {
  question: "Qui a écrit Germinal ?",
  reponse: "Zola",
  mode: "quizz_random"
   },
  {
  question: "Un youtubeur qui réalise des tests sur des jeux rétro ?",
  reponse: "Joueur du Grenier",
  mode: "quizz_random"
   },
  {
  question: "Complétez l'expression : Mettre du beurre dans les...",
  reponse: "Epinards",
  mode: "quizz_random"
   }
];

let Questionnaire_Manga = [
{
  question: "Le manga ayant inspiré Hunter X Hunter ?",
  reponse: "Yu Yu Hakusho",
  mode: "quizz_manga"
   },
  {
  question: "Le Héro principal de Black Clover ?",
  reponse: "Asta",
  mode: "quizz_manga"
   },
  {
  question: "Un héro qui veut devenir le roi des pirates ?",
  reponse: "Luffy",
  mode: "quizz_manga"
   },
  {
  question: "Un anime où tout le monde meurt à la fin ?",
  reponse: "Akame Ga Kill",
  mode: "quizz_manga"
   },
  {
  question: "La Deuxième transformation de sangoku ?",
  reponse: "Kaioken",
  mode: "quizz_manga"
   }
];

let Questionnaire_Music = [
  {
    question: "Trouve le nom de la chanson et du chanteur",
    chanteur: "Booba",
    chanson: "PGP",
    numero_musique: "0",
     path: "1.ogg",
  mode: "quizz_musique"
  },
  {
    question: "Trouve le nom de la chanson et du chanteur",
    chanteur: "13 Block",
    chanson: "Mood",
    numero_musique: "1",
     path: "2.ogg",
  mode: "quizz_musique"
  }
];
  
let Questionnaire_Cinema = [
{
     question: "Quel est le réalisateur de Minority Report ?",
     reponse: "Steven Spielberg",
  mode: "quizz_cinema"
   },
   {
     question: "Pour quel film de guerre Sam Mendes est-il connu ?",
     reponse: "1917",
  mode: "quizz_cinema"
   },
   {
     question: "L'Héroine de mad max fury road ?",
     reponse: "Furiosa",
  mode: "quizz_cinema"
   },
   {
     question: "Question en cours ?",
     reponse: "test",
  mode: "quizz_cinema"
   }
];


let Questionnaire_Rap = [
{
  question: "Trouve le nom de l'album et du rappeur :",
     album: "Temps Mort",
     singer: "Booba",
  mode: "quizz_rap"
   },
   {question: "Trouve le nom de l'album et du rappeur :",
     album: "Land",
     singer: "Kekra",
  mode: "quizz_rap"
   },
   {question: "Trouve le nom de l'album et du rappeur :",
     album: "Kolaf",
     singer: "La Fève",
  mode: "quizz_rap"
   },
   {question: "Trouve le nom de l'album et du rappeur :",
     album: "Destin",
     singer: "Ninho",
  mode: "quizz_rap"
   },
   {question: "Trouve le nom de l'album et du rappeur :",
     album: "Que La Famille",
     singer: "PNL",
  mode: "quizz_rap"
   },
   {question: "Trouve le nom de l'album et du rappeur :",
     album: "LA VIE EST BELLE",
     singer: "Gambi",
  mode: "quizz_rap"
   },
   {question: "Trouve le nom de l'album et du rappeur :",
     album: "Pacifique",
     singer: "Disiz",
  mode: "quizz_rap"
   },
   {question: "Trouve le nom de l'album et du rappeur :",
     album: "L'Amour",
     singer: "Disiz",
  mode: "quizz_rap"
   },
   {question: "Trouve le nom de l'album et du rappeur :",
     album: "Nuit",
     singer: "Jazzy Bazz",
  mode: "quizz_rap"
   },
   {question: "Trouve le nom de l'album et du rappeur :",
     album: "BLO",
     singer: "13 Block",
  mode: "quizz_rap"
   },
   {question: "Trouve le nom de l'album et du rappeur :",
     album: "Civilisation",
     singer: "Orelsan",
  mode: "quizz_rap"
   },
   {question: "Trouve le nom de l'album et du rappeur :",
     album: "Adios Bahamas",
     singer: "Népal",
  mode: "quizz_rap"
   },
   {question: "Trouve le nom de l'album et du rappeur :",
     album: "Dans la légende",
     singer: "PNL",
  mode: "quizz_rap"
   },
   {question: "Trouve le nom de l'album et du rappeur :",
     album: "Thank You God",
     singer: "F430",
  mode: "quizz_rap"
   },
   {question: "Trouve le nom de l'album et du rappeur :",
     album: "1994",
     singer: "Hamza",
  mode: "quizz_rap"
   },
   {question: "Trouve le nom de l'album et du rappeur :",
     album: "Spécial",
     singer: "Siboy",
  mode: "quizz_rap"
   },
   {question: "Trouve le nom de l'album et du rappeur :",
     album: "Projet Blue Beam",
     singer: "Freeze Corleone",
  mode: "quizz_rap"
   },
   {question: "Trouve le nom de l'album et du rappeur :",
     album: "Sans rêve",
     singer: "DTF",
  mode: "quizz_rap"
   },
   {question: "Trouve le nom de l'album et du rappeur :",
     album: "Lithopédion",
     singer: "Damso",
  mode: "quizz_rap"
   },
   {question: "Trouve le nom de l'album et du rappeur :",
     album: "Trinity",
     singer: "Laylow",
  mode: "quizz_rap"
   },
   {question: "Trouve le nom de l'album et du rappeur :",
     album: "Imany",
     singer: "Dinos",
  mode: "quizz_rap"
   },
   {question: "Trouve le nom de l'album et du rappeur :",
     album: "Jeannine",
     singer: "Lomepal",
  mode: "quizz_rap"
   },
   {question: "Trouve le nom de l'album et du rappeur :",
     album: "UMLA",
     singer: "Alpha Wann",
  mode: "quizz_rap"
   },
   {question: "Trouve le nom de l'album et du rappeur :",
     album: "A7",
     singer: "SCH",
  mode: "quizz_rap"
   },
   {question: "Trouve le nom de l'album et du rappeur :",
     album: "Le Monde Chico",
     singer: "PNL",
  mode: "quizz_rap"
   },
   {question: "Trouve le nom de l'album et du rappeur :",
     album: "Xeu",
     singer: "Vald",
  mode: "quizz_rap"
   },
   {question: "Trouve le nom de l'album et du rappeur :",
     album: "Ateyaba",
     singer: "Ateyaba",
  mode: "quizz_rap"
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
  
  
    socket.on('send_response_Music', reponse =>{
     if(reponse === Questionnaire_Music[compteur_question].chanteur){
      increasePoints(socket.id);
       answer_chanteur = Questionnaire_Music[compteur_question].chanteur;
       const leaderboard = players.sort((a,b) => b.points - a.points).slice(0,10);
       console.log(" 1 chanson : " +  answer_chanson+" / chanteur : "+answer_chanteur);
       io.emit('leaderboard', leaderboard);
    } 
      if(reponse === Questionnaire_Music[compteur_question].chanson){
      increasePoints(socket.id);
       answer_chanson = Questionnaire_Music[compteur_question].chanson; 
      const leaderboard = players.sort((a,b) => b.points - a.points).slice(0,10);
      console.log("2 chanson : " +  answer_chanson+" / chanteur : "+answer_chanteur);
      io.emit('leaderboard', leaderboard);
    } 
      if (Questionnaire_Music[compteur_question].chanson === answer_chanson && Questionnaire_Music[compteur_question].chanteur === answer_chanteur){
        console.log("3 chanson : " +  answer_chanson+" / chanteur : "+answer_chanteur);
        compteur_question += 1;
        updateGame_Music();
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
    io.emit('send_question_Rap', Questionnaire_Rap[compteur_question]);
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
  
      //Changement de theme
	socket.on('themeChangeMusic',function(data){
    compteur_question = 0;
    io.emit('send_question_Music', Questionnaire_Music[compteur_question]);
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

function updateGame_Music(){
  const leaderboard = players.sort((a,b) => b.points - a.points).slice(0,10);
    io.emit('send_question_Music_after', Questionnaire_Music[compteur_question]);
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
  io.emit('send_question_Rap', Questionnaire_Rap[compteur_question]);
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
