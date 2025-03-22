import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeServicesService } from '../services/employee-services.service';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-update-employee',
  standalone: true,
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css'],
  imports: [CommonModule, FormsModule]
})
export class UpdateEmployeeComponent implements OnInit {
  
  employeeId!: number;
  employee = {
    name: '',
    gender: '',
    department: '',
    salary: '',
    startDate: '',
    profile_pic: '',
    note: ''
  };

  constructor(
    private route: ActivatedRoute,
    private employeeService: EmployeeServicesService,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.employeeId = Number(this.route.snapshot.paramMap.get('id'));

    this.employeeService.getEmployeeById(this.employeeId).subscribe({
      next: (data) => {
        this.employee = data;
      },
      error: ()=>{
        alert("Error while fetching employee details.");
        this.router.navigateByUrl('/');
      }
    });
}

updateEmployee() {
  this.employeeService.updateEmployee(this.employeeId, this.employee).subscribe({
    next: () => {
      alert("Employee updated successfully!!");
      this.router.navigateByUrl("/");
    },
    error:()=>{
      alert("Something went wrong!");
    }
  });
}
}
