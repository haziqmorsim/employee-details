import { Component, EventEmitter } from '@angular/core';
import { Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Employee } from '../../../models/employee';
import { Position } from '../../../models/position';
import { PositionService } from '../../../services/position.service';
import { DepartmentService } from '../../../services/department.service';
import { Department } from '../../../models/department';

@Component({
  selector: 'app-employee-modal',
  standalone: false,
  templateUrl: './employee-modal.component.html',
  styleUrl: './employee-modal.component.css'
})
export class EmployeeModalComponent {
submitForm() {
throw new Error('Method not implemented.');
}
  @Input() employee: Employee | null = null;
  @Output() formSubmit = new EventEmitter<Employee>();
  @Output() cancel = new EventEmitter<void>();

  form: FormGroup;
  modalTitle: any;

  positions: Position[] = [];
  departments: Department[] = [];

  constructor(private fb: FormBuilder, private positionService: PositionService, private departmentService: DepartmentService) {
    this.form = this.fb.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      position: ['', Validators.required],
      departmentId: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    if (this.employee) {
      this.form.patchValue(this.employee);
    }
    this.positionService.getPositions().subscribe(data => this.positions = data);
    this.departmentService.getDepartments().subscribe(data => this.departments = data);
  }

  submit() {
    if (this.form.valid) {
      this.formSubmit.emit(this.form.value);
    }
  }

   closeModal() {
    this.cancel.emit();
  }
}
