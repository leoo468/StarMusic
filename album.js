document.addEventListener("DOMContentLoaded", () => {
  // Carrega o álbum a partir do localStorage (informações do álbum)
  const album = JSON.parse(localStorage.getItem("currentAlbum"));

  // Referências ao DOM para manipulação
  const albumImage = document.getElementById("albumImage");
  const albumName = document.getElementById("albumName");
  const albumArtist = document.getElementById("albumArtist");
  const songsList = document.getElementById("songs");
  const musicPlayer = document.getElementById("musicPlayer");
  const playPauseBtn = document.getElementById("playPauseBtn");
  const progressBar = document.getElementById("progressBar");
  const volumeControl = document.getElementById("volumeControl");
  const currentSongName = document.getElementById("currentSongName");
  const currentSongArtist = document.getElementById("currentSongArtist");
  const currentTimeElement = document.getElementById("currentTime");
  const totalTimeElement = document.getElementById("totalTime");

  let currentAudio = null;
  let isPlaying = false;

  // Se o álbum existir, preenche os detalhes
  if (album) {
    // Exibindo as informações do álbum
    albumImage.src = album.image;
    albumName.textContent = album.name;
    albumArtist.textContent = album.artist;

    // Exibindo as músicas no álbum
    album.musics.forEach((music) => {
      const li = document.createElement("li");
      li.classList.add("song-item");
      li.innerHTML = `
        <p class="song-name">${music.name}</p>
        <p class="song-artist">${music.artist}</p>
      `;
      songsList.appendChild(li);

      // Adicionando o evento de clique para tocar a música
      li.addEventListener("click", () => {
        // Pausar a música anterior, se houver
        if (currentAudio) {
          currentAudio.pause();
          currentAudio.currentTime = 0;
          playPauseBtn.textContent = "Play";
          isPlaying = false;
        }

        // Reproduzir a nova música
        currentAudio = new Audio(music.audio);
        currentAudio.play().then(() => {
          // Mostrar o player
          musicPlayer.style.display = "block";
          currentSongName.textContent = music.name;
          currentSongArtist.textContent = music.artist;
          playPauseBtn.textContent = "Pause";
          isPlaying = true;
        });

        // Atualiza o tempo do progresso da música
        currentAudio.addEventListener("timeupdate", () => {
          if (currentAudio.duration > 0) {
            const progress =
              (currentAudio.currentTime / currentAudio.duration) * 100;
            progressBar.value = progress;
            currentTimeElement.textContent = formatTime(
              currentAudio.currentTime
            );
            totalTimeElement.textContent = formatTime(currentAudio.duration);
          }
        });

        // Atualiza o controle de volume
        volumeControl.addEventListener("input", () => {
          currentAudio.volume = volumeControl.value / 100;
        });
      });
    });
  }

  // Função de formato de tempo
  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${
      remainingSeconds < 10 ? "0" + remainingSeconds : remainingSeconds
    }`;
  }

  // Função de Play/Pause
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

  // Atualiza a barra de progresso ao clicar nela
  progressBar.addEventListener("input", () => {
    if (currentAudio) {
      const progressTime = (progressBar.value / 100) * currentAudio.duration;
      currentAudio.currentTime = progressTime;
    }
  });
});
