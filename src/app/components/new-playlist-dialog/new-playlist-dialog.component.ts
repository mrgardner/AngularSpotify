import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SpotifyService } from '../../services/spotify/spotify.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

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
  public reader: any;
  public form = new FormGroup({
    playlistName: new FormControl('', Validators.required),
    playlistDescription: new FormControl('')
  });

  constructor(
    public dialogRef: MatDialogRef<NewPlaylistDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Object,
    private spotifyService: SpotifyService) {}

  get playlistNameLength(): any {
    return this.form.get('playlistName').value.length;
  }

  get playlistDescriptionLength(): any {
    return this.form.get('playlistDescription').value.length;
  }

  ngOnInit() {
    this.playlistName = 'New Playlist';
    this.playlistDescription = '';
    this.playlistNameMaxLength = 100;
    this.playlistDescriptionMaxLength = 300;
    this.playlistDescriptionPlaceholder = 'Give your playlist a catchy description.';
    this.showUserButtons = false;
  }

  triggerFile() {
    document.getElementById('file').click();
  }

  closeModal(): void {
    this.dialogRef.close();
  }

  getFile(event): void {
    if (event.target.files && event.target.files[0]) {
      this.reader = new FileReader();

      this.reader.onload = (events: ProgressEvent) => {
        this.currentImage = (<FileReader>events.target).result;
        this.imageFile = this.currentImage.split(',')[1];
        document.getElementsByClassName(<string>this.dialogRef._containerInstance._config.panelClass)[0]['style'].height = '380px';
      };
      this.reader.readAsDataURL(event.target.files[0]);
    }
  }

  resetImage() {
    this.currentImage = null;
    this.imageFile = null;
    document.getElementsByClassName(<string>this.dialogRef._containerInstance._config.panelClass)[0]['style'].height = '300px';
  }

  replaceImage() {
    document.getElementById('file2').click();
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
