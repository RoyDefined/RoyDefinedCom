import { Component, ElementRef, OnInit, signal, viewChild } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterModule } from '@angular/router';
import { interval, map } from 'rxjs';
import { SocialGithubComponent } from './components/svg/social-github.component';
import { SocialLinkedinComponent } from './components/svg/social-linkedin.component';

type TypeWriterState = 'ReadyForType' | 'Typing' | 'ReadyForDelete' | 'Deleting';

// TODO: Typewriter should get the text from the HTML and write using JS rather than a signal. This way JS is optional.
@Component({
    standalone: true,
    selector: 'app-left',
    templateUrl: './app-left.component.html',
    imports: [CommonModule, RouterModule, NgOptimizedImage, SocialGithubComponent, SocialLinkedinComponent],
})
export class AppLeftComponent implements OnInit {
    public readonly typeWriterText = signal('');
    private _typeWriterState: TypeWriterState = 'ReadyForType';
    private _typeWriterNextChange = Date.now();
    private _typeWriterChunks =
        'Web Designer, Web Developer, Front End Developer, Back End Developer, Apps Designer, Apps Developer, Game designer'.split(', ') || [];
    private _typeWriterCurrentChunk = 0;
    private get currentChunk() {
        return this._typeWriterChunks[this._typeWriterCurrentChunk];
    }

    ngOnInit() {
        this.typeWriter();
    }

    private typeWriter() {
        interval(50)
            .pipe(
                map(() => {
                    switch (this._typeWriterState) {
                        case 'ReadyForType':
                            {
                                if (this._typeWriterNextChange < Date.now()) {
                                    this.setTypeWriterState('Typing');
                                }
                            }
                            break;

                        case 'Typing':
                            {
                                let currentText = this.typeWriterText();
                                const nextChar = this.currentChunk[currentText.length];
                                const nextString = currentText + nextChar;
                                this.typeWriterText.set(nextString);
                                if (nextString.length === this.currentChunk.length) {
                                    this.setTypeWriterState('ReadyForDelete');
                                }
                            }
                            break;

                        case 'ReadyForDelete':
                            {
                                if (this._typeWriterNextChange < Date.now()) {
                                    this.setTypeWriterState('Deleting');
                                }
                            }
                            break;

                        case 'Deleting':
                            {
                                let currentText = this.typeWriterText();
                                currentText = currentText.slice(0, -2);
                                this.typeWriterText.set(currentText);
                                if (currentText.length == 0) {
                                    this._typeWriterCurrentChunk++;
                                    this._typeWriterCurrentChunk %= this._typeWriterChunks.length;

                                    this.setTypeWriterState('ReadyForType');
                                }
                            }

                            break;
                    }
                }),
            )
            .subscribe();
    }

    private setTypeWriterState(state: TypeWriterState) {
        this._typeWriterState = state;
        //console.log('State is now %s', state);

        if (this._typeWriterState === 'ReadyForType') {
            const date = new Date();
            this._typeWriterNextChange = date.setSeconds(date.getSeconds() + 0.2);
        }

        if (this._typeWriterState === 'ReadyForDelete') {
            const date = new Date();
            this._typeWriterNextChange = date.setSeconds(date.getSeconds() + 1);
        }
    }
}
