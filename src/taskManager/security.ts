import getConfig from "../config";

const SecurityKeys = {
    authKey: String(getConfig().AUTH_KEY),
    taskSecureAccessKey: String(getConfig().TASK_SECURE_ACCESS_KEY)
}

if(!SecurityKeys.authKey || !SecurityKeys.taskSecureAccessKey) 
    throw new Error("AUTH_KEY AND TASK_SECURE_ACCESS_KEY IS NOT CONFIGURED!!!");

export default SecurityKeys;