import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Employee } from '../models/employee';
import { EmployeeService } from './employees.service';
import { Observable } from 'rxjs';
import { MatListModule } from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';
import { MatDialog, MatDialogConfig, MatDialogModule } from '@angular/material/dialog';
import { EmployeeDialogComponent } from './employee-dialog/employee-dialog.component';


@Component({
    selector: 'app-employees',
    templateUrl: './employees.component.html',
    styles: [`
      .top-button-row {
        display: flex;
        justify-content: right;
        margin: 8px;
      }
    `],
    standalone: true,
    imports: [CommonModule, MatListModule, MatButtonModule, MatDialogModule],
    providers: []
})
export class EmployeesComponent {
  employees$!: Observable<Employee[]>;

  private employeeService = inject(EmployeeService);
  private dialog = inject(MatDialog)

  ngOnInit() {
    this.employees$ = this.employeeService.getEmployees();
  }

  onAddNew() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true;
    dialogConfig.width = "400px";
    dialogConfig.data = "Add New Employee";

    this.dialog.open(EmployeeDialogComponent, {
      data: {
        title: "Add New Employee"
      },
    });
  }
}
