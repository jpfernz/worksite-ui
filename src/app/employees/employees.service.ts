import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Employee } from '../models/employee';
import { Observable, catchError, filter, map, shareReplay, tap, throwError } from 'rxjs';
import { EmployeeResponse } from '../models/http';

const employeesUrl = 'http://localhost:8000/api/v1/employees';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private _http = inject(HttpClient)

  getEmployees(): Observable<Employee[]>{
    return this._http.get<Employee[]>(employeesUrl);
  }

  addEmployee(newEmployee: Employee): Observable<EmployeeResponse> {
    return this._http.post<EmployeeResponse>(employeesUrl, newEmployee)
      .pipe(
        tap(resp => {
          console.log(resp.message);
        }),
        catchError(err => {
          const message = "Could not add employee";
          console.log(message, err);
          return throwError(err);
        }),
        shareReplay()
      );
  }
}
