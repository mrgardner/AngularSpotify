// Angular Material
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

// Common
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

// Services
import { SpotifyService } from '@services/spotify/spotify.service';

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
  public currentImage: string | ArrayBuffer;
  public imageFile: string;
  public showUserButtons: boolean;
  public reader: FileReader;
  public form = new FormGroup({
    playlistName: new FormControl('', Validators.required),
    playlistDescription: new FormControl(''),
    playlistImage: new FormControl(''),
    playlistImage2: new FormControl('')
  });

  constructor(
    public dialogRef: MatDialogRef<NewPlaylistDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private spotifyService: SpotifyService) {}

  get playlistNameLength(): number {
    return (this.form.get('playlistName').value as string).length;
  }

  get playlistDescriptionLength(): number {
    return (this.form.get('playlistDescription').value as string).length;
  }

  ngOnInit(): void {
    this.playlistName = 'New Playlist';
    this.playlistDescription = '';
    this.playlistNameMaxLength = 100;
    this.playlistDescriptionMaxLength = 300;
    this.playlistDescriptionPlaceholder = 'Give your playlist a catchy description.';
    this.showUserButtons = false;
  }

  triggerFile(): void {
    document.getElementById('file').click();
  }

  closeModal(): void {
    this.dialogRef.close();
  }

  getFile(event: Event): void {
    if ((event.target as HTMLInputElement).files && (event.target as HTMLInputElement).files[0]) {
      this.reader = new FileReader();

      this.reader.onload = (events: ProgressEvent) => {
        this.currentImage = (events.target as FileReader).result;
        this.imageFile = (this.currentImage as string).split(',')[1];
        (document.getElementsByClassName(this.dialogRef._containerInstance._config.panelClass as string)[0] as HTMLElement).style.height = '380px';
      };
      this.reader.readAsDataURL((event.target as HTMLInputElement).files[0]);
    }
  }

  resetImage(): void {
    this.currentImage = null;
    this.imageFile = null;
    (document.getElementsByClassName(this.dialogRef._containerInstance._config.panelClass as string)[0] as HTMLElement).style.height = '300px';
  }

  replaceImage(): void {
    document.getElementById('file2').click();
  }

  onSubmit(): void {
    const playlistName = this.form.get('playlistName').value;
    const playlistDescription = this.form.get('playlistDescription').value;
    const playlistImage: File = this.form.get('playlistImage2').value ? (this.form.get('playlistImage2').value as File)
      : (this.form.get('playlistImage').value as File);
    const body = {
      name: playlistName,
      description: playlistDescription,
      public: true
    };
    this.spotifyService.createNewPlaylist(body, playlistImage).subscribe(() => this.dialogRef.close());
  }
}
