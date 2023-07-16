import { Component } from '@angular/core';
import { createFakeEmployees } from '../utils/factory/employee-factory';
import { Employee } from '../models/employee';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent {
  employees: Employee[] = createFakeEmployees(5);

}
