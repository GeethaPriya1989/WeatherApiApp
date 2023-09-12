export class HourlyData {
    time!: string;
    comment!: string;
    icon!: string;
    temp_c!: number;
    feelslike!: number;
    constructor(data: any) {
        this.time=data.time.substring(11,16);
        this.feelslike=data.feelslike_c;
        this.comment=data.condition.text;
        this.temp_c=data.temp_c;
        this.icon=data.condition.icon;
    }
}
