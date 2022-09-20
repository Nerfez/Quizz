const pseudo = document.getElementById("form_pseudo");
const submission = document.getElementById("form_jeu");
const intro = document.getElementById("intro");
const game = document.getElementById("game");
const question = document.getElementById("question");
const classement = document.getElementById("leaderboard");
const themeRAP = document.getElementById("themeRAP");
const themeCinema = document.getElementById("themeCinema");
const themeManga = document.getElementById("themeManga");
const themeRandom = document.getElementById("themeRandom");
const titre_jeu = document.getElementById("titre_jeu");

let socket = undefined;

themeRAP.addEventListener("click", function () {
  socket.emit("themeChangeRAP");
});

themeCinema.addEventListener("click", function () {
  socket.emit("themeChangeCinema");
});

themeRandom.addEventListener("click", function () {
  socket.emit("themeChangeRandom");
});

themeManga.addEventListener("click", function () {
  socket.emit("themeChangeManga");
});

pseudo.addEventListener("submit", function (evt) {
  evt.preventDefault();
  const name = evt.target["name"].value;

  //si le pseudo n'est pas vide
  if (name) {
    //On se connecte à la socket
    socket = window.io();
    
        socket.on('addimage',function(base64image){
    	$('.Image').empty();
		$('.Image')
    	.prepend(
    		$('<p>').append($('<b>').text(""),'<a target="_blank" href="'+ base64image +'"><img src="'+ base64image+'" /></a>'
    		)
    	);
    });


$(function () {
  $("#imageFile").on("change", function (e) {
    var file = e.originalEvent.target.files[0];
    var reader = new FileReader();
    reader.onload = function (evt) {
      socket.emit("user_image", evt.target.result);
    };
    reader.readAsDataURL(file);
  });
});

    //on indique le pseudo du joueur qui vient de se connecter
    socket.emit("user_join", name);

    StartGame();
  }
});

submission.addEventListener("submit", function (evt) {
  evt.preventDefault();

  const reponse = evt.target["reponse"].value;

  if (reponse) {
    socket.emit("send_response_Cinema", reponse);
    socket.emit("send_response_Rap", reponse);
    socket.emit("send_response_Random", reponse);
    socket.emit("send_response_Manga", reponse);

    evt.target["reponse"].value = "";
  }
});

function StartGame() {
  //on supprime le champs de texte pseudo
  intro.classList.add("hidden");
  //on affiche les questions
  game.classList.remove("hidden");

  socket.on("send_question_Cinema", (questionnaire) => {
    titre_jeu.innerHTML = "Quizz Spécial <span class='text-red-400'>Cinéma</span>";
    question.innerText = questionnaire.question;
  });

  socket.on("send_question_Rap", (questionnaire) => {
    titre_jeu.innerHTML = "Quizz Spécial <span class='text-red-400'>Rap</span>";
    question.innerText = questionnaire;
  });
  
    socket.on("send_question_Random", (questionnaire) => {
    titre_jeu.innerHTML = "Quizz Spécial <span class='text-red-400'>Random</span>";
    question.innerText = questionnaire.question;
  });
  
    socket.on("send_question_Manga", (questionnaire) => {
    titre_jeu.innerHTML = "Quizz Spécial <span class='text-red-400'>Manga</span>";
    question.innerText = questionnaire.question;
  });

  socket.on("leaderboard", (leaderboard) => {
    classement.innerHTML = `
    ${leaderboard
      .map(
        (player) =>
          `<li class="flex justify-between"><strong>${player.name}</strong> ${player.points}</li>`
      )
      .join("")}
    `;
  });
}

