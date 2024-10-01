import { ComponentRef } from '@angular/core';
import { Subject } from 'rxjs';
import { Modal } from './modal';
import { ModalContainerComponent } from './modal-container-component';

export class ModalContext {
    public readonly result$ = new Subject<unknown | undefined>();
    public get modalComponent() {
        return this._modal.instance;
    }

    constructor(
        private readonly _modalContainerElement: HTMLDivElement,
        private readonly _modalContainer: ComponentRef<ModalContainerComponent>,
        private readonly _modal: ComponentRef<Modal>,
    ) {}

    public closeModal(output?: unknown) {
        this._modalContainerElement.remove();
        this._modalContainer.destroy();
        this._modal.destroy();

        this.result$.next(output);
        this.result$.complete();
    }
}
