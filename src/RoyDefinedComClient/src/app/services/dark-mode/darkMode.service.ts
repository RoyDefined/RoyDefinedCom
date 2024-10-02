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
    private _darkModeType?: DarkModeType;
    private _clientPreferDarkMode?: boolean;

    /**
     * Returns the client's darkmode type.
     */
    public get darkModeType() {
        // This can't be falsy if it's fetched.
        if (!this._darkModeType) {
            throw new Error('The dark mode type field is not set.');
        }

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

    /**
     * Returns `true` if the client's system prefers dark mode.
     */
    public get clientPreferDarkMode() {
        if (!this._clientPreferDarkMode) {
            throw new Error('Client prefer dark mode field should be set.');
        }

        return this._clientPreferDarkMode;
    }

    /**
     * Returns `true` if dark mode is enabled.
     */
    public get darkModeEnabled() {
        return this.darkModeType === 'Dark' || (this.darkModeType === 'System' && this._clientPreferDarkMode);
    }

    constructor(private readonly _clientSettingsService: ClientSettingsService) {}

    /**
     * Initializes the service.
     */
    public initialize() {
        // On initialization this service will start tracking the user's system settings to see if dark mode is preferred.
        // On change, the application will adjust so this setting is respected.
        const preferColorSchemeDarkMedia = window.matchMedia('(prefers-color-scheme: dark)');
        this._clientPreferDarkMode = preferColorSchemeDarkMedia.matches;
        this._darkModeType = this._clientSettingsService.settings?.darkModeType || 'System';
        this.updateDarkMode();

        preferColorSchemeDarkMedia.addEventListener('change', (event) => {
            console.log('Dark mode service observed change.');
            this._clientPreferDarkMode = event.matches;
            this.updateDarkMode();
        });

        console.log('Dark mode service initialized.');
    }

    // Updates dark mode when system options change preferation or something updated the current darkmode value.
    private updateDarkMode() {
        const darkModeClassAdded = document.documentElement.classList.contains('dark');

        if (darkModeClassAdded && !this.darkModeEnabled) {
            document.documentElement.classList.remove('dark');
            return;
        }

        if (!darkModeClassAdded && this.darkModeEnabled) {
            document.documentElement.classList.add('dark');
            return;
        }
    }
}
