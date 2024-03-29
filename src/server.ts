/**
 * Starts the application on the port specified.
 */
require('dotenv').config();

import app from "./api";
import taskManager from "./taskManager";
import startup from "./startup";
import getConfig from "./config";

taskManager.createTasks(
    [
        'logger'
    ],
    {
        secureAccess: true,
        tag: "SOME TAG"
    }
);

taskManager.createTasks([
    'example',
    //'logger'
]);

const PORT = getConfig().PORT || 8070;
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
    startup()
})
