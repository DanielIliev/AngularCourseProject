import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  isLogged: boolean = false;
  constructor(private router: Router, private localStorageService: LocalStorageService) {}

  ngOnInit(): void {
    const token = this.localStorageService.get('authToken');

    if (token !== null) {
      this.isLogged = true;
    }
  }

  goToPosts() {
    this.router.navigate(['/board']);
  }

  goToAddPost() {
    this.router.navigate(['/add']);
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
