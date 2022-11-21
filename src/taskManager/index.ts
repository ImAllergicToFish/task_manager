import { TaskManagerTask } from "../ts/types";
import Task from "./task";
class TaskManager {
    
    private _taskList: Task[];

    constructor() {
        this._taskList = [];
    }

    addTasks(...tasks: Task[]) {
        for(const task of tasks) {
            this._taskList.push(task);
        }
    }

    createTasks(...taskFolderNames: string[]) {
        for(const taskFolderName of taskFolderNames) {
            const task = new Task(taskFolderName);
            this._taskList.push(task);
        }
    }

    getTaskList(isReturnInternalInfo?: boolean): TaskManagerTask[]  {
        const taskList: TaskManagerTask[] = this._taskList.map((task, id) => {
            return this.getTaskInfoById(id, isReturnInternalInfo);
        })
        return taskList;
    }

    startById(id: number): void {
        this.getTaskById(id).start();
    }

    async stopById(id: number): Promise<void> {
        await this.getTaskById(id).stop();
    }

    async restartById(id: number): Promise<void> {
        await this.getTaskById(id).restart();
    }

    startAll(): void {
        for(const task of this._taskList) task.start();
    }

    async stopAll(): Promise<void> {
        for(const task of this._taskList) await task.stop();
    }

    async restartAll(): Promise<void> {
        for(const task of this._taskList) await task.restart();
    }

    getTaskInfoById(id: number, isReturnInternalInfo?: boolean): TaskManagerTask {
        let taskInfo = this.getTaskById(id).info;
        if(!isReturnInternalInfo) taskInfo.internalInfo = undefined;
        return { id, ...taskInfo};
    }

    private getTaskById(id: number): Task {
        const task =  this._taskList[id];
        if(!task) throw new Error('INVALID TASK ID');
        return task;
    }

}

const taskManager = new TaskManager();
export default taskManager;