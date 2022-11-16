import { Worker } from "worker_threads";
import { TaskStatus } from "../../ts/types";

export default class Task {
    private readonly _taskFilePath: string;
    private readonly _worker: Worker | undefined;

    private _name: string;
    private _status: TaskStatus;

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
    }

    run(): void {
        this.initWorker();
    }

    private initWorker(): void {
        const worker = new Worker(this._taskFilePath, {stderr: true});
        worker.on('online', () => {
            this._status = 'RUNNING';
            console.log('ONLINE')
        })
        worker.on('message', (msg) => {

        });
        worker.on('exit', (code) => {
            console.log('CODE: ' + code);
            if(code == 0) this._status = 'DONE';
            if(code == 1) this._status = 'ERROR';
        })
        worker.on('error', (err) => {
            console.log('ON ERROR')
            console.log(err)
            this._status = 'ERROR';
        });
       
    }


}