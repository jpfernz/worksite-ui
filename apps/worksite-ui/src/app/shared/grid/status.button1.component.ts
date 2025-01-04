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

  exportGridData(): void {
    console.log('Exporting grid data');
  }

  onExportClick(): void {
    // Check if callback function is defined to catch possible errors
    if (typeof this.statusBarSettings?.exportFlagCallback !== 'function') {
      console.log('exportFlagCallback function is not defined');
    }

    // Check if callback function is defined to catch possible.
    if (typeof this.statusBarSettings?.exportFlagCallback === 'function') {
      console.log('exportFlagCallback function is defined');

      // If exportCallBack is defined, process the data and then exit out of the function
      const exportFlagCallback: Promise<any> =
        this.statusBarSettings.exportFlagCallback();
      console.log('exportFlagCallback: ', exportFlagCallback);

      exportFlagCallback.then((result) => {
        console.log('exportFlagCallback result: ', result);
        if (result) {
          this.exportGridData();
        }
      });
      return;
    }

    // Check if exportFlag is defined
    if (this.statusBarSettings.exportFlag !== undefined) {
      if (this.statusBarSettings.exportFlag) {
        console.log('exportFlag is true');
        this.exportGridData();
      } else {
        console.log('exportFlag is defined and not true');
      }
      return;
    }

    console.log('No export flag defined');
    this.exportGridData();
  }
}
