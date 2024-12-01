import { Component } from '@angular/core';
import { IStatusPanelAngularComp } from 'ag-grid-angular';
import { IStatusPanelParams } from 'ag-grid-community';
import { ButtonClickDirective } from '../directives/button.click.directive';

@Component({
  selector: 'app-status-button1',
  standalone: true,
  imports: [ButtonClickDirective],
  template: `
    <div class="ag-status-name-value">
      <span class="component">
        Status Bar Component
        <input
          appButtonClick
          type="button"
          class="status-bar-input"
          (click)="onClick()"
          value="Click Me"
        />
      </span>
    </div>
  `,
  styles: `
    :host {
      display: block;
    }
  `,
})
export class StatusButton1 implements IStatusPanelAngularComp {
  private params!: IStatusPanelParams;

  agInit(params: IStatusPanelParams): void {
    this.params = params;
  }

  onClick(): void {
    console.log('Button clicked from host');
  }
}
