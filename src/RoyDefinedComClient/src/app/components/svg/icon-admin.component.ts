import { Component } from '@angular/core';

@Component({
    standalone: true,
    selector: 'svg-icon-admin',
    template: `
        <svg viewBox="0 0 24 24" fill="none" class="h-6 w-6" xmlns="http://www.w3.org/2000/svg">
            <path
                stroke="currentColor"
                d="M12 14v8H4a8 8 0 0 1 8-8zm0-1c-3.315 0-6-2.685-6-6s2.685-6 6-6 6 2.685 6 6-2.685 6-6 6zm9 4h1v5h-8v-5h1v-1a3 3 0 0 1 6 0v1zm-2 0v-1a1 1 0 0 0-2 0v1h2z"
            />
        </svg>
    `,
})
export class IconAdminComponent {}
