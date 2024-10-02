import { Injectable, Signal, signal } from '@angular/core';
import { ClientSettings, clientSettingsSchema } from './client-settings';

/**
 * A service to handle client settings.
 * Actions are communicated with localstorage.
 */
@Injectable({
    providedIn: 'root',
})
export class ClientSettingsService {
    private readonly _localStorageKey = 'RoyDefined.Settings';

    private readonly _settings = signal<ClientSettings>({});
    private initialized = false;

    /**
     * Returns the client settings.
     */
    public get settings(): Signal<ClientSettings> {
        // Function will return an empty object should fetch/parsing fail.
        // The client will have to redo the settings.

        if (this.initialized) {
            return this._settings;
        }
        this.initialized = true;

        const settingsJson = localStorage.getItem(this._localStorageKey);
        if (!settingsJson) {
            return this._settings;
        }

        // Parse result
        const parseResult = clientSettingsSchema.safeParse(JSON.parse(settingsJson));
        if (!parseResult.success) {
            return this._settings;
        }

        this._settings.set(parseResult.data);
        return this._settings;
    }

    /**
     * Stores the given settings.
     */
    public set settings(value: ClientSettings) {
        this._settings.set(value);
        localStorage.setItem(this._localStorageKey, JSON.stringify(value));
    }
}
