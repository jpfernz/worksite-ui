import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_SNACK_BAR_DATA, MatSnackBarModule, MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
  selector: 'app-alerts-bar',
  standalone: true,
  imports: [CommonModule, MatSnackBarModule],
  template: `
    <span data-test="conf-message">{{data}}</span>
  `,
  styles: []
})
export class AlertsBarComponent {
  public data: string = inject(MAT_SNACK_BAR_DATA);
}
