import { TaskOptions } from "../taskManager/taskOptions";

export type TaskStatus = 'PENDING' | 'PREPARING_TO_RUN' |'RUNNING' | 
    'ERROR' | 'DONE' | 'STOPING';

export type TaskTime = {
    uptime: string | null,
    executionTime: string | null
}

export type TaskInfo = {
    name: string,
    status: TaskStatus,
    time: TaskTime,
    internalInfo: unknown
}

export type TaskManagerTask = TaskInfo & { id: number } & TaskOptions;

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

