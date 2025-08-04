import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Position } from "../models/position";

@Injectable({ providedIn: 'root' })
export class PositionService {
  private api = 'http://localhost:3000/positions';

  constructor(private http: HttpClient) {}

  getPositions() { return this.http.get<Position[]>(this.api); }
  addPosition(emp: Position) { return this.http.post<Position>(this.api, emp); }
  updatePosition(emp: Position) { return this.http.put(`${this.api}/${emp.id}`, emp); }
  deletePosition(id: number) { return this.http.delete(`${this.api}/${id}`); }
}