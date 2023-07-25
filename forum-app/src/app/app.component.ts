import { Component, Inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { fader } from './route-animations';
import { LocalStorageService } from './services/local-storage.service';
import { WINDOW } from './utils/window.injectable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    fader
  ]
})
export class AppComponent implements OnInit {
  loggedIn: boolean = false;
  active: boolean = false;
  token: string | null = this.localStorageService.get('authToken');

  constructor(private localStorageService: LocalStorageService, @Inject(WINDOW) private window: Window) {
    if (this.token) {
      this.loggedIn = true;
    }
  }

  ngOnInit(): void {
    if (this.token) {
      this.loggedIn = true;
    }
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation']
  }

  toggleIconAnimation() {
    // TODO hide collapsed menu on nav click
    this.active = !this.active;
  }

  logout(event: Event) {
    event.preventDefault();
    this.localStorageService.remove('authToken');
    this.window.location.reload();
  }
}
