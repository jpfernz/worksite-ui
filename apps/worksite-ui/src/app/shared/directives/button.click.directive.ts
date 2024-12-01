import { Directive, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appButtonClick]',
  standalone: true,
})
export class ButtonClickDirective {
  @Input() someValue = '';

  @HostListener('click', ['$event'])
  onClick(event: MouseEvent): void {
    console.log(`Host element sent ${this.someValue}`);
  }
}
