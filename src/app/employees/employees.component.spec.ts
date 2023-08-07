import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeesComponent } from './employees.component';
import { EmployeeService } from './employee.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { spyOn } from 'jest-mock';

describe('EmployeesComponent', () => {
  let component: EmployeesComponent;
  let dataService: EmployeeService;
  let fixture: ComponentFixture<EmployeesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [HttpClientTestingModule, EmployeesComponent]
});
    fixture = TestBed.createComponent(EmployeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    dataService = TestBed.inject(EmployeeService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getEmployees on init', () => {
    spyOn(dataService, 'getEmployees');
    component.ngOnInit();
    expect(dataService.getEmployees).toHaveBeenCalled();
  });

});
