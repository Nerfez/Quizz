const express = require("express");
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

let players = [];
let compteur_question = 0;
let answer_chanteur = "seopfjd36swrfoiq432df";
let answer_chanson = "seop35sdfjdswrfoiq432df";

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
    question: "Trouve le nom de la chanson et du groupe",
    chanteur: "13 Block",
    chanson: "Mood",
    numero_musique: "1",
     path: "2.ogg",
  mode: "quizz_musique"
  },
  {
    question: "Trouve le nom de la chanson et du chanteur",
    chanteur: "La fève",
    chanson: "Alchimie",
    numero_musique: "2",
     path: "3.ogg",
  mode: "quizz_musique"
  },
  {
    question: "Trouve le nom de la chanson et du chanteur",
    chanteur: "Lesram",
    chanson: "Cnn",
    numero_musique: "3",
     path: "4.ogg",
  mode: "quizz_musique"
  },
  {
    question: "Trouve le nom de la chanson et du chanteur",
    chanteur: "Django",
    chanson: "Fichu",
    numero_musique: "4",
     path: "5.ogg",
  mode: "quizz_musique"
  },
  {
    question: "Trouve le nom de la chanson et du chanteur",
    chanteur: "DTF",
    chanson: "Comme tu veux",
    numero_musique: "5",
     path: "6.ogg",
  mode: "quizz_musique"
  },
  {
    question: "Trouve le nom de la chanson et du chanteur",
    chanteur: "Ateyaba",
    chanson: "On est sur les nerfs",
    numero_musique: "6",
     path: "7.ogg",
  mode: "quizz_musique"
  },
  {
    question: "Trouve le nom de la chanson et du chanteur",
    chanteur: "Josman",
    chanson: "Dans le vide",
    numero_musique: "7",
     path: "8.ogg",
  mode: "quizz_musique"
  },
  {
    question: "Trouve le nom de la chanson et du chanteur",
    chanteur: "Kaaris",
    chanson: "Or noir",
    numero_musique: "8",
     path: "9.ogg",
  mode: "quizz_musique"
  },
  {
    question: "Trouve le nom de la chanson et du chanteur",
    chanteur: "Kekra",
    chanson: "Sans visage",
    numero_musique: "9",
     path: "10.ogg",
  mode: "quizz_musique"
  },
  {
    question: "Trouve le nom de la chanson et du chanteur",
    chanteur: "Rohff",
    chanson: "La Puissance",
    numero_musique: "10",
     path: "11.ogg",
  mode: "quizz_musique"
  },
  {
    question: "Trouve le nom de la chanson et du chanteur",
    chanteur: "MRC",
    chanson: "Paix Sans Guerre",
    numero_musique: "11",
     path: "12.ogg",
  mode: "quizz_musique"
  },
  {
    question: "Trouve le nom de la chanson et du chanteur",
    chanteur: "Koba la D",
    chanson: "La C",
    numero_musique: "12",
     path: "13.ogg",
  mode: "quizz_musique"
  },
  {
    question: "Trouve le nom de la chanson et du chanteur",
    chanteur: "La Fouine",
    chanson: "Qui peut me Stopper ?",
    numero_musique: "13",
     path: "14.ogg",
  mode: "quizz_musique"
  },
  {
    question: "Trouve le nom de la chanson et du groupe",
    chanteur: "Les Tontons Flingueurs",
    chanson: "Dans le Teum",
    numero_musique: "14",
     path: "15.ogg",
  mode: "quizz_musique"
  },
  {
    question: "Trouve le nom de la chanson et du chanteur",
    chanteur: "Népal",
    chanson: "Rien d'Spécial",
    numero_musique: "15",
     path: "16.ogg",
  mode: "quizz_musique"
  },
  {
    question: "Trouve le nom de la chanson et du chanteur",
    chanteur: "Nekfeu",
    chanson: "Ciel Noir",
    numero_musique: "16",
     path: "17.ogg",
  mode: "quizz_musique"
  },
  {
    question: "Trouve le nom de la chanson et du groupe",
    chanteur: "Panama Bende",
    chanson: "Avé",
    numero_musique: "17",
     path: "18.ogg",
  mode: "quizz_musique"
  },
  {
    question: "Trouve le nom de la chanson et du groupe",
    chanteur: "Set&Match",
    chanson: "On dirait le Sud",
    numero_musique: "18",
     path: "19.ogg",
  mode: "quizz_musique"
  },
  {
    question: "Trouve le nom de la chanson et du chanteur",
    chanteur: "Rim'K",
    chanson: "Air Max",
    numero_musique: "19",
     path: "20.ogg",
  mode: "quizz_musique"
  },
  {
    question: "Trouve le nom de la chanson et du chanteur",
    chanteur: "Sofiane",
    chanson: "Longue Vie",
    numero_musique: "20",
     path: "21.ogg",
  mode: "quizz_musique"
  },
  {
    question: "Trouve le nom de la chanson et du chanteur",
    chanteur: "Youv Dee",
    chanson: "Slay",
    numero_musique: "21",
     path: "22.ogg",
  mode: "quizz_musique"
  },
  {
    question: "Trouve le nom de la chanson et du chanteur",
    chanteur: "Wit.",
    chanson: "Viper",
    numero_musique: "22",
     path: "23.ogg",
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
  mode: "quizz_rap",
  url: "album1.png"
   },
   {question: "Trouve le nom de l'album et du rappeur :",
     album: "Land",
     singer: "Kekra",
  mode: "quizz_rap",
  url: "album2.png"
   },
   {question: "Trouve le nom de l'album et du rappeur :",
     album: "Kolaf",
     singer: "La Fève",
  mode: "quizz_rap",
  url: "album3.png"
   },
   {question: "Trouve le nom de l'album et du rappeur :",
     album: "Destin",
     singer: "Ninho",
  mode: "quizz_rap",
  url: "album4.png"
   },
   {question: "Trouve le nom de l'album et du rappeur :",
     album: "Que La Famille",
     singer: "PNL",
  mode: "quizz_rap",
  url: "album5.png"
   },
   {question: "Trouve le nom de l'album et du rappeur :",
     album: "LA VIE EST BELLE",
     singer: "Gambi",
  mode: "quizz_rap",
  url: "album6.png"
   },
   {question: "Trouve le nom de l'album et du rappeur :",
     album: "Pacifique",
     singer: "Disiz",
  mode: "quizz_rap",
  url: "album7.png"
   },
   {question: "Trouve le nom de l'album et du rappeur :",
     album: "L'Amour",
     singer: "Disiz",
  mode: "quizz_rap",
  url: "album8.png"
   },
   {question: "Trouve le nom de l'album et du rappeur :",
     album: "Nuit",
     singer: "Jazzy Bazz",
  mode: "quizz_rap",
  url: "album9.png"
   },
   {question: "Trouve le nom de l'album et du rappeur :",
     album: "BLO",
     singer: "13 Block",
  mode: "quizz_rap",
  url: "album10.png"
   },
   {question: "Trouve le nom de l'album et du rappeur :",
     album: "Civilisation",
     singer: "Orelsan",
  mode: "quizz_rap",
  url: "album11.png"
   },
   {question: "Trouve le nom de l'album et du rappeur :",
     album: "Adios Bahamas",
     singer: "Népal",
  mode: "quizz_rap",
  url: "album12.png"
   },
   {question: "Trouve le nom de l'album et du rappeur :",
     album: "Dans la légende",
     singer: "PNL",
  mode: "quizz_rap",
  url: "album13.png"
   },
   {question: "Trouve le nom de l'album et du rappeur :",
     album: "Thank You God",
     singer: "F430",
  mode: "quizz_rap",
  url: "album14.png"
   },
   {question: "Trouve le nom de l'album et du rappeur :",
     album: "1994",
     singer: "Hamza",
  mode: "quizz_rap",
  url: "album15.png"
   },
   {question: "Trouve le nom de l'album et du rappeur :",
     album: "Spécial",
     singer: "Siboy",
  mode: "quizz_rap",
  url: "album16.png"
   },
   {question: "Trouve le nom de l'album et du rappeur :",
     album: "Projet Blue Beam",
     singer: "Freeze Corleone",
  mode: "quizz_rap",
  url: "album17.png"
   },
   {question: "Trouve le nom de l'album et du rappeur :",
     album: "Sans rêve",
     singer: "DTF",
  mode: "quizz_rap",
  url: "album18.png"
   },
   {question: "Trouve le nom de l'album et du rappeur :",
     album: "Lithopédion",
     singer: "Damso",
  mode: "quizz_rap",
  url: "album19.png"
   },
   {question: "Trouve le nom de l'album et du rappeur :",
     album: "Trinity",
     singer: "Laylow",
  mode: "quizz_rap",
  url: "album20.png"
   },
   {question: "Trouve le nom de l'album et du rappeur :",
     album: "Imany",
     singer: "Dinos",
  mode: "quizz_rap",
  url: "album21.png"
   },
   {question: "Trouve le nom de l'album et du rappeur :",
     album: "Jeannine",
     singer: "Lomepal",
  mode: "quizz_rap",
  url: "album22.png"
   },
   {question: "Trouve le nom de l'album et du rappeur :",
     album: "UMLA",
     singer: "Alpha Wann",
  mode: "quizz_rap",
  url: "album23.png"
   },
   {question: "Trouve le nom de l'album et du rappeur :",
     album: "A7",
     singer: "SCH",
  mode: "quizz_rap",
  url: "album24.png"
   },
   {question: "Trouve le nom de l'album et du rappeur :",
     album: "Le Monde Chico",
     singer: "PNL",
  mode: "quizz_rap",
  url: "album25.png"
   },
   {question: "Trouve le nom de l'album et du rappeur :",
     album: "Xeu",
     singer: "Vald",
  mode: "quizz_rap",
  url: "album26.png"
   },
   {question: "Trouve le nom de l'album et du rappeur :",
     album: "Ateyaba",
     singer: "Ateyaba",
  mode: "quizz_rap",
  url: "album27.png"
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
  
    socket.on('mute_song', data =>{
     io.emit('mute_song_all', data);
  });
  
      socket.on('play_sound', data =>{
     io.emit('play_song_all', data);
  });
  
  
    socket.on('send_response_Music', reponse =>{
     if(reponse === Questionnaire_Music[compteur_question].chanteur){
      increasePoints(socket.id);
       Questionnaire_Music[compteur_question].chanteur = answer_chanteur;
       const leaderboard = players.sort((a,b) => b.points - a.points).slice(0,10);
       io.emit('leaderboard', leaderboard);
    } 
      if(reponse === Questionnaire_Music[compteur_question].chanson){
      increasePoints(socket.id);
       Questionnaire_Music[compteur_question].chanson = answer_chanson; 
      const leaderboard = players.sort((a,b) => b.points - a.points).slice(0,10);
      io.emit('leaderboard', leaderboard);
    } 
      if (Questionnaire_Music[compteur_question].chanson === answer_chanson && Questionnaire_Music[compteur_question].chanteur === answer_chanteur){
        compteur_question += 1;
        updateGame_Music();
      }
    });
  
  	//add message
	socket.on('user_message',function(name, reponseDuJoueur){
    console.log("message recu : "+ reponseDuJoueur + " de : " + name)
		io.emit('updateNewMessage', name, reponseDuJoueur);
  });
  
  	//del message
	socket.on('delete_message', reponseDuJoueur =>{
		io.emit('delete_chat', reponseDuJoueur);
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
