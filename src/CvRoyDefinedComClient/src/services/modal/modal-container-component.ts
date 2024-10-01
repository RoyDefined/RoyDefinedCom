import { Component, ComponentRef, Type, viewChild, ViewContainerRef } from '@angular/core';
import { Modal } from './modal';

@Component({
    standalone: true,
    selector: 'app-modal-container-component',
    template: `
        <div class="fixed bottom-0 left-0 right-0 top-0 backdrop-blur-sm"></div>
        <div
            class="text-default bg-modal fixed left-0 right-0 top-0 z-50 flex h-full max-h-full w-full justify-center overflow-y-auto overflow-x-hidden px-4 pt-[4vh]"
        >
            <div class="relative max-h-full w-full max-w-5xl"><ng-template #modalContainer></ng-template></div>
        </div>
    `,
})
export class ModalContainerComponent {
    public readonly modalContainer = viewChild.required('modalContainer', { read: ViewContainerRef });

    createModal<T extends Modal>(component: Type<T>): ComponentRef<T> {
        this.modalContainer().clear();
        return this.modalContainer().createComponent(component);
    }
}
