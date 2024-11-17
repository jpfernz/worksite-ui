import { Component, inject } from '@angular/core';
import { AsyncPipe, DatePipe } from '@angular/common';
import { IProject, ProjectStatus } from './models/iproject.interface';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { ProjectDialogComponent } from './components/project-dialog/project-dialog.component';

import {
  ColDef,
  RowSelectionOptions,
  ValueGetterParams,
  RowNodeSelectedEvent,
} from 'ag-grid-community';
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
  isProjectSelected = false;

  rowSelection: RowSelectionOptions = {
    mode: 'singleRow',
    checkboxes: true,
    enableClickSelection: true,
  };

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
    {
      field: 'startDate',
      headerName: 'Start Date',
      valueFormatter: (params) => {
        if (!params.value) return '';
        const datePipe = new DatePipe('en-GB');
        return datePipe.transform(params.value, 'dd-MM-yyyy') || '';
      },
    },
    {
      field: 'endDate',
      headerName: 'End Date',
      valueFormatter: (params) => {
        if (!params.value) return '';
        const datePipe = new DatePipe('en-GB');
        return datePipe.transform(params.value, 'dd-MM-yyyy') || '';
      },
    },
  ];

  defaultColDef: ColDef = {
    flex: 1,
  };

  onGridReady(params: any) {
    this.store.dispatch(ProjectsActions.loadProjects());
    this.projectsList$ = this.store.select(selectProjects);
  }

  onRowSelected(event: RowNodeSelectedEvent<IProject>) {
    const project_id = event.node.data?.id;
    if (project_id) {
      this.store.dispatch(ProjectsActions.selectProject({ id: project_id }));
      this.isProjectSelected = true;
    }
  }

  onAddProject() {
    this.dialog.open(ProjectDialogComponent, {
      data: { title: 'Add Project' },
    });
    console.log('Add Project');
  }

  onUpdateProject() {
    this.dialog.open(ProjectDialogComponent, {
      data: { title: 'Update Project' },
    });
    console.log('Update Project');
  }
}
