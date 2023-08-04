// Common
import { Pipe, PipeTransform } from '@angular/core';

// Interfaces
import { AlbumApollo } from '@app/interfaces/apollo/apollo.inerface';

@Pipe({
  name: 'filterAlbumName'
})
export class FilterAlbumNamePipe implements PipeTransform {
  // TODO: Fix type / return type
  transform(albums: Array<AlbumApollo>, args?: string): any {
    if (args) {
      return albums.filter((album: AlbumApollo) => {
        return album.album.name.toLowerCase().includes(args.toLowerCase());
      });
    } else {
      return albums;
    }
  }
}
