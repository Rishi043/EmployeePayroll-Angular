import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { DatePipe, NgIf, NgFor } from '@angular/common';

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [NgIf, NgFor], // Ensure CommonModule features are available
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css',
  providers: [DatePipe]
})
export class EmployeesComponent {
  employeeInfo: any[] = [];
  noImageUrl = "../assets/299106_profile_icon.png";

  private http = inject(HttpClient);
  private router = inject(Router);

  constructor() {
    this.getInformation();
  }

  getInformation() {
    this.http.get("http://localhost:8080/employees").subscribe({
      next: (result: any) => this.employeeInfo = result,
      error: (err) => console.error("Error fetching employee data:", err)
    });
  }

  navigateToAddEmployee() {
    this.router.navigateByUrl('/add');
  }

  updateEmployee(id: number) {
    this.router.navigate(['/update', id]);
  }

  deleteEmployee(id: number) {
    if (confirm("Are you sure you want to delete?")) {
      this.http.delete(`http://localhost:8080/employees/${id}`).subscribe({
        complete: () => {
          alert('Employee deleted successfully');
          this.getInformation(); // Fetch updated employee list
        },
        error: (error) => {
          console.error('Error deleting employee from server', error);
        },
      });
    }
  }
}
