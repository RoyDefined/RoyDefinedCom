import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './layout/footer/footer.component';
import { NgOptimizedImage } from '@angular/common';

@Component({
    standalone: true,
    selector: 'app-root',
    templateUrl: './app.component.html',
    imports: [RouterModule, FooterComponent, NgOptimizedImage],
})
export class AppComponent {}
