import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DarkModeMoonComponent } from '../../components/svg/dark-mode-moon.component';
import { DarkModeSunComponent } from '../../components/svg/dark-mode-sun.component';
import { DarkModeSystemComponent } from '../../components/svg/dark-mode-system.component';
import { DarkModeService } from '../../services/dark-mode/darkMode.service';
import { SocialGithubComponent } from '../../components/svg/social-github.component';
import { SocialDiscordComponent } from '../../components/svg/social-discord.component';

@Component({
    standalone: true,
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    imports: [
        CommonModule,
        RouterModule,
        DarkModeSystemComponent,
        DarkModeSunComponent,
        DarkModeMoonComponent,
        SocialGithubComponent,
        SocialDiscordComponent,
        NgOptimizedImage,
    ],
})
export class FooterComponent {
    private readonly _darkModeService = inject(DarkModeService);

    // Disabled for the ZH2 teaser.
    public readonly darkModeButtonEnabled = false;

    public get darkModeType() {
        return this._darkModeService.darkModeType;
    }

    public nextDarkModeType() {
        const currentDarkModeType = this.darkModeType();
        const nextType = currentDarkModeType === 'System' ? 'Light' : currentDarkModeType === 'Light' ? 'Dark' : 'System';
        this._darkModeService.setDarkModeType(nextType);
    }
}
