import { ChangeDetectorRef, Component, OnInit, ɵmarkDirty as markDirty } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'bc-app';

  constructor(private cdr: ChangeDetectorRef){}

  ngOnInit(): void {
    setTimeout(() => {
      this.title = 'Hello Zoneless App';
      markDirty(this);
    }, 1500);
  }
}
