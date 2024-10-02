import { Injectable } from '@angular/core';
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
    private _darkModeType: DarkModeType = 'System';
    private _clientPreferDarkMode = false;

    /**
     * Returns the client's darkmode type.
     */
    public get darkModeType() {
        return this._darkModeType;
    }

    /**
     * Sets the client's darkmode type and updates settings.
     */
    public set darkModeType(value: DarkModeType) {
        this._darkModeType = value;
        this._clientSettingsService.settings = {
            ...this._clientSettingsService.settings,
            darkModeType: value,
        };
        this.updateDarkMode();
    }

    constructor(private readonly _clientSettingsService: ClientSettingsService) {}

    /**
     * Initializes the service.
     */
    public initialize() {
        const darkModeType = this._clientSettingsService.settings?.darkModeType;
        if (darkModeType) {
            this._darkModeType = darkModeType;
        }

        this.initializeDarkModeListener();
        this.updateDarkMode();
    }

    private initializeDarkModeListener() {
        const preferColorSchemeDarkMedia = window.matchMedia('(prefers-color-scheme: dark)');
        this._clientPreferDarkMode = preferColorSchemeDarkMedia.matches;

        preferColorSchemeDarkMedia.addEventListener('change', (event) => {
            this._clientPreferDarkMode = event.matches;
            this.updateDarkMode();
        });
    }

    // Updates dark mode when system options change preferation or something updated the current darkmode value.
    private updateDarkMode() {
        const darkModeClassAdded = document.documentElement.classList.contains('dark');
        const darkModeEnabled = this.darkModeType === 'Dark' || (this.darkModeType === 'System' && this._clientPreferDarkMode);

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
