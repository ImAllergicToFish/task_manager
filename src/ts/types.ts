export type TaskStatus = 'PENDING' | 'RUNNING' | 'PAUSED' | 'ERROR' | 'DONE';

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

export type MainThreadMessageType = 'pause' | 'unpause';

export type MainThreadMessage = {
    type: MainThreadMessageType,
    data?: unknown
};

