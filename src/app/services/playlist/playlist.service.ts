import {EventEmitter, Injectable} from '@angular/core';
import {switchMap} from 'rxjs/internal/operators';
import {of} from 'rxjs';
import {AngularFirestore} from 'angularfire2/firestore';
import {AngularFireAuth} from 'angularfire2/auth';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {
  public didPlaylistChange$: EventEmitter<any>;
  public deletingPlaylists$: EventEmitter<any>;
  public selectPlaylist$: EventEmitter<any>;
  public test$: EventEmitter<any>;
  public test2$: EventEmitter<any>;
  private isPlaylistsBeingDeleted: boolean;

  constructor(private afs: AngularFirestore, private afa: AngularFireAuth, private router: Router) {
    this.didPlaylistChange$ = new EventEmitter();
    this.deletingPlaylists$ = new EventEmitter();
    this.selectPlaylist$ = new EventEmitter();
    this.test$ = new EventEmitter();
    this.test2$ = new EventEmitter();
    this.deletingPlaylists$.subscribe(value => this.isPlaylistsBeingDeleted = value);
    this.isPlaylistsBeingDeleted = false;
  }

  getSavedPlaylist(playlistName: string) {
    return this.afa.user.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.collection('users').doc(user['email']).collection('playlists').doc(playlistName).valueChanges();
        } else {
          return of();
        }
      }),
      switchMap(data => {
        if (data) {
          return [data['playlistData']];
        } else {
          return ['No playlist data'];
        }
      })
    );
  }

  test(value) {
    this.test$.emit(value);
  }

  test2(value) {
    this.test2$.emit(value);
  }

  saveDeviceID(id) {
    let userObject = {};
    this.afa.user.pipe(
      switchMap(user => {
        userObject = user;
        if (user) {
          return this.afs.collection('users').doc(userObject['email']).collection('devices').doc('currentDevice').set({currentDevice: id});
        } else {
          return of();
        }
      })
    ).subscribe(() => {});
  }

  getCurrentDevice() {
    return this.afa.user.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.collection('users').doc(user['email']).collection('devices').doc('currentDevice').valueChanges();
        } else {
          return of();
        }
      }),
      switchMap(data => {
        if (data) {
          return [data['currentDevice']];
        } else {
          return ['No playlist data'];
        }
      })
    );
  }

  getCurrentPlaylistTracksChange(playlistID) {
    return this.afa.user.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.collection('users').doc(user['email'])
            .collection('playlists').doc(playlistID).collection('tracks').stateChanges();
        } else {
          return of();
        }
      })
    );
  }

  savePlaylist(playlist) {
    let userObject = {};
    this.afa.user.pipe(
      switchMap(user => {
        userObject = user;
        if (user) {
          return this.afs.collection('users').doc(userObject['email']).collection('playlists').doc(playlist.id).valueChanges();
        } else {
          return of();
        }
      })
    ).subscribe(data => {
      if (!this.isPlaylistsBeingDeleted) {
        const playlistCoverURL = playlist.images.length > 0 ? playlist.images[0].url : '/assets/blank_album.png';
        const tuple = {
          name: playlist.name,
          owner: playlist.owner.id,
          playlistID: playlist.id,
          playlistLength: playlist.tracks.total,
          playlistCoverURL
        };
        if (!data) {
          this.afs.collection('users').doc(userObject['email']).collection('playlists').doc(playlist.id).set({playlistData: tuple});
        } else {
          this.afs.collection('users').doc(userObject['email']).collection('playlists').doc(playlist.id).update({playlistData: tuple});
        }
        this.router.navigate(['/playlist', playlist.id]);
      }
    });
  }

  deletePlaylists() {
    this.deletingPlaylists$.emit(true);
    this.afa.user.subscribe(user => {
      if (user) {
        this.afs.collection('users').doc(user['email']).collection('playlists').ref.get()
          .then(querySnapShot => {
            const batch = this.afs.firestore.batch();
            querySnapShot.forEach(doc => {
              this.afs.collection('users').doc(user['email']).
              collection('playlists').doc(doc.ref.id).collection('tracks').ref.get().then(querySnapShot2 => {
                const subBatch = this.afs.firestore.batch();
                querySnapShot2.forEach(subDoc => {
                  subBatch.delete(subDoc.ref);
                });
                return subBatch.commit();
              });
              batch.delete(doc.ref);
            });
            return batch.commit();
          }).then(() => this.deletingPlaylists$.emit(false));
      }
    });
  }

  selectPlaylist(value) {
    this.selectPlaylist$.emit(value);
  }
}
