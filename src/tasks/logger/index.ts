import { Worker, parentPort, isMainThread } from "worker_threads";
import WorkerMessageInstance from "../../taskManager/task/messages/workerMessage";
import { MainThreadMessage, WorkerMessage } from "../../ts/types";

/******************************************************************
_______________________PUT YOUR CODE HERE__________________________

!!!WARNING: it is not recommended to use infinite/very long loops
without using asynchronous operations in the body of the loop.  
Otherwise, the operations of receiving messages from the main 
stream may be blocked.

Some usefull functions:

* log() - use as console.log; console.log may not work correctly.

* updateTaskInfo() - the function updates the task information in 
the main thread. You can use it for information about internal
variables, for example, how many collection items have already 
been processed in the database. It is highly recommended 
to determine in advance the type of data that you will update 
and hold to it for any update of information within this task.

*******************************************************************/

async function main(): Promise<void> {
    const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
    let counter = 0;
    while(true) {
        log('LOGGER' + counter);
        updateTaskInfo({counter});
        counter += 1;
        await sleep(1000);
    }
}


/******************************************************************
_______________TECHNICAL CODE FOR THE TASK MANAGER_________________

           !!!WARNING: DO NOT CHANGE THE CODE BELOW!!!

*******************************************************************/        



try {
    // Cant run file as main thread
    if(!parentPort) throw new Error('Parent thread is not defined');

    // Receive message from main thread
    parentPort.on('message', (msg: MainThreadMessage) => {
        
    })

    main()
        .catch((err) => {
            log('WORKER ERROR \n' + err);
            process.exit(1);
        })
        .then(() => {
            process.exit(0);
        });

} catch(err) {
    log('WORKER ERROR \n' + err);
    process.exit(1);
}

//----------------USEFULL FUNCTIONS-----------------

function log(msg: unknown) {
    if(!parentPort) throw new Error('Parent thread is not defined');
    const message = new WorkerMessageInstance('log');
    message.data = msg;
    parentPort.postMessage(message);
}

function updateTaskInfo(data: object) {
    if(!parentPort) throw new Error('Parent thread is not defined');
    const message = new WorkerMessageInstance('taskInfo');
    message.data = data;
    parentPort.postMessage(message);
}





