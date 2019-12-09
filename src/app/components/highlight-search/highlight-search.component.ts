import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-highlight-search',
  templateUrl: './highlight-search.component.html',
  styleUrls: ['./highlight-search.component.scss']
})
export class HighlightSearchComponent implements OnInit, OnChanges {
  @Input() text: string;
  @Input() searchText: string;
  public finalText: string;

  constructor() { }

  ngOnInit() {
    this.finalText = this.text;
  }

  ngOnChanges() {
    if (this.searchText.length > 0) {
      // TODO: Look into why when search string length > 1 it shifts position of highlighted text (something to do with first position).
      const indices = this.getAllIndexes(this.text, this.searchText);
      let result = this.text;
      const l = [];
      for (let i = 0; i < indices.length; i++) {
        const spanStartLength = '<span class="highlight">'.length;
        const spanEndLength = '</span>'.length;
        const firstPos = indices[i] + (((spanStartLength + spanEndLength + this.searchText.length) * i) - (i));
        console.log(this.text);
        console.log(firstPos);
        const lastPos = firstPos + this.searchText.length + spanStartLength;
        const firstPass = this.insert(result, '<span class="highlight">', firstPos);
        result = this.insert(firstPass, '</span>', lastPos);
      }
      this.finalText = result;
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
