export interface Device {
  id: string;
  is_active: boolean;
  is_private_sesssion: boolean;
  is_restricted: boolean;
  name: string;
  type: string;
  volume_percent: number;
}
