import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IProject } from '../models/iproject.interface';
import { catchError, map, Observable } from 'rxjs';

const baseUrl = 'http://localhost:8081/v1/api';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  projectsUrl = `${baseUrl}/projects`;

  private http = inject(HttpClient);

  getProjects(): Observable<IProject[]> {
    return this.http.get<IProject[]>(this.projectsUrl);
  }

  getProject(projectId: number): Observable<IProject> {
    return this.http.get<IProject>(`${this.projectsUrl}/${projectId}`).pipe(
      map((project) => {
        return project;
      }),
      catchError((error) => {
        console.log(error);
        throw error;
      })
    );
  }

  addProject(project: IProject) {
    return this.http.post<IProject>(this.projectsUrl, project);
  }

  getProjectStatus(projectId: string): Observable<string> {
    return this.http.get<string>(`${baseUrl}/projects/${projectId}/status`);
  }

  deleteProject(projectId: number) {
    return this.http.delete(`${this.projectsUrl}/${projectId}`);
  }
}
