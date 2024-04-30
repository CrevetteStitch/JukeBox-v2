var navbar = document.querySelector('.navbar');
navbar.classList.add('open');

const playlist = document.getElementById("playlist");
const lecteur = document.querySelector("#lecteur");

const config = {
    urlCover : "assets/pictures/",
    urlSound : "assets/media/",
}

const getData = async () => {    
    const req = await fetch("./assets/js/data.json");
    const dbmusic = await req.json();

    dbmusic.forEach((music) => {
        playlist.innerHTML += `<li id="${music.id}"><h2>${music.title}</h2><div></div></li>`;
    });

    const allLi = document.querySelectorAll("li");

    allLi.forEach((li) => {
        li.addEventListener("click", function(elem){
            const id = parseInt(li.id);
            const searchById = dbmusic.find((element) => element.id === id);
            lecteur.src = `${config.urlSound}${searchById.sound}`;
            lecteur.play();
            // Mettre à jour la couverture
            updateCover(`${config.urlCover}${searchById.cover}`);
        });
    });

    const randomButton = document.getElementById("randomButton");
    randomButton.addEventListener("click", () => {
        lecteur.pause(); // Pausez la musique en cours de lecture
        const randomMusic = getRandomMusic(dbmusic);
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

const getRandomMusic = (dbmusic) => {
    const randomIndex = Math.floor(Math.random() * dbmusic.length);
    return dbmusic[randomIndex];
};

getData();
