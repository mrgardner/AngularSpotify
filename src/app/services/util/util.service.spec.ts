// Interfaces
import { Artist } from '@interfaces/artist/artist.interface';

// Services
import { UtilService } from '@services/util/util.service';

// Testing
import { TestBed } from '@angular/core/testing';

describe('UtilServiceService', () => {
  let utilService: UtilService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UtilService
      ]
    });

    utilService = TestBed.inject(UtilService);
  });

  afterEach(() => {
    utilService = null;
  });

  it('should be created', () => {
    expect(utilService).toBeTruthy();
  });

  it('should test encodeSpecialSymbols method with special symbol (', () => {
    const url = 'Hey there (';
    const expectedResult = 'Hey there %28';
    const result = utilService.encodeSpecialSymbols(url);
    expect(result).toEqual(expectedResult);
  });

  it('should test encodeSpecialSymbols method with special symbol )', () => {
    const url = 'Hey there )';
    const expectedResult = 'Hey there %29';
    const result = utilService.encodeSpecialSymbols(url);
    expect(result).toEqual(expectedResult);
  });

  it('should test encodeSpecialSymbols method with special symbol ~', () => {
    const url = 'Hey there ~';
    const expectedResult = 'Hey there %7E';
    const result = utilService.encodeSpecialSymbols(url);
    expect(result).toEqual(expectedResult);
  });

  it('should test encodeSpecialSymbols method with special symbol !', () => {
    const url = 'Hey there!!';
    const expectedResult = 'Hey there%21%21';
    const result = utilService.encodeSpecialSymbols(url);
    expect(result).toEqual(expectedResult);
  });

  it('should test encodeSpecialSymbols method with special symbol *', () => {
    const url = 'Hey there *';
    const expectedResult = 'Hey there %2A';
    const result = utilService.encodeSpecialSymbols(url);
    expect(result).toEqual(expectedResult);
  });

  it('should test encodeSpecialSymbols method with multiple special symbols', () => {
    const url = 'Hey there ((!**!))';
    const expectedResult = 'Hey there %28%28%21%2A%2A%21%29%29';
    const result = utilService.encodeSpecialSymbols(url);
    expect(result).toEqual(expectedResult);
  });

  it('should check shortenString method with string shorter than stringLength parameter', () => {
    const string = 'test';
    const result = utilService.shortenString(string, 5);
    expect(result).toEqual(string);
  });

  it('should check shortenString method with string longer than stringLength parameter', () => {
    const string = 'testing';
    const result = utilService.shortenString(string, 5);
    expect(result).toEqual('testi...');
  });

  it('should check prettyMs method with seconds less than 10', () => {
    const ms = 123456;
    const result = utilService.prettyMs(ms);
    expect(result).toEqual('2:03');
  });

  it('should check prettyMs method with seconds more than 10', () => {
    const ms = 1234567;
    const result = utilService.prettyMs(ms);
    expect(result).toEqual('20:35');
  });

  it('should check totalDurationPrettyMs method with only minutes', () => {
    const ms = 1234567;
    const result = utilService.totalDurationPrettyMs(ms);
    expect(result).toEqual('20 min');
  });

  it('should check totalDurationPrettyMs method with only minutes', () => {
    const ms = 3600000;
    const result = utilService.totalDurationPrettyMs(ms);
    expect(result).toEqual('1 hr ');
  });

  it('should check totalDurationPrettyMs method with hours and minutes', () => {
    const ms = 12345678;
    const result = utilService.totalDurationPrettyMs(ms);
    expect(result).toEqual('3 hr 25 min');
  });

  it('should check displayArtists method with only 1 artist', () => {
    const artists: Array<Artist> = [
      {
        external_urls: '',
        id: 'test',
        name: 'test',
        type: '',
        uri: ''
      }
    ];
    const result = utilService.displayArtists(artists);
    expect(result).toEqual(['test']);
  });

  it('should check displayArtists method with 2 artists', () => {
    const artists: Array<Artist> = [
      {
        external_urls: '',
        id: 'test',
        name: 'test',
        type: '',
        uri: ''
      },
      {
        external_urls: '',
        id: 'matt',
        name: 'matt',
        type: '',
        uri: ''
      }
    ];
    const result = utilService.displayArtists(artists);
    expect(result).toEqual(['test, ', 'matt']);
  });

  it('should check compare method with asc direction in correct sort order', () => {
    const result = utilService.compare('apple', 'banana', true);
    expect(result).toEqual(-1);
  });

  it('should check compare method with dsc direction in wrong sort order', () => {
    const result = utilService.compare('apple', 'banana', false);
    expect(result).toEqual(1);
  });

  it('should check compare method with asc direction in correct sort order', () => {
    const result = utilService.compare('banana', 'apple', true);
    expect(result).toEqual(1);
  });

  it('should check compare method with dsc direction in wrong sort order', () => {
    const result = utilService.compare('banana', 'apple', false);
    expect(result).toEqual(-1);
  });
});
