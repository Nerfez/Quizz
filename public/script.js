const pseudo = document.getElementById('form_pseudo');
const submission = document.getElementById('form_jeu');
const intro = document.getElementById('intro');
const game = document.getElementById('game');
const question = document.getElementById('question');
const classement = document.getElementById('leaderboard');
let socket = undefined;

pseudo.addEventListener('submit', function(evt){
  evt.preventDefault();
  const name = evt.target['name'].value;
  
  //si le pseudo n'est pas vide
  if(name) {
    //On se connecte à la socket
    socket = window.io();
    
    //on indique le pseudo du joueur qui vient de se connecter
    socket.emit('user_join', name);
    
    StartGame();
    
  }
});

function StartGame(){
    //on supprime le champs de texte pseudo
    intro.classList.add('hidden');
    //on affiche les questions
    game.classList.remove('hidden');
  
  socket.on('send_question', (questionnaire) => {
    question.innerText = questionnaire.question;
  });
  
  socket.on('leaderboard', leaderboard => {
    classement.innerHTML = `
    ${leaderboard.map(player => `<li class="flex justify-between"><strong>${player.name}</strong> ${player.points}</li>`).join('')}
    `;
  });
}

submission.addEventListener('submit', function(evt){
  evt.preventDefault();
  
  const reponse = evt.target['reponse'].value;
  
  if(reponse){
    socket.emit('send_response', reponse);
    
    evt.target['reponse'].value = '';
  }
});
