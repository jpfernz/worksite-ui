import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'custom-status-bar',
  standalone: true,
  imports: [MatButtonModule],
  template: `
    <div class="ag-custom-status-bar">
      <input
        type="button"
        mat-flat-button
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
export class CustomStatusBar {
  onClick(): void {
    console.log('Export button clicked');
  }
}
