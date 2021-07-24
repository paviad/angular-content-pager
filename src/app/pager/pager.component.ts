import {
  AfterViewChecked,
  Component,
  ElementRef,
  HostListener,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  QueryList,
  SimpleChanges,
  ViewChild,
  ViewChildren
} from '@angular/core';
import { Subject, Subscription, interval } from 'rxjs';
import { debounceTime, sample } from 'rxjs/operators';

@Component({
  selector: 'app-pager',
  templateUrl: './pager.component.html',
  styleUrls: ['./pager.component.css']
})
export class PagerComponent
  implements OnInit, OnDestroy, AfterViewChecked, OnChanges {
  @ViewChild('container') container: ElementRef;
  @ViewChildren('messageParagraph') messageParagraphs: QueryList<ElementRef>;

  @Input() messages: string[] = [];

  displayedMessages: string[] = [];

  start = 0;
  count = -1;
  visible?: number = null;

  resizeSubject = new Subject<void>();
  resize$ = this.resizeSubject.pipe(sample(interval(100)));
  sub: Subscription;

  constructor() {}

  ngOnInit() {
    this.sub = this.resize$.subscribe(r => {
      this.visible = -1;
      this.sliceDisplayedMessages();
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngAfterViewChecked(): void {
    this.countVisible();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.displayedMessages = this.messages;
  }

  onResize([width, height]: [number, number]) {
    this.resizeSubject.next();
  }

  nextPage() {
    if (this.visible === null) {
      return;
    }
    this.start += this.visible;
    if (this.start >= this.messages.length) {
      this.start = 0;
    }
    this.visible = -1;
    this.sliceDisplayedMessages();
  }

  private countVisible() {
    const a = Array.from(this.messageParagraphs);
    const b = a.map(r => r.nativeElement.offsetLeft);

    const minLeft = b[0];

    const nv = b.filter(r => r === minLeft).length;
    if (nv !== this.visible && nv !== 0) {
      setTimeout(() => {
        this.visible = nv;
        this.sliceDisplayedMessages();
      }, 0);
    }
  }

  sliceDisplayedMessages() {
    if (this.visible === -1) {
      this.displayedMessages = this.messages.slice(this.start);
    } else {
      this.displayedMessages = this.messages.slice(
        this.start,
        this.start + this.visible
      );
    }
  }
}
