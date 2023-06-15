import { Injectable } from '@angular/core';
import { Configuration, OpenAIApi } from 'openai';
import { environment } from 'src/environment/environment';
import { filter, from, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OpenAIService {
  constructor() {
    /**/
  }

  readonly configuration = new Configuration({
    apiKey: environment.openAIToken,
  });
  readonly openai = new OpenAIApi(this.configuration);

  async getDataFromOpenAI(text: string) {
    from(
      this.openai.createCompletion({
        model: 'text-davinci-003',
        prompt: text,
        max_tokens: 256,
      })
    )
      .pipe(
        filter((response) => !!response && !!response.data),
        map((response) => response.data),
        filter(
          (data: any) =>
            data.choices && data.choices.length > 0 && data.choices[0].text
        ),
        map((data) => data.choices[0].text)
      )
      .subscribe((data) => {
        console.log(data);
      });
  }
}
