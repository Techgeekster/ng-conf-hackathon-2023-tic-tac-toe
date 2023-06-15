import { Route } from '@angular/router';
import { GameLayoutComponent } from './game/game-layout/game-layout.component';

export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'game',
  },
  {
    path: 'game',
    component: GameLayoutComponent,
  },
];
