// highlight.ts
import { Directive, HostListener, Input, ElementRef } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
  standalone: true,
})
export class Highlight {
  @Input() appHighlight = 'yellow';

  constructor(private el: ElementRef) {
    console.log('HighlightDirective applied to element');
  }

  @HostListener('mouseenter')
  onMouseEnter(): void {
    console.log(`Highlight: mouseenter - setting color to ${this.appHighlight}`);
    // Set background color on mouseenter
    this.el.nativeElement.style.backgroundColor = this.appHighlight;
    this.el.nativeElement.style.transition = 'background-color 0.3s ease';
    this.el.nativeElement.style.cursor = 'pointer';
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    console.log('Highlight: mouseleave - removing color');
    // Remove background color on mouseleave
    this.el.nativeElement.style.backgroundColor = 'transparent';
  }
}
