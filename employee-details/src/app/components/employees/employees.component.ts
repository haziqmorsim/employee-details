import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee';
// import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-employees',
  standalone: false,
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.css'
})
export class EmployeesComponent {
   employees: Employee[] = [];
  filteredEmployees: Employee[] = [];
  searchQuery: string = '';

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.employeeService.getEmployees().subscribe(data => {
      this.employees = data;
      this.filteredEmployees = data;
    });
  }

  searchEmployees(): void {
    this.filteredEmployees = this.employees.filter(emp =>
      emp.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  onCreate() {
    const name = prompt('Enter employee name') ?? '';
    const position = prompt('Enter position') ?? '';
    const id = Date.now(); // example

    const newEmployee: Employee = { id, name, position };

    this.employeeService.addEmployee(newEmployee).subscribe(() => {
      this.loadEmployees();
    });
  }

  onEdit(employee: Employee) {
    // Open modal to edit employee
  }

  onDelete(id: number) {
    this.employeeService.deleteEmployee(id).subscribe(() => {
      this.loadEmployees();
      alert('Employee deleted');
    });
  }
}