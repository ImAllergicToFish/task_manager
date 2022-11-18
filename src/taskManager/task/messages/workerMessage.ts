import { LogData, TaskInforamtion, WorkerMessageType } from "../../../ts/types";

type WorkerMessageData<T extends WorkerMessageType> = 
    T extends 'log' ? LogData :
    T extends 'taskInfo' ? TaskInforamtion :
    never;

export default class WorkerMessageInstance<T extends WorkerMessageType> {

    type: T;
    data!: WorkerMessageData<T>;

    constructor(msgType: T) {
        this.type = msgType;
    }

}