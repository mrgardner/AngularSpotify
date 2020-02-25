// Interfaces
import { CurrentTrack, SortedTrack } from '@interfaces/track/track.interface';

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

const mockCurrentTrack = (title: string, artist: string): CurrentTrack => {
  return {
    added_at: 'string',
      added_by: {
        external_urls: {
          spotify: ''
        },
        href: '',
        id: '',
        type: '',
        uri: ''
      },
      highlight: true,
      isPauseButtonShowing: true,
      isPlayButtonShowing: true,
      is_local: true,
      primary_color: '',
      track: {
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
      },
      video_thumbnail: {
        url: ''
      }
  };
};

export { mockCurrentTrack, mockSortedTrack };
