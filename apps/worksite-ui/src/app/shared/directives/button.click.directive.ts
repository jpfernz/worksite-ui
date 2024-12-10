import {
  Directive,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';

@Directive({
  selector: '[appButtonClick]',
  standalone: true,
})
export class ButtonClickDirective {
  // @Input() someValue = '';
  @Output() buttonClicked = new EventEmitter<void>();

  @HostListener('click', ['$event'])
  onClick(event: MouseEvent): void {
    this.buttonClicked.emit();
    console.log(`Host element sent `);
  }
}
