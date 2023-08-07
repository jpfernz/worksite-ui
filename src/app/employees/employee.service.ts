import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Employee } from '../models/employee';
import { Observable } from 'rxjs';

const employeesUrl = 'http://localhost:8000/api/v1/employees';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private _http = inject(HttpClient)

  getEmployees(): Observable<Employee[]>{
    return this._http.get<Employee[]>(employeesUrl);
  }
}
