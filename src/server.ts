/**
 * Starts the application on the port specified.
 */

import app from "./api";
import taskManager from "./taskManager";

taskManager.createTasks(
    'example',
    'migration',
    'logger',
    'aboba'
);

const PORT = 8090;
app.listen(8090, () => {
    console.log(`Listening on port ${PORT}`);
})




