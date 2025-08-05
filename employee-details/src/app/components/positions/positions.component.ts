import { Component, OnInit } from '@angular/core';
import { PositionService } from '../../services/position.service';
import { Position } from '../../models/position';

@Component({
  selector: 'app-positions',
  standalone: false,
  templateUrl: './positions.component.html',
  styleUrls: ['./positions.component.scss']
})
export class PositionsComponent implements OnInit {
  positions: Position[] = [];
  searchQuery: string = '';
  showModal = false;
  editingPosition: Position | null = null;

  constructor(private positionService: PositionService) {}

  ngOnInit(): void {
    this.loadPositions();
  }

  loadPositions(): void {
    this.positionService.getPositions().subscribe(data => {
      this.positions = data;
    });
  }

  searchPositions(): Position[] {
    return this.positions.filter(pos =>
      pos.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  onCreate() {
    this.editingPosition = null;
    this.showModal = true;
  }

  onEdit(pos: Position) {
    this.editingPosition = pos;
    this.showModal = true;
  }

  onDelete(id: number) {
    this.positionService.deletePosition(id).subscribe(() => this.loadPositions());
  }

  onFormSubmit(pos: Position) {
    if (this.editingPosition) {
      this.positionService.updatePosition(pos).subscribe(() => this.loadPositions());
    } else {
      this.positionService.addPosition(pos).subscribe(() => this.loadPositions());
    }
    this.showModal = false;
  }

  onCancelModal() {
    this.showModal = false;
  }
}