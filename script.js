document.addEventListener("DOMContentLoaded", () => {
  const artistsData = [
    { name: "Bôa", image: "./img/boa.jpg" },
    { name: "Gorillaz", image: "./img/gorillaz.jpg" },
    { name: "RadioHead", image: "./img/radiohead.jpg" },
    { name: "Young Lixo", image: "./img/yunli.jpg" },
  ];

  const musicsData = [
    {
      name: "Rumo à vitória",
      image: "./img/vitoria.jpg",
      artist: "Young Lixo",
      audio: "./music/rumo-a-vitoria.mp3",
    },
    {
      name: "Feel Good Inc",
      image: "./img/demonDays.jpg",
      artist: "Gorillaz",
      audio: "./music/feel-good-inc.mp3",
    },
  ];

  const albumsData = [
    {
      name: "13 Lentes de um Final Feliz",
      artist: "Young Lixo",
      image: "./img/13lentes.jpg",
    },
    {
      name: "Pablo Honey",
      artist: "Radio Head",
      image: "./img/creep.jpg",
    },
    {
      name: "Demon Days",
      artist: "Gorillaz",
      image: "./img/demonDays.jpg",
    },
    {
      name: "Twilight",
      artist: "Bôa",
      image: "./img/twilight.jpg",
    },
    {
      name: "Validation",
      artist: "Young Lixo",
      image: "./img/validation.jpg",
    },
  ];

  const artistGrid = document.querySelector(".artists-grid");
  const albumsGrid = document.querySelector(".albums-grid");
  const musicGrid = document.querySelector(".musics-grid");

  const musicPlayer = document.querySelector(".music-player");
  const playPauseBtn = document.querySelector(".play-pause-btn");
  const progressBar = document.querySelector(".progress-bar");
  const volumeControl = document.querySelector(".volume-control");
  const musicNameElement = document.querySelector(".music-name");
  const artistNameElement = document.querySelector(".artist-name");

  let currentAudio = null;
  let isPlaying = false;

  artistsData.forEach((artist) => {
    const artistCard = document.createElement("div");
    artistCard.classList.add("artist-card");

    artistCard.innerHTML = `<img src="${artist.image}" alt="${artist.name}">
    <h3>${artist.name}</h3>
    <p>artista</p>`;

    artistGrid.appendChild(artistCard);
  });

  albumsData.forEach((album) => {
    const albumCard = document.createElement("div");
    albumCard.classList.add("album-card");

    albumCard.innerHTML = `<img src="${album.image}" alt="${album.name}">
    <p>${album.name}</p>`;

    albumsGrid.appendChild(albumCard);
  });

  musicsData.forEach((music) => {
    const musicCard = document.createElement("div");
    musicCard.classList.add("music-card");

    musicCard.innerHTML = `<img src="${music.image}" alt="${music.name}">
    <p>${music.name}</p>`;
    musicGrid.appendChild(musicCard);

    //Toca quando clica
    musicCard.addEventListener("click", () => {
      //Pausa se ja tiver audio tocando
      if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
        playPauseBtn.textContent = "Play";
        isPlaying = false;
      }

      currentAudio = new Audio(music.audio);
      currentAudio
        .play()
        .then(() => {
          musicPlayer.style.display = "block";
          musicNameElement.textContent = music.name;
          artistNameElement.textContent = music.artist;
          playPauseBtn.textContent = "Pause";
          isPlaying = true;
        })
        .catch((error) => {
          console.error("Erro ao tocar o a musica", error);
        });

      //Atualiza

      currentAudio.addEventListener("timeupdate", () => {
        if (currentAudio.duration > 0) {
          const progress =
            (currentAudio.currentTime / currentAudio.duration) * 100;
          progressBar.value = progress;
        }
      });

      // Controlar volume

      volumeControl.addEventListener("input", () => {
        currentAudio.volume = volumeControl.value / 100;
      });
    });
  });

  //Pause
  playPauseBtn.addEventListener("click", () => {
    if (isPlaying && currentAudio) {
      currentAudio.pause();
      playPauseBtn.textContent = "Play";
      isPlaying = false;
    } else if (currentAudio) {
      currentAudio.play();
      playPauseBtn.textContent = "Pause";
      isPlaying = true;
    }
  });

  //Atualiza barra clicar

  progressBar.addEventListener("input", () => {
    if (currentAudio) {
      const progressTime = (progressBar.value / 100) * currentAudio.duration;
      currentAudio.currentTime = progressTime;
    }
  });
});
