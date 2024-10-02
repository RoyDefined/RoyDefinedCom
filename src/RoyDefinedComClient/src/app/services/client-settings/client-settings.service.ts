import { Injectable } from '@angular/core';
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

    private _settings?: ClientSettings;

    /**
     * Returns the client settings.
     */
    public get settings(): ClientSettings {
        // Function will return an empty object should fetch/parsing fail.
        // The client will have to redo the settings.

        if (this._settings) {
            return this._settings;
        }

        const settingsJson = localStorage.getItem(this._localStorageKey);
        if (!settingsJson) {
            return {};
        }

        // Parse result
        const parseResult = clientSettingsSchema.safeParse(JSON.parse(settingsJson));
        if (!parseResult.success) {
            return {};
        }

        this._settings = parseResult.data;
        return this._settings;
    }

    /**
     * Stores the given settings.
     */
    public set settings(value: ClientSettings) {
        this._settings = value;
        localStorage.setItem(this._localStorageKey, JSON.stringify(value));
    }
}
