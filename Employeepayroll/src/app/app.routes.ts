import { Routes } from '@angular/router';
import { EmployeesComponent } from './employee/employee.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { UpdateEmployeeComponent } from './update-employee/update-employee.component';
export const routes: Routes = [
    {
        path : "",
        component : EmployeesComponent
    },
    {
        path: "add",
        component: AddEmployeeComponent
    },
    {
        path: "update/:id",
        component: UpdateEmployeeComponent
    }
];
