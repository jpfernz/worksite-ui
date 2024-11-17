import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { IProject, ProjectStatus } from './models/iproject.interface';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { AddProjectComponent } from './components/add-project/add-project.component';

import { ColDef, ValueGetterParams } from 'ag-grid-community';
import { Store } from '@ngrx/store';
import { ProjectsActions } from './state/projects.actions';
import { Observable } from 'rxjs';
import { selectProjects } from './state/projects.reducers';
import { AgGridAngular } from 'ag-grid-angular';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [MatButtonModule, AgGridAngular, AsyncPipe],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
})
export class ProjectsComponent {
  private readonly dialog = inject(MatDialog);
  private store = inject(Store);

  projectsList$!: Observable<IProject[]>;

  columnDefs: ColDef<IProject>[] = [
    { field: 'title', headerName: 'Title' },
    { field: 'description', headerName: 'Description' },
    { field: 'projectManager', headerName: 'Project Manager' },
    {
      field: 'status',
      headerName: 'Status',
      valueGetter: (params: ValueGetterParams<IProject>) => {
        if (!params.data) return '';
        const status = params.data
          .status as unknown as keyof typeof ProjectStatus;
        return ProjectStatus[status] || '';
      },
    },
    { field: 'startDate', headerName: 'Start Date' },
    { field: 'endDate', headerName: 'End Date' },
  ];

  onGridReady(params: any) {
    this.store.dispatch(ProjectsActions.loadProjects());
    this.projectsList$ = this.store.select(selectProjects);
  }

  onAddProject() {
    this.dialog.open(AddProjectComponent);
    console.log('Add Project');
  }
}
