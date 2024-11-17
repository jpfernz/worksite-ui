import { Component, DestroyRef, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { IProject } from './models/iproject.interface';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
// import { of } from 'rxjs';
import { ProjectsService } from './services/projects.service';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { AddProjectComponent } from './components/add-project/add-project.component';

import { ColDef, GridApi } from 'ag-grid-community';
import { Store } from '@ngrx/store';
import { ProjectsActions } from './state/projects.actions';
import { Observable } from 'rxjs';
import { selectError, selectProjects } from './state/projects.reducers';
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
  private destroyRef = inject(DestroyRef);

  private gridApi!: GridApi<IProject>;
  projectsList$!: Observable<IProject[]>;

  // private dataService = inject(ProjectsService);

  // projects$ = of(this.dummyProjects);
  // projects$ = this.dataService.getProjects();

  columnDefs: ColDef<IProject>[] = [
    { field: 'title', headerName: 'Title' },
    { field: 'description', headerName: 'Description' },
    { field: 'projectManager', headerName: 'Project Manager' },
    { field: 'status', headerName: 'Status' },
    { field: 'startDate', headerName: 'Start Date' },
    { field: 'endDate', headerName: 'End Date' },
  ];

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.store.dispatch(ProjectsActions.loadProjects());
    this.projectsList$ = this.store.select(selectProjects);
    this.store
      .select(selectError)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((error) => {
        if (error) {
          console.error(error);
        }
      });
  }

  onAddProject() {
    this.dialog.open(AddProjectComponent);
    console.log('Add Project');
  }
}
