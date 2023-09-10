import { Component, Inject, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from "@angular/material/dialog";
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { DialogData } from '../dialog-interface';
import { MatButtonModule } from '@angular/material/button';
import { EmployeeService } from '../employees.service';
import { Employee } from '../../models/employee';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AlertsBarComponent } from '../../common/alerts-bar/alerts-bar.component';

@Component({
  selector: 'app-employee-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule, MatSnackBarModule],
  templateUrl: './employee-dialog.component.html',
  styles: [`
    .form-container mat-form-field {
      margin-left: 8px;
    }

    .bottom-button-row {
      display: flex;
      justify-content: right;
      margin-left: 8px;
    }

    button {
      margin: 8px 8px 8px 8px;
    }
  `]
})
export class EmployeeDialogComponent {
  employeeForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    contactNumber: new FormControl(''),
    project: new FormControl('')
  });

  public dialogRef = inject(MatDialogRef<EmployeeDialogComponent>);
  public data: DialogData = inject(MAT_DIALOG_DATA);
  private employeeService = inject(EmployeeService);
  private _snackBar = inject(MatSnackBar);

  onSubmit() {
    const newEmployee: Employee = {
      firstName: this.employeeForm.value.firstName ?? '',
      lastName: this.employeeForm.value.lastName ?? '',
      contactNumber: this.employeeForm.value.contactNumber ?? '',
      project: this.employeeForm.value.project ?? ''
    };

    console.log(newEmployee);
    // console.log(this.employeeForm.value);

    this.employeeService.addEmployee(newEmployee)
      .subscribe(resp => {
        console.log(resp.message);
        this.openAlertMsg(resp.message);
      });
    this.dialogRef.close();
  }

  openAlertMsg(message:string, action?: string) {
    this._snackBar.openFromComponent(AlertsBarComponent, {
      data: message,
      duration: 5000,

    });
  }

  onCancel() {
    this.dialogRef.close();
  }

}
