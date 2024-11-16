import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IProject } from '../models/iproject.interface';
import { map, Observable } from 'rxjs';

const baseUrl = 'http://localhost:8080/v1/api';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  projectsUrl = `${baseUrl}/projects`;

  private http = inject(HttpClient);

  getProjects(): Observable<IProject[]> {
    return this.http.get<IProject[]>(this.projectsUrl);
  }

  addProject(project: IProject) {
    return this.http.post<IProject>(this.projectsUrl, project).pipe(
      map((response) => {
        console.log(response);
      })
    );
  }
}
