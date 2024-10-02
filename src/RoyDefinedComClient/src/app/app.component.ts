import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './layout/footer/footer.component';
import { HeaderComponent } from './layout/header/header.component';
import { NgOptimizedImage } from '@angular/common';

@Component({
    standalone: true,
    selector: 'app-root',
    templateUrl: './app.component.html',
    imports: [RouterModule, HeaderComponent, FooterComponent, NgOptimizedImage],
})
export class AppComponent {}
