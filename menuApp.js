// class Player {
//   constructor(name, position) {
//     this.name = name;
//     this.position = position;
//   }

//   describe() {
//     return `${this.name} plays ${this.position}`;
//   }
// }

class Song {
  constructor(name) {
    this.name = name;
  }

  describe() {
    return `${this.name}`;
  }
}

// class Team {
//   constructor(name) {
//     this.name = name;
//     this.players = [];
//   }

//   addPlayer(player) {
//     if (player instanceof Player) {
//       this.players.push(player);
//     } else {
//       throw new Error(`You can only add an instance of Player.  Argument is not a player: ${player}`);
//     }
//   }

//   describe() {
//     return `${this.name} has ${this.players.length} players.`;
//   }
// }

class Playlist {
  constructor(name) {
    this.name = name;
    this.songs = [];
  }

  addSong(song) {
    if (song instanceof Song) {
      this.songs.push(song);
    } else {
      throw new Error(
        `You can only add a Song.  Argument is not a song: ${song}`
      );
    }
  }

  describe() {
    return `${this.name} has ${this.songs.length} songs.`;
  }
}

class Menu {
  constructor() {
    this.playlists = [];
    this.selectedPlaylist = null;
  }

  start() {
    let selection = this.showMainMenuOptions();

    while (selection != 0) {
      switch (selection) {
        case "1":
          this.createPlaylist();
          break;
        case "2":
          this.viewPlaylist();
          break;
        case "3":
          this.deletePlaylist();
          break;
        case "4":
          this.displayPlaylists();
          break;
        case "5":
          this.viewAllSongs();
          break;
        default:
          selection = 0;
      }
      selection = this.showMainMenuOptions();
    }

    alert("Goodbye!");
  }

  showMainMenuOptions() {
    return prompt(`
        0) exit
        1) create new playlist
        2) view playlist
        3) delete playlist
        4) display all playlists
        5) view all songs
        -------------------
        ${this.viewAllSongs()}
    `);
  }

  showPlaylistMenuOptions(playlistInfo) {
    return prompt(`
      0) back
      1) add song
      2) delete song
      -------------------
      ${playlistInfo}
    `);
  }

  displayPlaylists() {
    let playlistString = "";
    for (let i = 0; i < this.playlists.length; i++) {
      playlistString += i + ") " + this.playlists[i].name + "\n";
    }
    alert(playlistString);
  }

  createPlaylist() {
    const name = prompt("Enter name for new playlist: ");
    this.playlists.push(new Playlist(name));
  }

  viewAllSongs() {
      let description = "All Songs:" + "\n";
      for (
        let playlistIndex = 0;
        playlistIndex < this.playlists.length;
        playlistIndex++
      ) {
        description +=
          playlistIndex + ") " + this.playlists[playlistIndex].name + "\n";
  
        // Loop through the songs
        for (
          let songIndex = 0;
          songIndex < this.playlists[playlistIndex].songs.length;
          songIndex++
        ) {
          description +=
            songIndex +
            ") " +
            this.playlists[playlistIndex].songs[songIndex].name +
            "\n";
        }
        description += "--" + "\n";
      }
      return description;
    }

  viewPlaylist() {
    const index = prompt("Enter the index of the playlist you wish to view: ");
    if (index > -1 && index < this.playlists.length) {
      //validate user entry to avoid error
      this.selectedPlaylist = this.playlists[index];
      let description = "Playlist Name: " + this.selectedPlaylist.name + "\n";

      for (let i = 0; i < this.selectedPlaylist.songs.length; i++) {
        description +=
          "      " + i + ") " +
          this.selectedPlaylist.songs[i].name +
          "\n";
      }

      const selection = this.showPlaylistMenuOptions(description);
      switch (selection) {
        case "1":
          this.createSong();
          break;
        case "2":
          this.deleteSong();
          break;
      }
    } else {
      prompt("Invalid entry");
    }
  }

  deletePlaylist() {
    const index = prompt(
      "Enter the index of the playlist you wish to delete: "
    );
    if (index > -1 && index < this.playlists.length) {
      this.playlists.splice(index, 1);
    }
  }
  createSong() {
    const name = prompt("Enter name of the new song: ");
    this.selectedPlaylist.songs.push(new Song(name));
  }

  deleteSong() {
    const index = prompt("Enter the index of the song you wish to delete: ");
    if (index > -1 && index < this.selectedPlaylist.songs.length) {
      this.selectedPlaylist.songs.splice(index, 1);
    }
  }
}

const menu = new Menu();
menu.start();
