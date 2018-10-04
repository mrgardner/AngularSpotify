import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterAlbumName'
})
export class FilterAlbumNamePipe implements PipeTransform {

  transform(albums: any, args?: any): any {
    if (albums) {
      if (args) {
        return albums.filter(album => {
          return album['album']['name'].toLowerCase().includes(args.toLowerCase());
        });
      } else {
        return albums;
      }
    }
  }
}
