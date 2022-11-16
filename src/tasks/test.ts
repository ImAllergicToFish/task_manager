import { Worker, parentPort, isMainThread } from "worker_threads";

/******************************************************************
_______________________PUT YOUR CODE HERE__________________________

!!!WARNING: it is not recommended to use infinite/very long loops
without using asynchronous operations in the body of the loop.  
Otherwise, the operations of receiving messages from the main 
stream may be blocked.

*******************************************************************/

async function main(): Promise<void> {
    console.log('Hello from worker!');
    throw new Error('TEST ERROR')
}


/******************************************************************
_______________TECHNICAL CODE FOR THE TASK MANAGER_________________

           !!!WARNING: DO NOT CHANGE THE CODE BELOW!!!
           
*******************************************************************/        

if(!parentPort) throw new Error('Parent thread is not defined');
parentPort.on('message', (msg: string) => {
    console.log('Hello ' + msg);
})

self.addEventListener('unhandledrejection', function (event) {
    // the event object has two special properties:
    // event.promise - the promise that generated the error
    // event.reason  - the unhandled error object
    throw event.reason;
});

main();




