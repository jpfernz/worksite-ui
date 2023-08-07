import { Component } from '@angular/core';
import { createFakeEmployees } from '../utils/factory/employee-factory';
import { Employee } from '../models/employee';
import { EmployeeService } from './employee.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent {
  employees$!: Observable<Employee[]>;

  constructor(private dataService: EmployeeService) { }

  ngOnInit() {
    this.employees$ = this.dataService.getEmployees();
  }
}
