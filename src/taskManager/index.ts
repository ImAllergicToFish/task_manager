import { HttpError } from '../utils/httpError';
import { TaskManagerTask } from '../ts/types';
import SecurityKeys from './security';
import Task from './task';
import { TaskOptions, UseTaskOptions } from './taskOptions';

class TaskManager {
    private _taskList: Array<{task: Task, options: TaskOptions}>;

    constructor() {
        this._taskList = [];
    }

    addTasks(tasks: Task[], options?: Partial<TaskOptions>) {
        for (const task of tasks) {
            this.addTask(task, options);
        }
    }

    addTask(task: Task, options?: Partial<TaskOptions>) {
        this._taskList.push({
            task, 
            options: new TaskOptions(options)
        });
    }

    createTasks(taskFolderNames: string[], options?: Partial<TaskOptions>) {
        for (const taskFolderName of taskFolderNames) {
            const task = new Task(taskFolderName);
            this.addTask(task, options);
        }
    }
    
    getTaskList(isReturnInternalInfo?: boolean): TaskManagerTask[] {
        const taskList: TaskManagerTask[] = this._taskList.map((task, id) => {
            return this.getTaskInfoById(id, isReturnInternalInfo);
        });
        return taskList;
    }

    async startById(id: number, options = new UseTaskOptions()): Promise<TaskManagerTask> {
        const accessStatus = this.validateSecureAccess(id, options); 
        if(!accessStatus) throw new HttpError(403, "ACCESS DENIED");

        await this.getTaskById(id).start();
        return this.getTaskInfoById(id);
    }

    async startByIds(ids: number[], options = new UseTaskOptions()): Promise<TaskManagerTask[]> {
        //Check access
        for (const id of ids) {
            const accessStatus = this.validateSecureAccess(id, options); 
            if(!accessStatus) throw new HttpError(403, "ACCESS DENIED");
        }

        let result: TaskManagerTask[] = [];
        for (const id of ids) {
            const task = await this.startById(id, options);
            result.push(task);
        } 

        return result;
    }

    async stopById(id: number, options = new UseTaskOptions()): Promise<TaskManagerTask> {
        const accessStatus = this.validateSecureAccess(id, options); 
        if(!accessStatus) throw new HttpError(403, "ACCESS DENIED");

        await this.getTaskById(id).stop();
        return this.getTaskInfoById(id);
    }

    async stopByIds(ids: number[], options = new UseTaskOptions()): Promise<TaskManagerTask[]> {
        //Check access
        for (const id of ids) {
            const accessStatus = this.validateSecureAccess(id, options); 
            if(!accessStatus) throw new HttpError(403, "ACCESS DENIED");
        }

        let result: TaskManagerTask[] = [];
        for (const id of ids) {
            const task = await this.stopById(id, options);
            result.push(task);
        } 

        return result;
    }

    async restartById(id: number, options = new UseTaskOptions()): Promise<TaskManagerTask> {
        const accessStatus = this.validateSecureAccess(id, options); 
        if(!accessStatus) throw new HttpError(403, "ACCESS DENIED");

        await this.getTaskById(id).restart();
        return this.getTaskInfoById(id);
    }

    async restartByIds(ids: number[], options = new UseTaskOptions()): Promise<TaskManagerTask[]> {
        //Check access
        for (const id of ids) {
            const accessStatus = this.validateSecureAccess(id, options); 
            if(!accessStatus) throw new HttpError(403, "ACCESS DENIED");
        }

        let result: TaskManagerTask[] = [];
        for (const id of ids) {
            const task = await this.restartById(id, options);
            result.push(task);
        } 

        return result;
    }

    async startAll(): Promise<TaskManagerTask[]> {
        const allTasksInfo = this._taskList.map((task, id) => this.getTaskInfoById(id));
        const notSecureTasksInfo = allTasksInfo.filter(item => !item.secureAccess);
        const notSecureTasksIds = notSecureTasksInfo.map(task => task.id);

        return await this.startByIds(notSecureTasksIds);
    }

    async stopAll(): Promise<TaskManagerTask[]> {
        const allTasksInfo = this._taskList.map((task, id) => this.getTaskInfoById(id));
        const notSecureTasksInfo = allTasksInfo.filter(item => !item.secureAccess);
        const notSecureTasksIds = notSecureTasksInfo.map(task => task.id);

        return await this.stopByIds(notSecureTasksIds);
    }

    async restartAll(): Promise<TaskManagerTask[]> {
        const allTasksInfo = this._taskList.map((task, id) => this.getTaskInfoById(id));
        const notSecureTasksInfo = allTasksInfo.filter(item => !item.secureAccess);
        const notSecureTasksIds = notSecureTasksInfo.map(task => task.id);

        return await this.restartByIds(notSecureTasksIds);
    }

    getTaskInfoById(id: number, isReturnInternalInfo?: boolean): TaskManagerTask {
        let taskInfo = this.getTaskById(id).info;
        let taskOptions = this.getTaskOptionsById(id);
        if (!isReturnInternalInfo) taskInfo.internalInfo = undefined;
        return { id, ...taskOptions, ...taskInfo };
    }

    private getTaskById(id: number): Task {
        if(!this.isTaskIdExist(id)) throw new HttpError(404, 'TASK ID NOT FOUND');
        const task = this._taskList[id].task;
        return task;
    }

    private getTaskOptionsById(id: number): TaskOptions {
        if(!this.isTaskIdExist(id)) throw new HttpError(404, 'TASK ID NOT FOUND');
        const options = this._taskList[id].options;
        return options;
    }

    private isTaskIdExist(id: number): boolean {
        if(id < 0 || this._taskList.length <= id) return false;
        return true;
    }

    private validateSecureAccess(taskId: number, startOptions: UseTaskOptions): boolean {
        const taskOptions = this.getTaskOptionsById(taskId);
        if(!taskOptions.secureAccess) return true;
        if(!startOptions.secureAccessKey) return false;
        if(startOptions.secureAccessKey == SecurityKeys.taskSecureAccessKey) return true;
        return false;
    }

}

const taskManager = new TaskManager();
export default taskManager;
