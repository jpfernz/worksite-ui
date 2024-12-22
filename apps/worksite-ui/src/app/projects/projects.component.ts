import { AfterViewInit, Component, inject, ViewChild } from '@angular/core';
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
import { map, Observable, switchMap, take, tap } from 'rxjs';
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

  @ViewChild(ExportStatusButton) statusButton1!: ExportStatusButton;

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

    // this.gridApi.addEventListener('statusButton1Clicked', () => {
    //   console.log('Button clicked from host');
    // });
  }

  handleStatusButtonClick() {
    console.log('Button clicked from host');
    let projectStatus = '';
    this.store
      .select(selectProjects)
      .pipe(
        take(1),
        switchMap((projects) => {
          if (projects && projects.length > 0 && projects[0].id !== undefined) {
            const projectId = parseInt(projects[0].id);
            return this.dataService.getProject(projectId);
          } else {
            return [];
          }
        })
      )
      .subscribe((project) => {
        projectStatus = project.status;
        console.log(`projectStatus: ${projectStatus}`);
      });
    console.log(`projectStatus: ${projectStatus}`);
  }

  testAsyncHandler(): string {
    let projectStatus = '';
    this.store
      .select(selectProjects)
      .pipe(
        take(1),
        switchMap((projects) => {
          if (projects && projects.length > 0 && projects[0].id !== undefined) {
            const projectId = parseInt(projects[0].id);
            return this.dataService.getProject(projectId);
          } else {
            return [];
          }
        })
      )
      .subscribe((project) => {
        projectStatus = project.status;
        // console.log(`projectStatus: ${projectStatus}`);
      });
    return projectStatus;
  }

  onTestButtonClick() {
    console.log(this.testAsyncHandler());
    // console.log(`projectStatus: ${projectStatus}`);
  }

  onAddProject() {
    this.dialog.open(AddProjectComponent);
    console.log('Add Project');
  }

  onSelectedProject(event: SelectionChangedEvent) {
    // const selectedProject = event.api.getSelectedRows()[0];
    this.store.dispatch(
      ProjectsActions.selectProject({ project: event.api.getSelectedRows()[0] })
    );
  }

  // ngAfterViewInit() {
  //   if (this.statusButton1) {
  //     console.log('Status Button 1', this.statusButton1);
  //     this.statusButton1.buttonClicked.subscribe(() => {
  //       console.log('Button clicked from parent');
  //     });
  //   }
  // }

  public statusBar: {
    statusPanels: StatusPanelDef[];
  } = {
    statusPanels: [
      {
        statusPanel: ExportStatusButton,
        key: 'exportStatusButton',
        align: 'right',
        statusPanelParams: {
          onButtonClicked: this.handleStatusButtonClick.bind(this),
        },
      },
    ],
  };
}
