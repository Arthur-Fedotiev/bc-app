import { ChangeDetectorRef, Component, OnInit, ɵmarkDirty as markDirty } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public title!: string;;

  constructor(private cdr: ChangeDetectorRef){}

  ngOnInit(): void {
    this.title = 'Hello Zoneless App';
    markDirty(this);
  }
}
