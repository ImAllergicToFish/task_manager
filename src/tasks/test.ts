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
    throw new Error('TEST ERROR');
    //while(true){};
}


/******************************************************************
_______________TECHNICAL CODE FOR THE TASK MANAGER_________________

           !!!WARNING: DO NOT CHANGE THE CODE BELOW!!!

*******************************************************************/        


try {
    // Cant run file as main thread
    if(!parentPort) throw new Error('Parent thread is not defined');

    // Receive message from main thread
    parentPort.on('message', (msg: string) => {
        console.log('Hello ' + msg);
    })

    main()
        // .catch((err) => {
        //     console.log('WORKER ERROR \n' + err);
        //     process.exit(1);
        // })
        .then(() => {
            process.exit(0)
        })

} catch(err) {
    console.log('WORKER ERROR \n' + err);
    process.exit(1);
}







