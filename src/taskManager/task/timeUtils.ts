import { TaskTime } from "../../ts/types";

export default class TaskTimeUtils {

    private _startTimeMs?: number;
    private _endTimeMs?: number;

    private get currentTimeMs() {
        return new Date().getTime();
    }

    get uptime(): string | null {
        if(!this._startTimeMs) return null;
        if(this._endTimeMs) return null;
        const uptimeMs = this.currentTimeMs - this._startTimeMs;
        return prettyMs(uptimeMs);
    }

    get executionTime(): string | null {
        if(!this._startTimeMs || !this._endTimeMs) return null;
        const executionTimeMs = this._endTimeMs - this._startTimeMs;
        return prettyMs(executionTimeMs);
    }

    get overall(): TaskTime {
        return {
            uptime: this.uptime,
            executionTime: this.executionTime
        }
    }

    start(): void {
        this._startTimeMs = this.currentTimeMs;
        this._endTimeMs = undefined;
    }

    stop(): void {
        this._endTimeMs = new Date().getTime();
    }
}

/**
 * 
 * @param time - время в мс
 * @returns время в формате 00h 00m 00s 00ms
 */
function prettyMs(time: number): string {
    if(!time) return '0ms'

    let ms = time % 1000;
    //time to sec
    time = (time - ms) / 1000;
    let secs = time % 60;
    //time to mins
    time = (time - secs) / 60;
    let mins = time % 60;
    //time to hours
    time = (time - mins) / 60
    let hrs = time % 60;
    let days = (time - hrs)/24
    
    let result = '';
    if(days) result += days + 'd ';
    if(hrs) result += hrs + 'h ';
    if(mins) result += mins + 'm ';
    if(secs) result += secs + 's ';
    if(ms) result += ms + 'ms'
    
    return result;
}