import { Injectable, signal } from '@angular/core';
import { ClientSettingsService } from '../client-settings/client-settings.service';
import { DarkModeType } from './darkModeType';

/**
 * A server to handle setting dark mode on the app.
 * Tailwind has dark mode integration and this server ensures the client's preferred dark mode type is handled.
 */
@Injectable({
    providedIn: 'root',
})
export class DarkModeService {
    private readonly _darkModeType = signal<DarkModeType>('System');
    private _preferColorSchemeDark = false;

    // Forces a specific dark mode type by default.
    // The dark mode button should probably be disabled if a specific type is set.
    private _forceDarkModeType: DarkModeType | null = 'Dark';

    /**
     * Returns the client's darkmode type.
     */
    public get darkModeType() {
        return this._darkModeType;
    }

    constructor(private readonly _clientSettingsService: ClientSettingsService) {}

    /**
     * Initializes the service.
     */
    public initialize() {
        // Specific for the ZH2 teaser, the site is dark by default.

        if (!this._forceDarkModeType) {
            const darkModeType = this._clientSettingsService.settings().darkModeType;
            if (darkModeType) {
                this._darkModeType.set(darkModeType);
            }
        } else {
            this._darkModeType.set(this._forceDarkModeType);
        }

        this.initializeDarkModeListener();
        this.updateDarkMode();
    }

    /**
     * Sets the client's darkmode type and updates settings.
     */
    public setDarkModeType(value: DarkModeType) {
        this._darkModeType.set(value);
        this._clientSettingsService.settings = {
            ...this._clientSettingsService.settings,
            darkModeType: value,
        };
        this.updateDarkMode();
    }

    private initializeDarkModeListener() {
        const preferColorSchemeDarkMedia = window.matchMedia('(prefers-color-scheme: dark)');
        this._preferColorSchemeDark = preferColorSchemeDarkMedia.matches;

        preferColorSchemeDarkMedia.addEventListener('change', (event) => {
            this._preferColorSchemeDark = event.matches;
            this.updateDarkMode();
        });
    }

    // Updates dark mode when system options change preferation or something updated the current darkmode value.
    private updateDarkMode() {
        const darkModeClassAdded = document.documentElement.classList.contains('dark');

        const currentDarkModeType = this._darkModeType();
        const darkModeEnabled = currentDarkModeType === 'Dark' || (currentDarkModeType === 'System' && this._preferColorSchemeDark);

        if (darkModeClassAdded && !darkModeEnabled) {
            document.documentElement.classList.remove('dark');
            return;
        }

        if (!darkModeClassAdded && darkModeEnabled) {
            document.documentElement.classList.add('dark');
            return;
        }
    }
}
