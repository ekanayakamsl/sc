import {DiningTimeDialogData} from '../setup-cmponents/dining-time-dialog/dining-time-dialog.component';

export class DiningTime {
  id: string;
  name: string;
  from: string;
  to: string;
  active: boolean;

  public static toDiningTimeDialogData(diningTime: DiningTime, isNew: boolean): DiningTimeDialogData {
    return {name: diningTime.name, from: diningTime.from, to: diningTime.to, active: diningTime.active, isNew};
  }

  public static toDiningTime(result: DiningTimeDialogData): DiningTime {
    return {id: result.name, name: result.name, from: result.from, to: result.to, active: result.active};
  }
}
