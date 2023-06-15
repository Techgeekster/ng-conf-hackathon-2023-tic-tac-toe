import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  GameboardSquareComponent,
  SquareValue,
} from '../gameboard-square/gameboard-square.component';

interface SquareData {
  x: number;
  y: number;
  value: SquareValue;
}

@Component({
  selector: 'ttt-gameboard',
  standalone: true,
  imports: [CommonModule, GameboardSquareComponent],
  templateUrl: './gameboard.component.html',
  styleUrls: ['./gameboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameboardComponent {
  squares = signal<SquareData[]>(this.defaultValue());

  currentTurn = signal<'X' | 'Y'>('X');

  @Input()
  set computerResponse(value: number) {
    // this.squares.update(currentValue => )
    this.computerResponded.emit(value);
  }

  @Output()
  squareClicked = new EventEmitter<number>();

  @Output()
  computerResponded = new EventEmitter<number>();

  onSquareClick(squareCoords: [number, number]): void {
    const index = squareCoords[1] * 3 + squareCoords[0];
    this.squareClicked.emit(+1);

    // this.squares.update((currentValue) => currentValue.map());
  }

  defaultValue(): SquareData[] {
    return Array(9)
      .fill('')
      .map((value, index) => ({
        x: index % 3,
        y: Math.floor(index / 3),
        value,
      }));
  }
}
