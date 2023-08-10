import { Component, OnInit } from '@angular/core';
import { ProfileService } from './profile.service';
import { ProfileInformation, ProfilePosts } from 'src/app/types/Profile';
import { Observer, Subscription } from 'rxjs';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  profileSub: Subscription | undefined;

  profileInfo: ProfileInformation = {
    username: '',
    email: '',
  };

  profilePosts: ProfilePosts[] = [];

  profileObs: Observer<ProfilePosts[]> = {
    next: (response) => {
      this.profilePosts = response;
    },
    error: (err) => {
      console.log(err);
    },
    complete: () => {
      console.log('Done');
    },
  };

  constructor(
    private profileService: ProfileService,
    private localStorageService: LocalStorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const user = this.localStorageService.get('userData');

    if (user !== null) {
      const { _id, username, email } = JSON.parse(user);

      this.profileInfo['username'] = username;
      this.profileInfo['email'] = email;
      this.profileService.getProfilePosts(_id).subscribe(this.profileObs);
    }
  }

  postDetails(id: String): void {
    this.router.navigate([`post/${id}`]);
  }

  ngOnDestroy() {
    this.profileSub?.unsubscribe();
  }
}
