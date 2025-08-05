import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Department } from '../models/department';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DepartmentService {
  private api = 'http://localhost:3000/departments';

  constructor(private http: HttpClient) {}

  getDepartments(): Observable<Department[]> {
    return this.http.get<Department[]>(this.api);
  }

  addDepartment(dept: Department): Observable<Department> {
    return this.http.post<Department>(this.api, dept);
  }

  updateDepartment(dept: Department): Observable<Department> {
    return this.http.put<Department>(`${this.api}/${dept.id}`, dept);
  }

  deleteDepartment(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }
}