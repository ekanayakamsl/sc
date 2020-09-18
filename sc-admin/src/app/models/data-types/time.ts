export class Time {
  hours: number;
  minutes: number;

  public asString(): string {
    return this.hours.toString() + ':' + this.minutes.toString();
  }
}
