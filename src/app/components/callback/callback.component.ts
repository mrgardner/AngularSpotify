import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UtilService } from '../../services/util/util.service';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.scss']
})
export class CallbackComponent implements OnInit {
  public _window: any;
  constructor(
    private route: ActivatedRoute,
    private utilService: UtilService) {
      this._window = window;
    }

  ngOnInit() {
    this.route.fragment.subscribe((fragment: string) => {
      if (fragment.split('access_token=').length === 2 && fragment.split('access_token=')[1].split('&').length === 4) {
        const authToken = fragment.split('access_token=')[1].split('&')[0];
        const expiredDate = new Date();
        expiredDate.setHours(expiredDate.getHours() + 1);
        this.utilService.setCookie('spotifyToken', authToken, expiredDate.toUTCString());
        this._window.opener.spotifyCallback(authToken);
      }
    });
  }
}
