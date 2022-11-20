export type TaskStatus = 'PENDING' | 'RUNNING' | 'ERROR' | 'DONE';

export type TaskInfo = {
    name: string,
    status: TaskStatus,
    internalInfo: unknown
}

//------------------------------------------------------------|
//                 Worker Message Types                       |
//------------------------------------------------------------/

export type WorkerMessageType = 'log' | 'taskInfo';
export type LogData = unknown;
export type TaskInforamtion = unknown & object;

export type WorkerMessage = {
    type: WorkerMessageType,
    data: LogData | TaskInforamtion
};

//------------------------------------------------------------|
//              Main Thread Message Types                     |
//------------------------------------------------------------/

export type MainThreadMessageType = 'stop';

export type MainThreadMessage = {
    type: MainThreadMessageType,
    data?: unknown
};

