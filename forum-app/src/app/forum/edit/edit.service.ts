import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from 'src/app/constants/constants';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { EditForm } from 'src/app/types/Post';

@Injectable({
  providedIn: 'root',
})
export class EditService {
  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService
  ) {}

  editPost(id: string, data: EditForm) {
    const url = `${baseUrl}edit/${id}`;
    const token = this.localStorageService.get('authToken');

    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };

    const body = {
      id,
      title: data.title,
      content: data.content,
    };

    return this.http.post(url, body, { headers });
  }
}
