// Common
import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-highlight-search',
  templateUrl: './highlight-search.component.html',
  styleUrls: ['./highlight-search.component.scss']
})
export class HighlightSearchComponent implements OnChanges {
  @Input() text: string;
  @Input() searchText: string;
  public finalText: string;

  constructor() { }

  ngOnChanges(): void {
    if (this.searchText.length > 0) {
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
      const spanStart: RegExp = new RegExp('~~~~', 'g');
      const spanEnd: RegExp = new RegExp('====', 'g');
      this.finalText = result.replace(spanStart, '<span class="highlight">').replace(spanEnd, '</span>');
    } else {
      this.finalText = this.text;
    }
  }

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
