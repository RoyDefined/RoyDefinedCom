import { APP_INITIALIZER, ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { DarkModeService } from '../services/modal/dark-mode/dark-mode.service';

export const appConfig: ApplicationConfig = {
    providers: [
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideRouter(routes),
        {
            provide: APP_INITIALIZER,
            multi: true,
            deps: [DarkModeService],
            useFactory: (darkModeService: DarkModeService) => () => darkModeService.initialize(),
        },
    ],
};
