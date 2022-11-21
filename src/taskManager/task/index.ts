import { Worker } from "worker_threads";
import { TaskInfo, TaskStatus, WorkerMessage } from "../../ts/types";
import MainThreadMessageInstance from "./messages/mainThreadMessage";
import TaskTimeUtils from "./timeUtils";

export default class Task {

    private readonly _taskFolderPath: string;
    private _worker: Worker | undefined;

    private _name: string;

    private _status: TaskStatus;

    private _time: TaskTimeUtils;

    /**
     * Information received from the worker
     */
    private _internalInfo: null | unknown; 

    get name(): string {
        return this._name;
    }

    get status(): TaskStatus {
        return this._status;
    }

    get info(): TaskInfo {
        return {
            name: this.name,
            status: this.status,
            time: this._time.overall,
            internalInfo: this._internalInfo
        }
    }

    constructor(taskFolderName: string, taskName?: string) {
        this._name = taskName ? taskName : taskFolderName;

        const isFolderNameValid =  (name: string) => {
            return Boolean(name.match(/^[A-Za-z0-9]*$/));
        };
        if(!isFolderNameValid(taskFolderName)) throw new Error('Invalid folder name');

        this._taskFolderPath = './dist/tasks/' + taskFolderName + '/index.js';
        this._status = 'PENDING';
        this._internalInfo = null;
        this._time = new TaskTimeUtils();
    }

    start(): void {
        this.initWorker();
    }

    async stop(): Promise<void> {
        if(!this._worker) return;
        this._status = 'STOPING';
        await this._worker.terminate();
        this._status = 'PENDING';
    }

    async restart(): Promise<void> {
        await this.stop();
        this.start();
    }

    private initWorker(): void {
        const worker = new Worker(this._taskFolderPath);

        worker.on('online', () => {
            this._status = 'RUNNING';
            this._time.start();
        })

        worker.on('message', (msg: WorkerMessage) => {
            if(msg.type == "log") {
                console.log(msg.data);
            }
            if(msg.type == 'taskInfo') {
                this._internalInfo = msg.data;
            }
        });

        worker.on('exit', (code) => {
            console.log(this._name, 'CODE:', code);
            switch(code) {
                case 0:
                    this._status = 'DONE';
                    break;
                case 1:
                    if(this._status == 'STOPING') break;
                    this._status = 'ERROR';
                    break;
            }
            this._time.stop();
        })

        worker.on('error', (err) => {
            console.log('ON ERROR\n' + err);
            this._status = 'ERROR';
            this._time.stop();
        });
       
        this._worker = worker;
    }
    
}
