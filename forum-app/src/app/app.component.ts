import { Component, Inject, OnInit } from '@angular/core';
import { LocalStorageService } from './services/local-storage.service';
import { WINDOW } from './utils/window.injectable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
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

  toggleIconAnimation() {
    // TODO hide collapsed menu on nav click
    this.active = !this.active;
  }

  logout() {
    this.localStorageService.remove('authToken');
    this.window.location.reload();
  }
}
