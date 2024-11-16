import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Project } from '../models/project';
import { map, Observable } from 'rxjs';

const baseUrl = 'http://localhost:8080/v1/api';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  projectsUrl = `${baseUrl}/projects`;

  private http = inject(HttpClient);

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.projectsUrl);
  }

  addProject(project: Project) {
    return this.http.post<Project>(this.projectsUrl, project).pipe(
      map((response) => {
        console.log(response);
      })
    );
  }
}
