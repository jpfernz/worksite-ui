import { TestBed, fakeAsync, flush } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { EmployeeService } from './employees.service';
import { EmployeeResponse } from '../models/http';
import { HttpResponse } from '@angular/common/http';

const employeesUrl = 'http://localhost:8000/api/v1/employees';

const mockEmployees = [
  {
    id: "fbc8d59511b55c9c0f1ddb98",
    firstName: "Braeden",
    lastName: "Mitchell",
    contactNumber: "1-301-377-4820 x88782",
    project: "Little - Okuneva"
  },
  {
    id: "0734a0e5e2b32ddaf34e2e6d",
    firstName: "Beaulah",
    lastName: "Windler-Kihn",
    contactNumber: "(256) 608-8682 x5283",
    project: "Mayert - Dibbert"
  }
]

const newEmployee = {
  id: "0734a0e5e2b32ddaf34e2e6d",
  firstName: "Beaulah",
  lastName: "Windler-Kihn",
  contactNumber: "(256) 608-8682 x5283",
  project: "Mayert - Dibbert"
}

describe('EmployeeService', () => {
  let service: EmployeeService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(EmployeeService);
    httpMock = TestBed.inject(HttpTestingController)
  });

  const successResponse = {
    message: "New employee added"
  }

  it('should display a list of employees', () => {
    expect(service).toBeTruthy();

    service.getEmployees().subscribe((employees) => {
      expect(employees[0].id).toEqual(mockEmployees[0].id);
    });

    const req = httpMock.expectOne(employeesUrl);
    req.flush(mockEmployees);
  });

  it('should send a POST request to add a new employee', fakeAsync(() => {
    service.addEmployee(newEmployee)
      .subscribe((response: EmployeeResponse) => {
        expect(response.message).toBe('New employee added');
      });

    const mockRequest = httpMock.expectOne(employeesUrl);
    expect(mockRequest.request.method).toEqual('POST');

    mockRequest.flush(successResponse);

    flush();
  }));
});
