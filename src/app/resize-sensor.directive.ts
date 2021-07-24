import {
  AfterViewInit,
  Directive,
  ElementRef,
  EventEmitter,
  NgZone,
  OnDestroy,
  Output
} from '@angular/core';

@Directive({
  selector: '[resizeSensor]'
})
export class ResizeSensorDirective implements AfterViewInit, OnDestroy {
  @Output() resizeSensor = new EventEmitter<[number, number]>();

  private resize_ob: ResizeObserver;

  constructor(private el: ElementRef, private ngZone: NgZone) {}

  ngAfterViewInit(): void {
    this.resize_ob = new ResizeObserver(entries => {
      // since we are observing only a single element, so we access the first element in entries array
      let rect = entries[0].contentRect;

      // current width & height
      let width = rect.width;
      let height = rect.height;

      this.ngZone.run(() => this.resizeSensor.emit([width, height]));
    });

    // start observing for resize
    this.resize_ob.observe(this.el.nativeElement);
  }

  ngOnDestroy(): void {
    this.resize_ob.unobserve(this.el.nativeElement);
  }
}
