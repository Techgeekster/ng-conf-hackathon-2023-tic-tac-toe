import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameboardSquareComponent } from '../gameboard-square/gameboard-square.component';

@Component({
  selector: 'ttt-gameboard',
  standalone: true,
  imports: [CommonModule, GameboardSquareComponent],
  templateUrl: './gameboard.component.html',
  styleUrls: ['./gameboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameboardComponent {
  readonly coords = Array(9)
    .fill(0)
    .map((_value, index) => {
      return [index % 3, Math.floor(index / 3)];
    });

  currentTurn = signal<'X' | 'Y'>('X');

  onSquareClick(squareCoords: [number, number]): void {}
}
