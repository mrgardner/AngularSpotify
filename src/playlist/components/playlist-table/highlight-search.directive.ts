import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[highlightSearch]'
})
export class HighlightDirective {
  @Input() searchText: string;
  @Input() text: string;
  @Input() classToApply: string;

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngOnChanges(): void {
    if (!this.searchText || !this.searchText.length || !this.classToApply) {
      this.renderer.setProperty(this.el.nativeElement, 'innerHTML', this.text);
      return;
    }

    this.renderer.setProperty(
      this.el.nativeElement,
      'innerHTML',
      this.getFormattedText()
    );
  }

  getFormattedText() {
    const indices: number[] = this.getAllIndexes(this.text, this.searchText);
    let result: string = this.text;
    for (let i = 0; i < indices.length; i++) {
      const updatedIndices: number[] = this.getAllIndexes(result, this.searchText);
      const spanEndLength: number = '===='.length;
      const firstPos: number = updatedIndices[i];
      const lastPos: number = firstPos + this.searchText.length + spanEndLength;
      const firstPass: string = this.insert(result, '~~~~', firstPos);
      result = this.insert(firstPass, '====', lastPos);
    }
    const spanStart = new RegExp('~~~~', 'g');
    const spanEnd = new RegExp('====', 'g');
    return result.replace(spanStart, `<span class="${this.classToApply}">`).replace(spanEnd, '</span>');
  }
  // const re = new RegExp(`(${this.searchText})`, 'g');

  // return this.text.replace(re, `<span class="">$1</span>`);

  // ngOnChanges(): void {

  // }

  insert(fullString: string, stringToInsert: string, position: number): string {
    if (typeof (position) === 'undefined') {
      position = 0;
    }
    if (typeof (stringToInsert) === 'undefined') {
      stringToInsert = '';
    }
    return fullString.slice(0, position) + stringToInsert + fullString.slice(position);
  }

  getAllIndexes(text: string, searchText: string): number[] {
    const indexes: number[] = [];
    let i = -1;
    while ((i = text.toLowerCase().indexOf(searchText.toLowerCase(), i + 1)) !== -1) {
      indexes.push(i);
    }
    return indexes;
  }
}