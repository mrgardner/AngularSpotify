import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-highlight-search',
  templateUrl: './highlight-search.component.html',
  styleUrls: ['./highlight-search.component.scss'],
  providers: [TitleCasePipe]
})
export class HighlightSearchComponent implements OnInit, OnChanges {
  @Input() text: string;
  @Input() searchText: string;
  public finalText: string;

  constructor(private titleCasePipe: TitleCasePipe) { }

  ngOnInit() {
    this.finalText = this.text;
  }

  ngOnChanges() {
    // TODO: Figure out how to preserve camel case with Title, Artists, Album when highlighting search text
    if (this.searchText.length > 0) {
      const tt = new RegExp(this.searchText.toLowerCase(), 'g');
      // const tttt = this.getAllIndexes(this.text, this.searchText);
      // console.log(tttt);
      // let t = this.text;
      // const l = [];
      // for (let i = 0; i < tttt.length; i++) {
      //   console.log(tttt[i])
      //   console.log(this.searchText.length);
      //   const lala = this.text.toLowerCase().substring(tttt[i], tttt[i] + this.searchText.length);
      //   const tt = new RegExp(lala, 'g');
      //   // const tt = new RegExp('^(' + lala + ')((?!<span>))', 'g');
      //   console.log(lala)
      //   l.push(this.text.toLowerCase().replace(tt, `~~~~${lala}====`));
      //   t = t.replace(tt, `~~~${lala}~~~~`);
      //   console.log(t)
      //   // t = t.replace(tt, `<span class="highlight">${this.searchText}</span>`);
      //   console.log(l)
      // }

      // if (l.length > 0) {
      //   console.log(l[l.length - 1]);
      //   const openingTag = new RegExp('~~~~', 'g');
      //   const closingTag = new RegExp('====', 'g');
      //   const hhh = l[l.length - 1].replace(openingTag, '<span class="highlight">').replace(closingTag, '</span>');
      //   console.log(hhh);
      //   this.finalText = this.titleCasePipe.transform(hhh);
      //   // const laala = this.text.substring()
      //   console.log(this.finalText);
      // } else {
      //   this.finalText = this.text;
      // }
      this.finalText = this.text.toLowerCase().replace(tt, `<span class="highlight">${this.searchText}</span>`);
      // console.log(document.getElementsByClassName('highlight'));
    } else {
      this.finalText = this.text;
    }
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

