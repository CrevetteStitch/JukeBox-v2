var navbar = document.querySelector('.navbar');
navbar.classList.add('open');

const playlist = document.getElementById("playlist");
const lecteur = document.querySelector("#lecteur");
const disque = document.querySelector(".disque");
let dbmusic;

const config = {
    urlCover : "https://api-music-iner.onrender.com/api/v1/assets/cover",
    urlSound : "https://api-music-iner.onrender.com/api/v1/assets/media/",
}

const getData = async () => {    
    const req = await fetch("https://api-music-iner.onrender.com/api/v1/musics");
    console.log(req);
    const dbMusic = await req.json();
    console.log("result ", dbMusic);
    data = dbMusic.result;
    data.forEach((music) => {
        playlist.innerHTML += `<li id="${music.id}"><h2>${music.title}</h2><div></div></li>`;
    });

    const allLi = document.querySelectorAll("li");

    allLi.forEach((li) => {
        li.addEventListener("click", function(elem){
            const id = parseInt(li.id);
            const searchById = data.find((element) => element.id === id);
            lecteur.src = `${config.urlSound}${searchById.sound}`;
            lecteur.play();
            // Mettre à jour la couverture
            updateCover(`${config.urlCover}${searchById.cover}`);
        });
    });

    const randomButton = document.getElementById("randomButton");
    randomButton.addEventListener("click", () => {
        lecteur.pause(); // Pausez la musique en cours de lecture
        const randomMusic = getRandomMusic(data);
        lecteur.src = `${config.urlSound}${randomMusic.sound}`;
        lecteur.play(); // Lancez la nouvelle musique sélectionnée aléatoirement
        // Mettre à jour la couverture
        updateCover(`${config.urlCover}${randomMusic.cover}`);
    });
};

const updateCover = (coverUrl) => {
    const coverElement = document.querySelector('.cover');
    coverElement.src = coverUrl;
};

const getRandomMusic = (data) => {
    const randomIndex = Math.floor(Math.random() * data.length);
    return data[randomIndex];
};

// Écouter l'événement de pause du lecteur audio
lecteur.addEventListener("pause", function() {
    // Mettre en pause le disque
    disque.classList.add("paused");
});

// Écouter l'événement de reprise de la lecture du lecteur audio
lecteur.addEventListener("play", function() {
    // Retirer la classe "paused" pour relancer la rotation du disque
    disque.classList.remove("paused");
});

getData();
