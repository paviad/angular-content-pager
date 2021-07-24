import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { PagerComponent } from './pager/pager.component';
import { ResizeSensorDirective } from './resize-sensor.directive';

@NgModule({
  imports:      [ BrowserModule, FormsModule ],
  declarations: [ AppComponent, HelloComponent, PagerComponent, ResizeSensorDirective ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
