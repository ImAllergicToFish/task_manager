/**
 * Starts the application on the port specified.
 */

import Task from "./taskManager/task";

const task = new Task('test');

task.run();

console.log('AFTER RUNNING');
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
sleep(3000).then(() => {
        console.log(task.info)
    sleep(5000).then(() => {
        console.log(task.info)
        task.stop().then(() => {
            console.log('STOPED');
            console.log(task.info);
            sleep(2000).then(() => {
                console.log('START AGAIN');
                task.run();
                sleep(500).then(() => {
                    console.log(task.info);
                })
            })
        });
        
    })
})
   






