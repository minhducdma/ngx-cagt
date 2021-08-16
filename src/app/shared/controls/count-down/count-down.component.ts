import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { timer } from 'rxjs';

@Component({
    selector: 'ngx-count-down',
    templateUrl: './count-down.component.html',
    styleUrls: ['./count-down.component.scss']
})
export class CountDownComponent implements OnInit {
    @Input() interval: number;
    @Output() onComplete = new EventEmitter();

    public countdown: string;

    private completed: boolean;

    constructor() { }

    ngOnInit() {
        this.interval = this.interval * 60;
        this.countdown = this.getTime();
        const countdownObservable = timer(1000, 1000).subscribe(val => {
            this.manipulateInterval();
            this.countdown = this.getTime();
            if (this.interval === 0) {
                this.countdownCompleted();
            }
        });
    }

    private getTime(): string {
        if (this.interval < 0) {
            this.interval = Math.abs(this.interval);
            this.completed = true;
        }
        const hours = Math.floor(this.interval / 3600);
        const minutes = Math.floor((this.interval - (hours * 3600)) / 60);
        const seconds = (this.interval - (hours * 3600) - (minutes * 60));
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    private manipulateInterval() {
        if (this.completed) {
            this.onComplete.emit();
        } else {
            this.interval--;
        }
    }

    countdownCompleted() {
        this.completed = true;
        this.onComplete.emit();
    }

}
