/**
 * Starts the application on the port specified.
 */

import Task from "./taskManager/task";

const task = new Task('test');
console.log(task.name);
console.log(task.status);


task.run();
console.log('AFTER RUNNING');
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
sleep(1000).then(() => {
    console.log(task.status);
})






