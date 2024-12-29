import { Component, inject } from '@angular/core';
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
import { ProjectsActions } from './state/projects.actions';
import {
  firstValueFrom,
  map,
  Observable,
  of,
  switchMap,
  take,
  tap,
} from 'rxjs';
import { selectProjects } from './state/projects.reducers';
import { AgGridAngular } from 'ag-grid-angular';
import { ExportStatusButton } from '../shared/grid/status.button1.component';
import { ExcelExportModule, StatusBarModule } from 'ag-grid-enterprise';
import { ProjectsService } from './services/projects.service';
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
    // return this.store.select(selectProjects).pipe(
    //   take(1),
    //   switchMap((projects) => {
    //     if (projects && projects.length > 0 && projects[0].id !== undefined) {
    //       const projectId = parseInt(projects[0].id);
    //       return this.dataService.getProject(projectId).pipe(
    //         tap((project) => console.log(`project: ${project.status}`)),
    //         map(
    //           (project) =>
    //             (project.status as unknown as string) ===
    //             ProjectStatus.NOT_STARTED
    //         )
    //       );
    //     } else {
    //       return of(false);
    //     }
    //   })
    // );
  }

  async midAsyncHandler(): Promise<boolean> {
    // console.log('do something');
    // store the value of testAsyncHandler to a variable
    const projectStatus = await firstValueFrom(this.testAsyncHandler());
    // const projectStatus = this.testAsyncHandler()
    return projectStatus;
    console.log(`projectStatus: ${projectStatus}`);
  }

  async onTestButtonClick() {
    const asyncValue = await this.midAsyncHandler();
    console.log(`from testButtonClick: ${asyncValue}`);
    // console.log(`from testButtonClick: ${this.testAsyncHandler()}`);
    // console.log(`projectStatus: ${projectStatus}`);
  }

  onAddProject() {
    this.dialog.open(AddProjectComponent);
    console.log('Add Project');
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
            // exportFlag: true,
            // exportFlagCallback: () => this.midAsyncHandler(),
            anotherValue: false,
          },
        },
      },
    ],
  };
}
