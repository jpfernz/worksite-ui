import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Project } from '../models/project';

const baseUrl = 'http://localhost:8080/v1/api';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  projectsUrl = `${baseUrl}/projects`;

  private http = inject(HttpClient);

  getProjects() {
    return this.http.get<Project[]>(this.projectsUrl);
  }
}
