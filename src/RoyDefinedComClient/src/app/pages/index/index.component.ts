import { Component } from '@angular/core';

@Component({
    standalone: true,
    selector: 'app-index',
    templateUrl: './index.component.html',
    host: {
        class: 'flex flex-col grow',
    },
})
export class IndexComponent {}
