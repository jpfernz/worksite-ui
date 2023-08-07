import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { EmployeeService } from './employee.service';

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
describe('EmployeeService', () => {
  let service: EmployeeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(EmployeeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
    const httpMock = TestBed.inject(HttpTestingController);

    service.getEmployees().subscribe((employees) => {
      expect(employees[0].id).toEqual(mockEmployees[0].id);
    });

    const req = httpMock.expectOne(employeesUrl);
    req.flush(mockEmployees);

  });
});
