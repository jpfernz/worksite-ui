import { Component, EventEmitter, inject, Output } from '@angular/core';
import { IStatusPanelAngularComp } from 'ag-grid-angular';
import { IStatusPanelParams } from 'ag-grid-community';
import { ButtonClickDirective } from '../directives/button.click.directive';
import { Store } from '@ngrx/store';
import { selectCurrentProject } from '../../projects/state/projects.reducers';
import { map, of, switchMap, take, tap } from 'rxjs';
import { IProject } from '../../projects/models/iproject.interface';
import { ProjectsService } from '../../projects/services/projects.service';

@Component({
  selector: 'app-status-button1',
  standalone: true,
  imports: [],
  template: `
    <div class="ag-status-name-value">
      <input
        type="button"
        class="status-bar-input"
        (click)="onClick()"
        value="Export"
        (buttonClicked)="onClick()"
      />
    </div>
  `,
  styles: `
    :host {
      display: block;
    }
  `,
})
export class ExportStatusButton implements IStatusPanelAngularComp {
  private params!: IStatusPanelParams;
  private store = inject(Store);
  private projectService = inject(ProjectsService);

  @Output() buttonClicked = new EventEmitter<void>();

  agInit(params: IStatusPanelParams): void {
    this.params = params;
  }

  onClick(): void {
    let isProjectActive = false;

    let currentProject: IProject;

    this.store
      .select(selectCurrentProject)
      .pipe(
        take(1),
        switchMap((project) => {
          if (project && project.id) {
            return this.projectService.getProjectStatus(project.id);
          } else {
            return of('No project selected');
          }
        })
      )
      .subscribe();

    // this.params.api.exportDataAsExcel();
  }
}
