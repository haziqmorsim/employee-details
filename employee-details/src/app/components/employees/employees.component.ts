import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee';
// import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DepartmentService } from '../../services/department.service';
import { Department } from '../../models/department';

@Component({
  selector: 'app-employees',
  standalone: false,
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.css'
})
export class EmployeesComponent {
  employees: Employee[] = [];
  filteredEmployees: Employee[] = [];
  departments: Department[] = [];
  searchQuery: string = '';

  constructor(private employeeService: EmployeeService, private deptService: DepartmentService) {}

  ngOnInit(): void {
    this.loadEmployees();
    this.deptService.getDepartments().subscribe(data => this.departments = data);
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

  getDepartmentName(departmentId: number): string {
    return this.departments.find(d => d.id === departmentId)?.name || 'Unknown';
  }

  showModal = false;
  editingEmployee: Employee | null = null;

  onCreate() {
    this.editingEmployee = null;
    this.showModal = true;
  }

  onEdit(employee: Employee) {
    this.editingEmployee = employee;
    this.showModal = true;
  }

  onFormSubmit(emp: Employee) {
    if (this.editingEmployee) {
      // Edit mode
      this.employeeService.updateEmployee(emp).subscribe(() => this.loadEmployees());
    } else {
      // Create mode
      this.employeeService.addEmployee(emp).subscribe(() => this.loadEmployees());
    }

    this.showModal = false;
  }

  onCancelModal() {
    this.showModal = false;
  }

  onDelete(id: number) {
    this.employeeService.deleteEmployee(id).subscribe(() => {
      this.loadEmployees();
      alert('Employee deleted');
    });
  }
}