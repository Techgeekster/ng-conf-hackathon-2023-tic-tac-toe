import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  computed,
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

  // gameOver = computed(() => )

  @Input()
  set computerResponse(value: number) {
    this.squares.update((currentValue) =>
      currentValue.map((square, index) => {
        if (index === value - 1) {
          return {
            ...square,
            value: 'O',
          };
        }

        return square;
      })
    );

    this.computerResponded.emit(value);
  }

  @Output()
  squareClicked = new EventEmitter<number>();

  @Output()
  computerResponded = new EventEmitter<number>();

  onSquareClick(squareCoords: [number, number]): void {
    const currentIndex = squareCoords[1] * 3 + squareCoords[0];
    this.squareClicked.emit(currentIndex + 1);

    this.squares.update((currentValue) =>
      currentValue.map((square, index) => {
        if (index === currentIndex) {
          return {
            ...square,
            value: 'X',
          };
        }

        return square;
      })
    );
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
