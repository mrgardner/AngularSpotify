// Interfaces
import { SortedTrack } from '@interfaces/track/track.interface';

const mockSortedTrack = (title: string, artist: string): SortedTrack => {
  return {
    title,
    artist,
    album_name: '',
    added_at: '',
    time: 0,
    showPlayButton: false,
    showPauseButton: false,
    duration: 0,
    uri: '',
    total: 0,
    size: 0,
    filterText: '',
    remove: false
  };
};

export { mockSortedTrack };
