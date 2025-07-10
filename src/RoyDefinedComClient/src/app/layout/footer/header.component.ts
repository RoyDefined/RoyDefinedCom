import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IconAdminComponent } from '../../components/svg/icon-admin.component';
import { RouterModule } from '@angular/router';

@Component({
    standalone: true,
    selector: 'app-header',
    templateUrl: './header.component.html',
    imports: [CommonModule, IconAdminComponent, RouterModule],
})
export class HeaderComponent {}
