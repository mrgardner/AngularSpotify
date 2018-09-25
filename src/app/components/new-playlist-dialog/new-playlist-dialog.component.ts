import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {SpotifyService} from '../../services/spotify/spotify.service';

@Component({
  selector: 'app-new-playlist-dialog',
  templateUrl: './new-playlist-dialog.component.html',
  styleUrls: ['./new-playlist-dialog.component.scss']
})
export class NewPlaylistDialogComponent implements OnInit {
  public playlistName: string;
  public playlistDescription: string;
  public playlistNameMaxLength: number;
  public playlistDescriptionMaxLength: number;
  public playlistDescriptionPlaceholder: string;
  public currentImage: any;
  public imageFile: any;
  public showUserButtons: boolean;

  constructor(public dialogRef: MatDialogRef<NewPlaylistDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: Object, private spotifyService: SpotifyService) {
    this.playlistName = 'New Playlist';
    this.playlistDescription = '';
    this.playlistNameMaxLength = 100;
    this.playlistDescriptionMaxLength = 300;
    this.playlistDescriptionPlaceholder = 'Give your playlist a catchy description.';
    this.showUserButtons = false;
  }

  ngOnInit() {
  }

  closeModal() {
    this.dialogRef.close();
  }

  getFile(event) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();

      reader.onload = (events: ProgressEvent) => {
        this.currentImage = (<FileReader>events.target).result;
        this.imageFile = this.currentImage.split(',')[1];

      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  onSubmit(event): void {
    const playlistName = event.target[0].value;
    const playlistDescription = event.target[2].value;
    const playlistImage = this.imageFile;
    const body = {
      name: playlistName,
      description: playlistDescription,
      public: true
    };
    this.spotifyService.createNewPlaylist(body, playlistImage).subscribe(() => this.dialogRef.close());
  }
}
