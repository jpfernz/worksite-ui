import {faker} from '@faker-js/faker';
import {Employee} from '../../models/employee';

export const createFakeEmployee = (data?: Partial<Employee>): Employee => {
  return Object.assign({
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    contactNumber: faker.phone.number(),
    project: faker.company.name()
  }, data)
};

export const createFakeEmployees = (count: number): Employee[] => {
  return Array.from({length: count}, () => createFakeEmployee());
}
