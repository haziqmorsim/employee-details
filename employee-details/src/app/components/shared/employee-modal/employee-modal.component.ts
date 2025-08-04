import { Component, EventEmitter } from '@angular/core';
import { Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Employee } from '../../../models/employee';

@Component({
  selector: 'app-employee-modal',
  standalone: false,
  templateUrl: './employee-modal.component.html',
  styleUrl: './employee-modal.component.css'
})
export class EmployeeModalComponent {
  @Input() employee: Employee | null = null;
  @Output() formSubmit = new EventEmitter<Employee>();

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      position: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    if (this.employee) {
      this.form.patchValue(this.employee);
    }
  }

  submit() {
    if (this.form.valid) {
      this.formSubmit.emit(this.form.value);
    }
  }
}
