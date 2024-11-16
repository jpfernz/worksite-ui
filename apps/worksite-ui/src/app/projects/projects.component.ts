import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Project } from './models/project';
import { of } from 'rxjs';
import { DataService } from './services/data.service';

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
      title: 'Project 1',
      description: 'Description 1',
      projectManager: 'Manager 1',
      status: 'Active',
      startDate: '',
      endDate: '',
    },
    {
      id: 'prj2',
      title: 'Project 2',
      description: 'Description 2',
      projectManager: 'Manager 2',
      status: 'Active',
      startDate: '',
      endDate: '',
    },
    {
      id: 'prj3',
      title: 'Project 3',
      description: 'Description 3',
      projectManager: 'Manager 3',
      status: 'Active',
      startDate: '',
      endDate: '',
    },
    {
      id: 'prj4',
      title: 'Project 4',
      description: 'Description 4',
      projectManager: 'Manager 4',
      status: 'Active',
      startDate: '',
      endDate: '',
    },
    {
      id: 'prj5',
      title: 'Project 5',
      description: 'Description 5',
      projectManager: 'Manager 5',
      status: 'Active',
      startDate: '',
      endDate: '',
    },
  ];

  private dataService = inject(DataService);

  // projects$ = of(this.dummyProjects);
  projects$ = this.dataService.getProjects();
}
