import { Worker } from "worker_threads";
import { TaskStatus } from "../../ts/types";

export default class Task {
    private readonly _taskFilePath: string;
    private readonly _worker: Worker | undefined;

    status: TaskStatus;

    constructor(taskFileName: string) {
        const isFileNameValid =  (name: string) => {
            return Boolean(name.match(/^[A-Za-z0-9]*$/));
        };
        if(!isFileNameValid(taskFileName)) throw new Error('Invalid file name');
        this._taskFilePath = './src/tasks/' + taskFileName + '.js';
        this.status = 'PENDING';
    }

    private initWorker(): void {
        const worker = new Worker(this._taskFilePath);
        worker.on('online', () => {
            this.status = 'RUNNING';
        })
        worker.on('message', (msg) => {

        });
        worker.on('exit', (code) => {
            if(code == 1) this.status = 'DONE';
        })
        worker.on('error', (err) => {
            this.status = 'ERROR';
        });
       
    }


}