import { Component } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Project } from './models/project';
import { of } from 'rxjs';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
})
export class ProjectsComponent {
  dummyProjects: Project[] = [
    {
      id: 'prj1',
      name: 'Project 1',
      description: 'Description 1',
      projectManager: 'Manager 1',
      status: 'Active',
    },
    {
      id: 'prj2',
      name: 'Project 2',
      description: 'Description 2',
      projectManager: 'Manager 2',
      status: 'Active',
    },
    {
      id: 'prj3',
      name: 'Project 3',
      description: 'Description 3',
      projectManager: 'Manager 3',
      status: 'Active',
    },
    {
      id: 'prj4',
      name: 'Project 4',
      description: 'Description 4',
      projectManager: 'Manager 4',
      status: 'Active',
    },
    {
      id: 'prj5',
      name: 'Project 5',
      description: 'Description 5',
      projectManager: 'Manager 5',
      status: 'Active',
    },
  ];

  projects$ = of(this.dummyProjects);
}
