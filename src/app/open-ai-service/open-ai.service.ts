import { Injectable, signal } from '@angular/core';
import { Configuration, OpenAIApi } from 'openai';
import { environment } from 'src/environment/environment';
import { filter, from, map, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OpenAIService {
  private _openAIResponse = signal('');
  public openAIResponse = this._openAIResponse.asReadonly();

  public takenResponses = signal<number[]>([]);

  readonly configuration = new Configuration({
    apiKey: environment.OPEN_API_KEY,
  });
  readonly openai: OpenAIApi = new OpenAIApi(this.configuration);

  getDataFromOpenAI(text: string): void {
    from(
      this.openai.createCompletion({
        model: 'text-davinci-003',
        prompt: text,
        max_tokens: 256,
      })
    )
      .pipe(
        take(1),
        filter((response) => !!response && !!response.data),
        map((response) => response.data),
        filter(
          (data: any) =>
            data.choices && data.choices.length > 0 && data.choices[0].text
        ),
        map((data) => data.choices[0].text)
      )
      .subscribe((data) => {
        this._openAIResponse.set(data);
        this.takenResponses.set([...this.takenResponses(), +data]);
      });
  }
}
