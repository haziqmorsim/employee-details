import { Component, OnInit } from '@angular/core';
import { DepartmentService } from '../../services/department.service';
import { Department } from '../../models/department';

@Component({
  selector: 'app-departments',
  standalone: false,
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.scss']
})
export class DepartmentsComponent implements OnInit {
  departments: Department[] = [];
  searchQuery = '';
  showModal = false;
  editingDepartment: Department | null = null;

  constructor(private deptService: DepartmentService) {}

  ngOnInit(): void {
    this.loadDepartments();
  }

  loadDepartments() {
    this.deptService.getDepartments().subscribe(data => this.departments = data);
  }

  filteredDepartments(): Department[] {
    return this.departments.filter(dept =>
      dept.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  onCreate() {
    this.editingDepartment = null;
    this.showModal = true;
  }

  onEdit(dept: Department) {
    this.editingDepartment = dept;
    this.showModal = true;
  }

  onDelete(id: number) {
    this.deptService.deleteDepartment(id).subscribe(() => this.loadDepartments());
  }

  onFormSubmit(dept: Department) {
    if (this.editingDepartment) {
      this.deptService.updateDepartment(dept).subscribe(() => this.loadDepartments());
    } else {
      this.deptService.addDepartment(dept).subscribe(() => this.loadDepartments());
    }
    this.showModal = false;
  }

  onCancelModal() {
    this.showModal = false;
  }
}