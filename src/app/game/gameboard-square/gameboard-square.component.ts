import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostListener,
  Input,
  Output,
  computed,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';

export type SquareValue = '' | 'X' | 'O';

@Component({
  selector: 'ttt-gameboard-square',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gameboard-square.component.html',
  styleUrls: ['./gameboard-square.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameboardSquareComponent {
  _x = signal(0);
  _y = signal(0);
  _value = signal<SquareValue>('');

  _classes = computed(() => {
    return {
      left: this._x() > 0,
      top: this._y() > 0,
      right: this._x() < 2,
      bottom: this._y() < 2,
    };
  });

  @Input({ required: true })
  get x(): number {
    return this._x();
  }

  set x(value: number) {
    this._x.set(value);
  }

  @Input({ required: true })
  get y(): number {
    return this._y();
  }

  set y(value: number) {
    this._y.set(value);
  }

  @Input()
  get value(): SquareValue {
    return this._value();
  }

  set value(squareValue: SquareValue) {
    this._value.set(squareValue);
  }

  @Output()
  clicked = new EventEmitter<[number, number]>();

  @HostListener('click')
  onClick(event: MouseEvent): void {
    if (this._value() === '') {
      this.clicked.emit([this.x, this.y]);
    }
  }
}
