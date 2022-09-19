const express = require("express");
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

let players = [];
let compteur_question = 0;

let Questionnaire = [
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

app.use(express.static("public"));

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
    
    updateGame();
    
  });
  
  socket.on('send_response', reponse =>{
     if(reponse == Questionnaire[compteur_question].reponse){
      increasePoints(socket.id);
       compteur_question += 1;
       updateGame();
    }
  });
  
  socket.on('disconnect', function(){
    //on retire le joueur de la liste
    players = [...players.filter(player => player.id !== socket.id)];
    console.log(socket.id, ' vient de se deconnecter');
  });
});

function updateGame(){
  const leaderboard = players.sort((a,b) => b.points - a.points).slice(0,10);
    io.emit('send_question', Questionnaire[compteur_question]);
    
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