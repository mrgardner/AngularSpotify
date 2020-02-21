// Pipes
import { DuplicateTrackPipe } from '@pipes/duplicate-track/duplicate-track.pipe';

describe('DuplicateTrackPipe', () => {
  it('create an instance of duplicate track pipe', () => {
    const pipe = new DuplicateTrackPipe();
    expect(pipe).toBeTruthy();
  });

  it('check transform method with no args', () => {
    const pipe = new DuplicateTrackPipe();
    const tracks = pipe.transform([]);
    expect(tracks.length).toEqual(0);
  });

  it('check transform method with args first items in correct order', () => {
    const pipe = new DuplicateTrackPipe();
    const tracks = pipe.transform([
      {
        track: {
          name: 'test',
          duration_ms: 123
        }
      },
      {
        track: {
          name: 'test',
          duration_ms: 123
        }
      },
      {
        track: {
          name: 'test1',
          duration_ms: 321
        }
      },
      {
        track: {
          name: 'test1',
          duration_ms: 321
        }
      }
    ], true);
    expect(tracks.length).toEqual(4);
  });

  it('check transform method with args first items in wrong order', () => {
    const pipe = new DuplicateTrackPipe();
    const tracks = pipe.transform([
      {
        track: {
          name: 'test1',
          duration_ms: 123
        }
      },
      {
        track: {
          name: 'test1',
          duration_ms: 123
        }
      },
      {
        track: {
          name: 'test',
          duration_ms: 321
        }
      },
      {
        track: {
          name: 'test',
          duration_ms: 321
        }
      }
    ], true);
    expect(tracks.length).toEqual(4);
  });
});
