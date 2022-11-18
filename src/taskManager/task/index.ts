import { Worker } from "worker_threads";
import { TaskStatus, WorkerMessage } from "../../ts/types";
import MainThreadMessageInstance from "./messages/mainThreadMessage";

export default class Task {
    private readonly _taskFilePath: string;
    private _worker: Worker | undefined;

    private _name: string;

    private _status: TaskStatus;

    /**
     * Information received from the worker
     */
    private _internalInfo: null | unknown; 

    get name(): string {
        return this._name;
    }

    get status(): string {
        return this._status;
    }

    constructor(taskFileName: string, taskName?: string) {
        this._name = taskName ? taskName : taskFileName;

        const isFileNameValid =  (name: string) => {
            return Boolean(name.match(/^[A-Za-z0-9]*$/));
        };
        if(!isFileNameValid(taskFileName)) throw new Error('Invalid file name');

        this._taskFilePath = './dist/tasks/' + taskFileName + '.js';
        this._status = 'PENDING';
        this._internalInfo = null;
    }

    run(): void {
        this.initWorker();
    }

    pause(): void {
        if(!this._worker) {
            console.log('UNDEFINED')
            return;
        }
        const msg = new MainThreadMessageInstance('pause');
        this._worker.postMessage(msg);
        this._status = 'PAUSED';
    }

    unPause(): void {
        if(!this._worker) return;
        const msg = new MainThreadMessageInstance('unpause');
        this._worker.postMessage(msg);
        this._status = 'RUNNING';
    }

    private initWorker(): void {
        const worker = new Worker(this._taskFilePath);

        worker.on('online', () => {
            this._status = 'RUNNING';
        })

        worker.on('message', (msg: WorkerMessage) => {
            console.log('MT msg:', msg);
            if(msg.type == "log") {
                console.log(msg.data);
            }
            if(msg.type == 'taskInfo') {
                this._internalInfo = msg.data;
            }
        });

        worker.on('exit', (code) => {
            console.log(this._name + 'CODE: ' + code);
            if(code == 0) this._status = 'DONE';
            if(code == 1) this._status = 'ERROR';
        })

        worker.on('error', (err) => {
            console.log('ON ERROR\n' + err);
            this._status = 'ERROR';
        });
       
        this._worker = worker;
    }


}