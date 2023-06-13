import express from 'express'

export default (app: express.Application) => {
    
    app.get(
        `/service/taskList`, 
        require('./taskList').default
    );
    
    /* BY ID BLOCK
    ------------------------- */

    app.get(
        `/service/taskInfo/:id`, 
        require('./taskFindById').default
    );
    app.get(
        `/service/taskStart/:id`, 
        require('./taskStartById').default
    );
    app.get(
        `/service/taskStop/:id`, 
        require('./taskStopById').default
    );
    app.get(
        `/service/taskRestart/:id`, 
        require('./taskRestartById').default
    );


    /* BY IDS BLOCK
    ------------------------- */

    app.get(
        `/service/taskStartMultiple`, 
        require('./taskStartByIds').default
    );
    app.get(
        `/service/taskStopMultiple`, 
        require('./taskStopByIds').default
    );
    app.get(
        `/service/taskRestartMultiple`, 
        require('./taskRestartByIds').default
    );


    /* ALL BLOCK
    ------------------------- */
    
    app.get(
        `/service/taskStartAll`, 
        require('./taskStartAll').default
    );
    app.get(
        `/service/taskStopAll`, 
        require('./taskStopAll').default
    );
    app.get(
        `/service/taskRestartAll`, 
        require('./taskRestartAll').default
    );

};
