/**
 * Starts the application on the port specified.
 */

import Task from "./taskManager/task";

const task = new Task('test');


task.run();

console.log('AFTER RUNNING');
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
sleep(3000).then(() => {
    task.pause();
    console.log('pause');
    sleep(5000).then(() => {
        task.unPause();
        console.log('unpause');
    })

})
   






