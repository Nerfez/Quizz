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
const themeMusic = document.getElementById("themeMusic");
const titre_jeu = document.getElementById("titre_jeu");
const image_rap = document.getElementById("image_rap");
const music_div = document.getElementById("music");
let play = document.querySelector('#play');
let recent_volume= document.querySelector('#volume');
let slider = document.querySelector('#duration_slider');
let mode_jeu = "quizz_cinema";

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

themeMusic.addEventListener("click", function () {
  socket.emit("themeChangeMusic");
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
    if(mode_jeu == "quizz_cinema"){
    socket.emit("send_response_Cinema", reponse);
      } else if(mode_jeu == "quizz_rap"){
    socket.emit("send_response_Rap", reponse);
        } else if(mode_jeu == "quizz_random"){
    socket.emit("send_response_Random", reponse);
          } else if(mode_jeu == "quizz_manga"){
    socket.emit("send_response_Manga", reponse);
            } else if(mode_jeu == "quizz_musique"){
    socket.emit("send_response_Music", reponse);
            }
    evt.target["reponse"].value = "";
  }
});

function StartGame() {
  
    //on supprime le champs de texte pseudo
  intro.classList.add("hidden");
  //on affiche les questions
  game.classList.remove("hidden");

  socket.on("send_question_Cinema", (questionnaire) => { 
   mode_jeu = questionnaire.mode;
    //on supprime le champs de texte pseudo
  image_rap.classList.add("hidden");
                    //on affiche les musiques
      music_div.classList.add("hidden");
    titre_jeu.innerHTML = "Quizz Spécial <span class='text-red-400'>Cinéma</span>";
    question.innerText = questionnaire.question;
  });

  socket.on("send_question_Rap",(questionnaire) => {
    mode_jeu = questionnaire.mode;
    //on affiche les images
  image_rap.classList.remove("hidden");
                    //on affiche les musiques
      music_div.classList.add("hidden");
    titre_jeu.innerHTML = "Quizz Spécial <span class='text-red-400'>Rap</span>";
    question.innerText = questionnaire.question;
  });
  
    socket.on("send_question_Random", (questionnaire) => {
      mode_jeu = questionnaire.mode;
     //on supprime le champs de texte pseudo
  image_rap.classList.add("hidden");
                      //on affiche les musiques
      music_div.classList.add("hidden");
      titre_jeu.innerHTML = "Quizz Spécial <span class='text-red-400'>Random</span>";
    question.innerText = questionnaire.question;
  });
  
  socket.on("send_question_Music", (questionnaire) => { 
    mode_jeu = questionnaire.mode;
          //on affiche les musiques
      music_div.classList.remove("hidden");
    //on supprime le champs de texte pseudo
  image_rap.classList.add("hidden");
    titre_jeu.innerHTML = "Quizz Spécial <span class='text-red-400'>Musique</span>";
    question.innerText = questionnaire.question;
    console.log("numero musique : "+ questionnaire.numero_musique + "  /  url : " + questionnaire.path);
    load_track(questionnaire.numero_musique, questionnaire.path);
    justplay();
  });
  
    socket.on("send_question_Manga", (questionnaire) => {
      mode_jeu = questionnaire.mode;
     //on supprime le champs de texte pseudo
  image_rap.classList.add("hidden");
                //on affiche les musiques
      music_div.classList.add("hidden");
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
  
    socket.on("send_question_Music_after", (questionnaire) => {
	if(questionnaire.numero_musique < questionnaire.length - 1){
		questionnaire.numero_musique += 1;
		load_track(questionnaire.numero_musique, questionnaire.path);
		playsong();
	}else{
		questionnaire.numero_musique = 0;
		load_track(questionnaire.numero_musique, questionnaire.path);
		playsong();

	}
 });
  
}

let timer;
let autoplay = 0;

let index_no = 0;
let Playing_song = false;

//create a audio Element
let track = document.createElement('audio');


// All functions

// function load the track
function load_track(index_no, pathing){
	clearInterval(timer);
	reset_slider();

	track.src = pathing;
    track.load();
  track.volume = 4/100;

	timer = setInterval(range_slider ,1000);
}

load_track(index_no);

// checking.. the song is playing or not
 function justplay(){
 	if(Playing_song==false){
 		playsong();

 	}else{
 		pausesong();
 	}
 }


// reset song slider
 function reset_slider(){
 	slider.value = 0;
 }

// play song
function playsong(){
  track.play();
  Playing_song = true;
  autoplay = 0;
}

//pause song
function pausesong(){
	track.pause();
	Playing_song = false;
}

// change volume
function volume_change(){
	track.volume = recent_volume.value / 100;
}
function range_slider(){
	let position = 0;
        
        // update slider position
		if(!isNaN(track.duration)){
		   position = track.currentTime * (100 / track.duration);
		   slider.value =  position;
	      }

       
       // function will run when the song is over
       if(track.ended){
           if(autoplay==1){
		       index_no += 1;
		       load_track(index_no);
		       playsong();
           }
	    }
     }


