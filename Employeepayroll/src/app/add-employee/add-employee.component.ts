import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeServicesService } from '../services/employee-services.service';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-employee',
  standalone: true,
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css'],
  imports: [FormsModule] // Required for ngModel
})
export class AddEmployeeComponent {

  employee = {
    name: '',
    gender: '',
    department: '',
    salary: '',
    startDate: '',
    profile_pic:'',
    note:''
  };

  constructor(
    private employeeService: EmployeeServicesService,
    private router: Router,
    private http: HttpClient
  ) {}

  addEmployee() {
    console.log("adding Employee------",this.employee);
    this.http.post("http://localhost:8080/employees",this.employee).subscribe({complete:() => {this.router.navigateByUrl('/') }, error:() =>{alert("Something went wrong!!")}})
  }
}
