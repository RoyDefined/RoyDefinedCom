import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DarkModeService } from '../../services/dark-mode/darkMode.service';
import { DarkModeMoonComponent } from '../../components/svg/dark-mode-moon.component';
import { DarkModeSunComponent } from '../../components/svg/dark-mode-sun.component';
import { DarkModeSystemComponent } from '../../components/svg/dark-mode-system.component';

@Component({
    standalone: true,
    selector: 'app-header',
    templateUrl: './header.component.html',
    imports: [CommonModule, RouterModule, DarkModeSystemComponent, DarkModeSunComponent, DarkModeMoonComponent],
})
export class HeaderComponent {
    private readonly _darkModeService = inject(DarkModeService);

    public get darkModeType() {
        return this._darkModeService.darkModeType;
    }

    public nextDarkModeType() {
        const currentDarkModeType = this.darkModeType();
        const nextType = currentDarkModeType === 'System' ? 'Light' : currentDarkModeType === 'Light' ? 'Dark' : 'System';
        this._darkModeService.setDarkModeType(nextType);
    }
}
