import { SpotifySongResponse } from '@interfaces/song/song.interface';

const mockSongState: SpotifySongResponse = {
  bitrate: 1,
  context: {
    metadata: {},
    uri: ''
  },
  disallows: {
    pausing: true,
    skipping_prev: true
  },
  duration: 1000,
  paused: true,
  position: 10000,
  repeat_mode: 0,
  restrictions: {
    disallow_pausing_reasons: [],
    disallow_skipping_prev_reasons: []
  },
  shuffle: true,
  timestamp: 0,
  track_window: {
    current_track: {
      filterText: '',
      added_at: '',
      total: 0,
      size: 0,
      showPauseButton: false,
      showPlayButton: false,
      album: {
        album_type: '',
        artists: [],
        available_markets: [],
        external_urls: {
          spotify: ''
        },
        href: '',
        id: '',
        images: [],
        name: '',
        release_date: '',
        release_date_precision: '',
        total_track: 0,
        type: '',
        uri: ''
      },
      artists: [],
      available_markets: [],
      disc_number: 0,
      duration_ms: 0,
      explicit: true,
      external_ids: {
        isrc: ''
      },
      external_urls: {
        spotify: ''
      },
      href: '',
      id: '',
      name: '',
      popularity: 0,
      preview_url: '',
      track_number: 0,
      type: '',
      uri: '',
      isPlayButtonShowing: true,
      isPauseButtonShowing: true,
      remove: true,
      album_name: '',
      title: '',
      artist: '',
      time: 0,
      addedAt: '',
      duration: 0
    },
    next_tracks: [],
    previous_tracks: []
  }
};

export {mockSongState};
