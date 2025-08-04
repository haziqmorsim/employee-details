import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Employee } from "../models/employee";

@Injectable({ providedIn: 'root' })
export class EmployeeService {
  private api = 'http://localhost:3000/employees';

  constructor(private http: HttpClient) {}

  getEmployees() { return this.http.get<Employee[]>(this.api); }
  addEmployee(emp: Employee) { return this.http.post<Employee>(this.api, emp); }
  updateEmployee(emp: Employee) { return this.http.put(`${this.api}/${emp.id}`, emp); }
  deleteEmployee(id: number) { return this.http.delete(`${this.api}/${id}`); }
}