import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  Signal,
} from '@angular/core';
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
export class GameLayoutComponent implements OnInit {
  public openAIResponse: Signal<string>;

  constructor(private openAIService: OpenAIService) {
    this.openAIResponse = this.openAIService.openAIResponse;
  }

  public ngOnInit(): void {
    this.openAIService.getDataFromOpenAI(
      'Start a game of tic tac toe with me. Positions on the board are numbered 1-9, left to right, top to bottom. I am named User and you are named Computer. I will go first. I pick 2. Only use numbers.'
    );
  }
}
