import { Device } from "./device";

export interface Sensors {

  Device_id: Device['deviceId']
  Temperature: string,
  Heat: string,
  Object_presence: string,
  Version: string
}
