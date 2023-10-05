import { Component, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Employee } from '../models/employee';
import { EmployeeService } from './employees.service';
import { Observable } from 'rxjs';
import { MatListModule } from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDialog, MatDialogConfig, MatDialogModule } from '@angular/material/dialog';
import { EmployeeDialogComponent } from './employee-dialog/employee-dialog.component';
import { AgGridAngular, AgGridModule } from 'ag-grid-angular';
import { CellClickedEvent, ColDef, GridOptions, GridReadyEvent } from 'ag-grid-community';


@Component({
    selector: 'app-employees',
    templateUrl: './employees.component.html',
    styleUrls: ['./employees.component.scss'],
    standalone: true,
    imports: [CommonModule, MatListModule, MatButtonModule, MatDialogModule, MatSidenavModule, AgGridModule],
    providers: []
})
export class EmployeesComponent {
  employees$!: Observable<Employee[]>;

  private employeeService = inject(EmployeeService);
  private dialog = inject(MatDialog)

  public columnDefs: ColDef[] = [
    {headerName: 'First Name', field: 'firstName'},
    {headerName: 'Last Name', field: 'lastName'},
    {headerName: 'Contact Number', field: 'contactNumber'},
    {headerName: 'Project', field: 'project'}
  ];

  public defaultColDef: ColDef = {
    resizable: true,
    flex: 1
  }

  gridOptions: GridOptions = {
    suppressRowTransform: true,
    suppressColumnVirtualisation: true,
  }

  public rowData$!: Observable<any[]>;

  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;

  onGridReady(params: GridReadyEvent) {
    this.rowData$ = this.employeeService.getEmployees();
  }

  ngOnInit() {
    // this.employees$ = this.employeeService.getEmployees();
  }

  onCellClicked(e: CellClickedEvent): void {
    console.log('cellClicked', e);
  }

  clearSelection(): void {
    this.agGrid.api.deselectAll();
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
