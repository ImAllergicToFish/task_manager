import taskManager from "./taskManager";
import fs from "fs"
import path from "path"
import SecurityKeys from "./taskManager/security";

export default async function startup() {
    const configFile = await fs.promises.readFile(path.join(__dirname, "..","startup.config"))
    const taskNamesToStart = configFile.toString().split("\n");

    const taskInfoList = taskManager.getTaskList();
    const configTaskInfoList = taskInfoList.filter(task => taskNamesToStart.includes(task.name));
    const configTasksIds = configTaskInfoList.map(task => task.id);

    await taskManager.startByIds(configTasksIds, {secureAccessKey: SecurityKeys.taskSecureAccessKey});
}