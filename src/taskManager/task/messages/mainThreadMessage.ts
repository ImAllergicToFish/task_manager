import { MainThreadMessageType } from "../../../ts/types";

type MainThreadMesaageData<T extends MainThreadMessageType> = 
    T extends 'stop' ? never :
    never;

export default class MainThreadMessageInstance<T extends MainThreadMessageType> {

    type: T;
    data!: MainThreadMesaageData<T>;

    constructor(msgType: T) {
        this.type = msgType;
    }
}