import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_SNACK_BAR_DATA, MatSnackBarModule, MatSnackBarRef } from '@angular/material/snack-bar';
import { MatIconModule} from '@angular/material/icon';

interface AlertData {
  message: string,
  action: string
}

@Component({
  selector: 'app-alerts-bar',
  standalone: true,
  imports: [CommonModule, MatSnackBarModule, MatIconModule],
  template: `
    <span data-test="conf-message">{{data.message}}</span>
    <span matSnackBarActions>
      <button mat-icon-button matSnackBarAction (click)="snackBarRef.dismissWithAction()">
        <!-- {{data.action}} -->
        <mat-icon>close</mat-icon>
      </button>
    </span>
  `,
  styles: [
    `
    :host {
      display: flex;
      justify-content: space-between;
    }
    `
  ]
})
export class AlertsBarComponent {
  public data: AlertData = inject(MAT_SNACK_BAR_DATA);
  snackBarRef = inject(MatSnackBarRef)
}
