import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { IProject } from './models/iproject.interface';
// import { of } from 'rxjs';
import { ProjectsService } from './services/projects.service';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { AddProjectComponent } from './components/add-project/add-project.component';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [AsyncPipe, MatButtonModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
})
export class ProjectsComponent {
  private readonly dialog = inject(MatDialog);

  private dataService = inject(ProjectsService);

  // projects$ = of(this.dummyProjects);
  projects$ = this.dataService.getProjects();

  onAddProject() {
    this.dialog.open(AddProjectComponent);
    console.log('Add Project');
  }
}
