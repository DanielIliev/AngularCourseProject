import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  loggedIn: boolean = false;
  active: boolean = false;

  constructor() {}

  ngOnInit(): void {
    // TODO verify if the used is already logged in
  }

  toggleIconAnimation() {
    // TODO hide collapsed menu on nav click
    this.active = !this.active;
  }
}
