import { Component, inject } from '@angular/core';
import { createFakeEmployees } from '../utils/factory/employee-factory';
import { Employee } from '../models/employee';
import { EmployeeService } from './employee.service';
import { Observable } from 'rxjs';
import { MatListModule } from '@angular/material/list';
import { NgIf, NgFor, AsyncPipe } from '@angular/common';

@Component({
    selector: 'app-employees',
    templateUrl: './employees.component.html',
    styles: [],
    standalone: true,
    imports: [NgIf, MatListModule, NgFor, AsyncPipe]
})
export class EmployeesComponent {
  employees$!: Observable<Employee[]>;

  private dataService = inject(EmployeeService)

  ngOnInit() {
    this.employees$ = this.dataService.getEmployees();
  }
}
