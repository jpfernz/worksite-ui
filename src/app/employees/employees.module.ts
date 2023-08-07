import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeesRoutingModule } from './employees-routing.module';
import { EmployeesComponent } from './employees.component';



@NgModule({
    imports: [
    CommonModule,
    EmployeesRoutingModule,
    EmployeesComponent
]
})
export class EmployeesModule { }
