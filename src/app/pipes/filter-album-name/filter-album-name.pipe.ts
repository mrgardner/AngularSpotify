// Common
import { Pipe, PipeTransform } from '@angular/core';

// Interfaces
import { AlbumApollo } from '@interfaces/apollo/apollo.inerface';

@Pipe({
  name: 'filterAlbumName'
})
export class FilterAlbumNamePipe implements PipeTransform {
  // TODO: Fix type / return type
  transform(albums: Array<AlbumApollo>, args?: string): any {
    if (args) {
      return albums.filter((album: AlbumApollo) => {
        return album.name.toLowerCase().includes(args.toLowerCase());
      });
    } else {
      return albums;
    }
  }
}
