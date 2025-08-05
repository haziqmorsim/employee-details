import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Position } from '../models/position';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PositionService {
  private api = 'http://localhost:3000/positions';

  constructor(private http: HttpClient) {}

  getPositions(): Observable<Position[]> {
    return this.http.get<Position[]>(this.api);
  }

  addPosition(pos: Position): Observable<Position> {
    return this.http.post<Position>(this.api, pos);
  }

  updatePosition(pos: Position): Observable<Position> {
    return this.http.put<Position>(`${this.api}/${pos.id}`, pos);
  }

  deletePosition(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }
}