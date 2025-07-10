import { Component } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../layout/footer/footer.component';
import { HeaderComponent } from '../layout/footer/header.component';

@Component({
    standalone: true,
    templateUrl: './index.component.html',
    imports: [RouterModule, FooterComponent, HeaderComponent, NgOptimizedImage],
})
export class IndexComponent {}
