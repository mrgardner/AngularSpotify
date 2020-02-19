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

  constructor() {}

  ngOnChanges(): void {
    if (this.searchText.length > 0) {
      const indices = this.getAllIndexes(this.text, this.searchText);
      let result = this.text;
      for (let i = 0; i < indices.length; i++) {
        const updatedIndices = this.getAllIndexes(result, this.searchText);
        const spanEndLength = '===='.length;
        const firstPos = updatedIndices[i];
        const lastPos = firstPos + this.searchText.length + spanEndLength;
        const firstPass = this.insert(result, '~~~~', firstPos);
        result = this.insert(firstPass, '====', lastPos);
      }
      const spanStart = new RegExp('~~~~', 'g');
      const spanEnd = new RegExp('====', 'g');
      this.finalText = result.replace(spanStart, '<span class="highlight">').replace(spanEnd, '</span>');
    } else {
      this.finalText = this.text;
    }
  }

  insert(fullString: string, stringToInsert: string, position: number): string {
    if (typeof(position) === 'undefined') {
      position = 0;
    }
    if (typeof(stringToInsert) === 'undefined') {
      stringToInsert = '';
    }
    return fullString.slice(0, position) + stringToInsert + fullString.slice(position);
  }

  getAllIndexes(text: string, searchText: string): Array<number> {
    const indexes = [];
    let i = -1;
    while ((i = text.toLowerCase().indexOf(searchText.toLowerCase(), i + 1)) !== -1) {
      indexes.push(i);
    }
    return indexes;
  }
}
