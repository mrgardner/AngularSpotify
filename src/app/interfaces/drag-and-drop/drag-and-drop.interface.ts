import { SortedTrack } from '@app/interfaces/track/track.interface';

export interface DragSource {
  source: {
    data: SortedTrack
  };
}

export interface DropData {
  currentIndex: number;
  previousIndex: number;
  item: {
    data: SortedTrack;
  };
}