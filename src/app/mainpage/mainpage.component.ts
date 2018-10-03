import {Component, ElementRef, HostListener, OnInit} from '@angular/core';
import {trigger, state, style, transition, animate, keyframes, AnimationBuilder, stagger, query} from '@angular/animations';

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.scss'],
  animations: [
    trigger('heroAnimation', [
      state('in', style({
        opacity: 1,
        transform: 'translateY(0)'
      })),
      transition('void => *', [
        animate(400, keyframes([
          style({
            opacity: 0,
            transform: 'translateY(150px)',
            offset: 0.1
          }),
          style({
            opacity: 1,
            transform: 'translateY(0px)',
            offset: 1
          })
        ]))
      ])
    ])
  ]
})
export class MainpageComponent implements OnInit {
  bindingVar = '';

  @HostListener('scroll', ['$event']) private onScroll($event: Event): void {
    console.log($event.srcElement.scrollLeft, $event.srcElement.scrollTop);
  }

  constructor(private _builder: AnimationBuilder, private _element: ElementRef) {}

  private _buildAnimation() {
    return this._builder.build([
      query('.photo-record', [
        style({ opacity: 0, transform: 'translateY(-50px)' }),
        stagger(100, [
          animate('500ms', style({ opacity: 1, transform: 'none' }))
        ])
      ])
    ]);
  }

  private _buildPlayer() {
    const animation = this._buildAnimation();
    animation.create(this._element.nativeElement).play();
  }

  fadeIn() {
    this.bindingVar = 'fadeIn';
  }

  fadeOut() {
    this.bindingVar = 'fadeOut';
  }

  toggle() {
    this.bindingVar === 'fadeIn' ? this.fadeOut() : this.fadeIn();
  }

  ngOnInit() {
    this.toggle();
  }

}
