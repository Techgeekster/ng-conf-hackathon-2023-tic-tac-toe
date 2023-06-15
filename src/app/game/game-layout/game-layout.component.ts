import { ChangeDetectionStrategy, Component, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OpenAIService } from 'src/app/open-ai-service/open-ai.service';

@Component({
  selector: 'ttt-game-layout',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game-layout.component.html',
  styleUrls: ['./game-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameLayoutComponent {
  public openAIResponse: Signal<string>;
  public userInitialInput = 5;
  private triggerText = `Start a game of tic tac toe with me. Positions on the board are numbered 1-9, left to right, top to bottom. I am named User and you are named Computer. I will go first. I pick ${this.userInitialInput}. Only use numbers.`;

  constructor(private openAIService: OpenAIService) {
    this.openAIResponse = this.openAIService.openAIResponse;
  }

  public setEntry(entry: number): void {
    if (!this.userInitialInput) {
      this.userInitialInput = entry;
      this.openAIService.getDataFromOpenAI(this.triggerText);
    } else {
      this.openAIService.getDataFromOpenAI(
        `User move is ${entry}. What is your next move? Only use numbers.`
      );
    }
  }
}
