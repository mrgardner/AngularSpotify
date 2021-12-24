import { DeviceModalService } from "@dashboard/services/device-modal/device-modal.service";
import { StatusBarService } from "@dashboard/services/status-bar/status-bar.service";

export const dashboardServices: any[] = [
  DeviceModalService,
  StatusBarService
];

export * from './device-modal/device-modal.service'
export * from './status-bar/status-bar.service';