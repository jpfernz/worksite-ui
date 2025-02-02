import { Component, DestroyRef, inject } from '@angular/core';
import { AsyncPipe, DatePipe } from '@angular/common';
import { IProject, ProjectStatus } from './models/iproject.interface';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { AddProjectComponent } from './components/add-project/add-project.component';

import {
  ColDef,
  GridApi,
  ModuleRegistry,
  RowSelectionOptions,
  SelectionChangedEvent,
  StatusPanelDef,
  ValueGetterParams,
} from 'ag-grid-community';
import { Store } from '@ngrx/store';
import { ProjectsActions } from './data/projects.actions';
import {
  firstValueFrom,
  map,
  Observable,
  of,
  switchMap,
  take,
  takeUntil,
  tap,
} from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { selectCurrentProject, selectProjects } from './data/projects.reducers';
import { AgGridAngular } from 'ag-grid-angular';
import { ExportStatusButton } from '../shared/grid/status.button1.component';
import { ExcelExportModule, StatusBarModule } from 'ag-grid-enterprise';
import { ProjectsService } from './data/projects.service';
ModuleRegistry.registerModules([StatusBarModule, ExcelExportModule]);

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
  private dataService = inject(ProjectsService);
  private destroyRef = inject(DestroyRef);

  private gridApi!: GridApi;

  projectsList$!: Observable<IProject[]>;

  columnDefs: ColDef<IProject>[] = [
    { field: 'title', headerName: 'Title' },
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

  public rowSelection: RowSelectionOptions | 'single' | 'multiple' = {
    mode: 'singleRow',
  };

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.store.dispatch(ProjectsActions.loadProjects());
    this.projectsList$ = this.store.select(selectProjects);
  }

  testAsyncHandler(): Observable<boolean> {
    return of(true);
  }

  async midAsyncHandler(): Promise<boolean> {
    const projectStatus = await firstValueFrom(this.testAsyncHandler());
    return projectStatus;
  }

  async onTestButtonClick() {
    const asyncValue = await this.midAsyncHandler();
  }

  onAddProject() {
    this.dialog.open(AddProjectComponent);
  }

  onDeleteProject() {
    this.store
      .select(selectCurrentProject)
      .pipe(
        map((project) => project),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((project) => {
        if (project?.id) {
          console.log('Deleting project', project);
          // this.store.dispatch(
          //   ProjectsActions.deleteProject({ projectId: parseInt(project.id) })
          // );
        }
      });
  }

  onSelectedProject(event: SelectionChangedEvent) {
    this.store.dispatch(
      ProjectsActions.selectProject({ project: event.api.getSelectedRows()[0] })
    );
  }

  public statusBar: {
    statusPanels: StatusPanelDef[];
  } = {
    statusPanels: [
      {
        statusPanel: ExportStatusButton,
        key: 'exportStatusButton',
        align: 'right',
        statusPanelParams: {
          statusBarSettings: {
            exportFlagCallback: () => this.midAsyncHandler(), // this works too
            anotherValue: false,
          },
        },
      },
    ],
  };
}
