// Define albumData no escopo global
let albumData = [];

document.addEventListener("DOMContentLoaded", () => {
  albumData = [
    {
      id: 1,
      name: "13 Lentes de um Final Feliz",
      artist: "Young Lixo",
      image: "./img/lentes.jpg",
      songs: [
        {
          id: "asI5cHpQPAA",
          name: "Au Revoir",
          youtubeUrl: "https://www.youtube.com/watch?v=asI5cHpQPAA",
        },
        {
          id: "WlylgE8fSLs",
          name: "Joias da familia",
          youtubeUrl: "https://www.youtube.com/watch?v=WlylgE8fSLs",
        },
      ],
    },
    {
      id: 2,
      name: "Pablo Honey",
      artist: "Radiohead",
      image: "./img/creep.jpg",
      songs: [
        {
          id: "OzL7u5teZhg",
          name: "You",
          youtubeUrl: "https://www.youtube.com/watch?v=OzL7u5teZhg",
        },
      ],
    },
    {
      id: 3,
      name: "Stadium Arcadium",
      artist: "Red Hod Chili Peppers",
      image: "./img/stadium-arcadium.jpg",
      songs: [
        {
          id: "4FkfyssnHqU",
          name: "Dani California",
          youtubeUrl: "https://www.youtube.com/watch?v=4FkfyssnHqU",
        },
        {
          id: "yuFI5KSPAt4",
          name: "Snow (Hey Oh)",
          youtubeUrl: "https://www.youtube.com/watch?v=yuFI5KSPAt4",
        },
        {
          id: "wNvOUkRTkz8",
          name: "Charlie",
          youtubeUrl: "https://www.youtube.com/watch?v=wNvOUkRTkz8",
        },
        {
          id: "j9qfClVvfIw",
          name: "Stadium Arcadium",
          youtubeUrl: "https://www.youtube.com/watch?v=j9qfClVvfIw",
        },
      ],
    },
  ];

  // Obter o ID do álbum pela URL
  const albumId = getAlbumIdFromUrl();

  // Encontrar o álbum correspondente
  const album = albumData.find((a) => a.id === albumId);

  if (album) {
    // Preencher as informações do álbum
    const albumImage = document.getElementById("albumImage");
    const albumName = document.getElementById("albumName");
    const albumArtist = document.getElementById("albumArtist");
    const songsList = document.getElementById("songs");
    const albumCoverImage = document.getElementById("albumCoverImage");

    if (albumCoverImage) {
      albumCoverImage.src = album.image;
    }

    albumImage.src = album.image;
    albumName.textContent = album.name;
    albumArtist.textContent = album.artist;

    // Gerar lista de músicas com links do YouTube
    songsList.innerHTML = ""; // Limpa a lista antes de gerar
    album.songs.forEach((song) => {
      const songItem = document.createElement("li");
      songItem.textContent = song.name;
      songItem.classList.add("song-item");

      // Ao clicar na música, exibe o player do YouTube
      songItem.addEventListener("click", () => {
        const youtubePlayer = document.getElementById("audioPlayerContainer");
        const playerDiv = document.getElementById("player");

        // Exibe o player e carrega a música
        youtubePlayer.style.display = "block";
        const videoId = extractYouTubeVideoId(song.youtubeUrl);
        loadYouTubePlayer(videoId);
      });

      songsList.appendChild(songItem);
    });

    // Botão de voltar
    const goBackButton = document.getElementById("goBack");
    goBackButton.addEventListener("click", () => {
      window.location.href = "index.html";
    });
  } else {
    console.error("Álbum não encontrado!");
  }
});

// Função para obter o ID do álbum da URL
function getAlbumIdFromUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  const albumId = urlParams.get("albumId");
  return albumId ? parseInt(albumId, 10) : 1; // Retorna 1 se o ID não for fornecido
}

// Função para extrair o ID do YouTube a partir da URL
function extractYouTubeVideoId(url) {
  const match = url.match(
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|(?:.*?[?&])?v=)|youtu\.be\/)([\w\-]{11})/
  );
  return match && match[1]; // Retorna o ID do vídeo
}

// Função para carregar o player do YouTube
let player;

function loadYouTubePlayer(videoId) {
  if (player) {
    player.loadVideoById(videoId); // Carrega um novo vídeo
  } else {
    player = new YT.Player("audioPlayerContainer", {
      height: "0", // Não exibe o vídeo
      width: "0", // Não exibe o vídeo
      videoId: videoId,
      playerVars: {
        autoplay: 1, // Autoplay
        controls: 0, // Não mostra controles de vídeo
        modestbranding: 1,
        rel: 0,
        showinfo: 0,
        fs: 0, // Não permitir fullscreen
      },
      events: {
        onStateChange: onPlayerStateChange,
      },
    });
  }
}

// Monitorar o estado do player (se o vídeo está tocando)
function onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.PLAYING) {
    console.log("O vídeo está tocando");
  } else if (event.data == YT.PlayerState.PAUSED) {
    console.log("O vídeo foi pausado");
  }
}
