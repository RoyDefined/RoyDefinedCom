import { APP_INITIALIZER, ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { DarkModeService } from './services/dark-mode/darkMode.service';

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(routes),

        // Setup for the dark mode service
        {
            provide: APP_INITIALIZER,
            multi: true,
            deps: [DarkModeService],
            useFactory: (darkModeService: DarkModeService) => () => darkModeService.initialize(),
        },
    ],
};
