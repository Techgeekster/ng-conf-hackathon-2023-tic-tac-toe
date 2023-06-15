import {
  ChangeDetectionStrategy,
  Component,
  computed,
  Signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { OpenAIService } from 'src/app/open-ai-service/open-ai.service';
import { GameboardComponent } from '../gameboard/gameboard.component';

@Component({
  selector: 'ttt-game-layout',
  standalone: true,
  imports: [CommonModule, GameboardComponent],
  templateUrl: './game-layout.component.html',
  styleUrls: ['./game-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameLayoutComponent {
  public openAIResponse: Signal<string>;
  public computerResponse = computed(() => +this.openAIResponse());

  public userInitialInput = 5;
  private triggerText = `Pick a number between 1 and 9. Only use numbers.`;
  private takenPositions: number[] = [];

  constructor(private openAIService: OpenAIService) {
    this.openAIResponse = this.openAIService.openAIResponse;
  }

  public setEntry(userEntry: number): void {
    if (!this.userInitialInput) {
      this.userInitialInput = userEntry;
      this.openAIService.getDataFromOpenAI(this.triggerText);
    } else {
      this.openAIService.getDataFromOpenAI(
        `Pick a number between 1 and 9 except for ${this.takenPositions.join(
          ', '
        )}. Only use numbers.`
      );
    }

    this.takenPositions.push(userEntry);
  }
}
