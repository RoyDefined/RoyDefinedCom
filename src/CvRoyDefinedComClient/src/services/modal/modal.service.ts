import { Injectable, Renderer2, ApplicationRef, Type } from '@angular/core';
import { Modal } from './modal';
import { ModalContext } from './modal-context';
import { ModalContainerComponent } from './modal-container-component';

@Injectable()
export class ModalService {
    constructor(
        private readonly _renderer: Renderer2,
        private readonly _appRef: ApplicationRef,
    ) {}

    public openModal<T extends Modal>(component: Type<T>) {
        const containerElement = this._renderer.createElement('div') as HTMLDivElement;
        this._renderer.appendChild(document.body, containerElement);

        const modalContainerRef = this._appRef.bootstrap(ModalContainerComponent, containerElement);
        const modalComponentRef = modalContainerRef.instance.createModal(component);

        const context = new ModalContext(containerElement, modalContainerRef, modalComponentRef);
        modalComponentRef.instance.ɵmodalContext = context;

        return context;
    }
}
