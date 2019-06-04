import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor() {}

  encodeSpecialSymbols(url: string): string {
    url = url.replace(new RegExp(/[~]/g), '%7E');
    url = url.replace(new RegExp(/[!]/g, 'g'), '%21');
    url = url.replace(new RegExp(/[*]/g, 'g'), '%2A');
    url = url.replace(new RegExp(/[(]/g, 'g'), '%28');
    url = url.replace(new RegExp(/[)]/g, 'g'), '%29');
    return url;
  }
}
