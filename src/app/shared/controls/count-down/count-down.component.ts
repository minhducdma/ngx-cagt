import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
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
  // ngOnChanges() {
  //   if (this.flagFirstTime) {
  //     this.interval = this.interval * 60;
  //   }

  //   // console.log("change",this.countdown, this.isStart, this.interval, this.rootId)
  //   // this.doCountDown();

  // }
  ngOnChanges(changes: SimpleChanges): void {
    if(!this.flagFirstTime)
      this.doCountDown();
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.

  }
  ngOnInit() {
    if(this.flagFirstTime){
      this.interval = this.interval * 60;
      this.doCountDown();
    }

    this.flagFirstTime = false;


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

  }

  doCountDown() {
    if (this.isStart) {
      this.runAfterSecond();
    }
    else{
      let t = this.interval;
      this.getDefaultTime(t);
    }




    // console.log(this.interval, this.isStart);

  }


  private getTime(): string {
    if (this.interval < 0) {
      this.interval = Math.abs(this.interval);
      this.completed = true;
    }
    let second = this.interval;

    const hours = Math.floor(second / 3600);
    const minutes = Math.floor((second - (hours * 3600)) / 60);
    const seconds = (second - (hours * 3600) - (minutes * 60));
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }
  private getDefaultTime(totalTime): string {

    console.log("vao day");
    const hours = Math.floor(totalTime / 3600);
    const minutes = Math.floor((totalTime - (hours * 3600)) / 60);
    const seconds = (totalTime - (hours * 3600) - (minutes * 60));
    this.countdown = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    return this.countdown;
  }

  private manipulateInterval() {
    if (this.completed) {
      this.onComplete.emit();
    } else {
      this.interval--;
    }
  }
  private stopInterval(){
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
