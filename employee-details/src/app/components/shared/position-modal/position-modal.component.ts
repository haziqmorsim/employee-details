import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Position } from '../../../models/position';

@Component({
  selector: 'app-position-modal',
  standalone: false,
  templateUrl: './position-modal.component.html',
  styleUrls: ['./position-modal.component.scss']
})
export class PositionModalComponent implements OnInit {
  @Input() position: Position | null = null;
  @Output() formSubmit = new EventEmitter<Position>();
  @Output() cancel = new EventEmitter<void>();

  form: FormGroup;
  modalTitle: string = 'Create New Position';

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      id: ['', Validators.required],
      name: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    if (this.position) {
      this.modalTitle = 'Edit Position';
      this.form.patchValue(this.position);
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