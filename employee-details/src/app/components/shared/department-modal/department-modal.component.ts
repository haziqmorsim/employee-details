import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Department } from '../../../models/department';

@Component({
  selector: 'app-department-modal',
  standalone: false,
  templateUrl: './department-modal.component.html',
  styleUrls: ['./department-modal.component.scss']
})
export class DepartmentModalComponent implements OnInit {
  @Input() department: Department | null = null;
  @Output() formSubmit = new EventEmitter<Department>();
  @Output() cancel = new EventEmitter<void>();

  form: FormGroup;
  modalTitle = 'Create New Department';

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      description: ['']
    });
  }

  ngOnInit(): void {
    if (this.department) {
      this.modalTitle = 'Edit Department';
      this.form.patchValue(this.department);
    }
  }

  submitForm() {
    if (this.form.valid) {
      this.formSubmit.emit(this.form.value);
    }
  }

  closeModal() {
    this.cancel.emit();
  }
}