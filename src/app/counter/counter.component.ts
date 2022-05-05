import { Component, OnInit } from '@angular/core';
import { interval, Subject, Subscription, takeUntil, takeWhile } from 'rxjs';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css']
})
export class CounterComponent implements OnInit {

  count: number = 0;
  step: number = 2;
  incrementDecrement: boolean = true;
  

  public conintervalTimer = interval(1000);
  public onOff: boolean = false;
  private _unsubscribe$ = new Subject<boolean>();

  constructor() { }

  ngOnInit(): void {       
  }

  start(){
    this.conintervalTimer
    .pipe(
      takeUntil(this._unsubscribe$)
        )
        .subscribe(
          () => this.incrementDecrement ? this.count+=this.step : this.count-=this.step
          ) 
  }

  pause(){
    this._unsubscribe$.next(false);
  }

  reset(){
    this.count = 0;
    this.step = 2;
  }

  countUp(){
    this.incrementDecrement = true;
  }

  countDown(){
    this.incrementDecrement = false;
  }

  onChangeSet(event:any){
    this.count = parseInt(event.target.value);
    console.log(this.count);
  }

  onChangeStep(event:any){
    this.step = parseInt(event.target.value);
    console.log(this.step);
  }

}
