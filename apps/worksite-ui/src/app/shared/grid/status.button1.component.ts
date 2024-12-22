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
        (click)="onExportClick()"
        value="Export"
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
  private statusBarSettings: any;

  @Output() buttonClicked = new EventEmitter<void>();

  agInit(params: any): void {
    this.params = params;
    this.statusBarSettings = params.statusBarSettings;
  }

  onExportClick(): void {
    console.log(this.statusBarSettings);
    console.log(this.statusBarSettings.exportFlag);
    console.log(this.statusBarSettings.anotherValue);

    // this.params.api.exportDataAsExcel();
  }
}
