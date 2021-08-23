import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { timer } from 'rxjs';

@Component({
  selector: 'ngx-count-down',
  templateUrl: './count-down.component.html',
  styleUrls: ['./count-down.component.scss']
})
export class CountDownComponent implements OnInit {
  @Input() interval: number;
  @Input() rootId: number;

  @Input() isStart: boolean;
  @Output() onComplete = new EventEmitter();

  public countdown: string;

  private completed: boolean;
  private flagFirstTime: boolean = true;

  constructor() { }
  ngOnChanges() {
    if (!this.flagFirstTime) {
      this.doCountDown();
      // this.stopCountDown();
    }

    // console.log("change",this.countdown, this.isStart, this.interval, this.rootId)
    // this.doCountDown();

  }
  ngOnInit() {

    if(this.flagFirstTime){
      this.doCountDown();
      // this.stopCountDown();
      this.flagFirstTime = false;
    }
    else{

    }

    // console.log("init",this.countdown, this.isStart, this.interval, this.rootId)

  }
  runAfterSecond(){
    if (this.isStart) {
      const countdownObservable = timer(1000, 1000).subscribe(val => {
        this.manipulateInterval();
        this.countdown = this.getTime();
        if (this.interval === 0) {
          this.countdownCompleted();
        }
      });
    }
    else{
      this.getDefaultTime();
    }
  }

  doCountDown() {

    if (this.flagFirstTime) {
      this.interval = this.interval * 60;

    }
    else {
      this.interval = this.interval;

    }
    this.runAfterSecond();

    // console.log(this.interval, this.isStart);

  }


  private getTime(): string {
    if (this.isStart) {
      if (this.interval < 0) {
        this.interval = Math.abs(this.interval);
        this.completed = true;
      }
      const hours = Math.floor(this.interval / 3600);
      const minutes = Math.floor((this.interval - (hours * 3600)) / 60);
      const seconds = (this.interval - (hours * 3600) - (minutes * 60));
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
  }
  private getDefaultTime(): string {
    if(!this.isStart){
      // console.log(this.countdown);
      if (typeof (this.countdown) === 'undefined') {
        if (this.interval < 0) {
          this.interval = Math.abs(this.interval);
          this.completed = true;
        }
        const hours = Math.floor(this.interval / 3600);
        const minutes = Math.floor((this.interval - (hours * 3600)) / 60);
        const seconds = (this.interval - (hours * 3600) - (minutes * 60));
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
      } else {
        return this.countdown;
      }
    }


  }

  private manipulateInterval() {
    if (this.completed) {
      this.onComplete.emit();
    } else {
      this.interval--;
    }
  }
  private stopIntarval(){
    if (this.completed) {
      this.onComplete.emit();
    } else {
      // this.interval--;
    }
  }

  countdownCompleted() {
    this.completed = true;
    this.onComplete.emit();
  }

}
