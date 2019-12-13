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

  ngOnChanges() {
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

  insert(main_string, ins_string, pos) {
    if (typeof(pos) === 'undefined') {
      pos = 0;
    }
    if (typeof(ins_string) === 'undefined') {
      ins_string = '';
    }
    return main_string.slice(0, pos) + ins_string + main_string.slice(pos);
  }

  getAllIndexes(arr, val) {
    const indexes = [];
    let i = -1;
    while ((i = arr.toLowerCase().indexOf(val.toLowerCase(), i + 1)) !== -1) {
      indexes.push(i);
    }
    return indexes;
  }
}
