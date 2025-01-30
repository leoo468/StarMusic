const toggleButton = document.getElementById("toggleSearch");
const searchBar = document.getElementById("searchBar");

// Alterna a barra de busca ao clicar no botão
toggleButton.addEventListener("click", () => {
  searchBar.classList.toggle("active");
  toggleButton.classList.toggle("hidden");

  if (searchBar.classList.contains("active")) {
    searchBar.classList.remove("hidden");
    searchBar.focus();
  }
});

// Esconde a barra de busca ao clicar fora
document.addEventListener("click", (event) => {
  if (
    !toggleButton.contains(event.target) &&
    !searchBar.contains(event.target)
  ) {
    searchBar.classList.remove("active");
    toggleButton.classList.remove("hidden");
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const artistsData = [
    { name: "Bôa", image: "./img/boa.jpg" },
    { name: "Gorillaz", image: "./img/gorillaz.jpg" },
    { name: "RadioHead", image: "./img/radiohead.jpg" },
    { name: "Young Lixo", image: "./img/yunli.jpg" },
  ];

  const musicsData = [
    {
      name: "End of the World",
      image: "./img/end-of-the-world.jpg",
      artist: "Coda",
      audio: "./music/end-of-the-world.mp3",
    },
    {
      name: "Rumo à Vitória",
      image: "./img/vitoria.jpg",
      artist: "Yung Lixo",
      audio: "./music/rumo-a-vitoria.mp3",
    },
    {
      name: "Feel Good Inc",
      image: "./img/demonDays.jpg",
      artist: "Gorillaz",
      audio: "./music/feel-good-inc.mp3",
    },
  ];

  const yunliData = [
    {
      name: "Rumo à Vitória",
      image: "./img/vitoria.jpg",
      audio: "./music/rumo-a-vitoria.mp3",
    },
    {
      name: "Goddamn",
      image: "./img/vitoria.jpg",
      audio: "./music/goddamn.mp3",
    },
    {
      name: "SucessoFM",
      image: "./img/vitoria.jpg",
      audio: "./music/sucessoFM.mp3",
    },
  ];

  const albumsData = [
    {
      id: 1,
      name: "13 Lentes de um Final Feliz",
      artist: "Young Lixo",
      image: "./img/lentes.jpg",
    },
    {
      id: 2,
      name: "Pablo Honey",
      artist: "Radio Head",
      image: "./img/creep.jpg",
    },
    {
      id: 3,
      name: "Stadium Arcadium",
      artist: "Red Hot Chili Peppers",
      image: "./img/stadium-arcadium.jpg",
    },
    { id: 4, name: "Twilight", artist: "Bôa", image: "./img/twilight.jpg" },
    {
      id: 5,
      name: "Validation",
      artist: "Young Lixo",
      image: "./img/validation.jpg",
    },
    {
      id: 6,
      name: "Notion",
      artist: "The Rare Occasions",
      image: "./img/notion.jpg",
    },
    {
      id: 7,
      name: "Akeboshi",
      artist: "Akeboshi",
      image: "./img/akeboshi.jpg",
    },
  ];

  const artistGrid = document.querySelector(".artists-grid");
  const albumsGrid = document.querySelector(".albums-grid");
  const musicGrid = document.querySelector(".musics-grid");
  const yunliGrid = document.querySelector(".yunli-grid");

  let currentAudio = null;
  let isPlaying = false;

  function renderCards(data, container, type) {
    data.forEach((item) => {
      const card = document.createElement("div");
      card.classList.add(`${type}-card`);
      card.innerHTML = `<img src="${item.image}" alt="${item.name}"><p>${item.name}</p>`;
      container.appendChild(card);

      if (type === "album") {
        card.addEventListener("click", () => {
          window.location.href = `album.html?albumId=${item.id}`;
        });
      }

      if (type === "music" || type === "yunli") {
        card.addEventListener("click", () => playMusic(item));
      }
    });
  }

  renderCards(artistsData, artistGrid, "artist");
  renderCards(albumsData, albumsGrid, "album");
  renderCards(musicsData, musicGrid, "music");
  renderCards(yunliData, yunliGrid, "yunli");

  if (Notification.permission !== "granted") {
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        console.log("Permissão concedida para notificação!");
      }
    });
  }

  function showMusicNotification() {
    if (Notification.permission === "granted" && currentAudio) {
      const musicName = document.querySelector(".music-name").textContent;
      const artistName = document.querySelector(".artist-name").textContent;

      const currentTime = currentAudio.currentTime;
      const duration = currentAudio.duration;

      const musicImage = document.querySelector("img").src;

      const notification = new Notification("Música em reprodução", {
        body: `${musicName} - ${artistName} | Tempo: ${formatTime(
          currentTime
        )} / ${formatTime(duration)}`,
        icon: musicImage,
        tag: "music-player",
      });

      setTimeout(() => {
        notification.close();
      }, 5000);
    }
  }
  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  }

  // Atualizar a notificação a cada segundo enquanto a música toca
  setInterval(showMusicNotification, 1000);

  function playMusic(music) {
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
    }

    document.addEventListener("keydown", (event) => {
      if (event.key === "MediaTrackPrevious" || event.key === "Backspace")
        if (currentAudio) {
          currentAudio.currentTime = 0;
          currentAudio.play();
        }
    });

    currentAudio = new Audio(music.audio);
    currentAudio.play();
    isPlaying = true;
    document.querySelector(".music-player").style.display = "block";
    document.querySelector(".music-name").textContent = music.name;
    document.querySelector(".artist-name").textContent = music.artist;
    document.querySelector(".play-pause-btn").textContent = "Pause";

    currentAudio.addEventListener("timeupdate", () => {
      // Atualizando a barra de progresso
      document.querySelector(".progress-bar").value =
        (currentAudio.currentTime / currentAudio.duration) * 100;

      // Atualizando o tempo atual e tempo restante
      const currentTime = formatTime(currentAudio.currentTime);
      const remainingTime = formatTime(currentAudio.duration);

      document.querySelector(".current-time").textContent = currentTime;
      document.querySelector(".remaining-time").textContent = remainingTime;
    });

    // Função para formatar o tempo em minutos e segundos
    function formatTime(seconds) {
      const minutes = Math.floor(seconds / 60);
      const sec = Math.floor(seconds % 60);
      return `${minutes}:${sec < 10 ? "0" + sec : sec}`;
    }

    document.querySelector(".volume-control").addEventListener("input", (e) => {
      currentAudio.volume = e.target.value / 100;
    });

    document.querySelector(".play-pause-btn").addEventListener("click", () => {
      if (isPlaying && currentAudio) {
        currentAudio.pause();
        document.querySelector(".play-pause-btn").textContent = "Play";
        isPlaying = false;
      } else if (currentAudio) {
        currentAudio.play();
        document.querySelector(".play-pause-btn").textContent = "Pause";
        isPlaying = true;
      }
    });

    document.querySelector(".progress-bar").addEventListener("input", (e) => {
      if (currentAudio) {
        currentAudio.currentTime =
          (e.target.value / 100) * currentAudio.duration;
      }
    });
  }
});
