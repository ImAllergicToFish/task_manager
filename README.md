# Task Manager



Task-manager is a multithreaded utility for creating, managing and controlling 
various software tools or tasks that are separate threads of code execution. 
Task-manager includes HTTP API for interaction with the application, task logging, as well as a system for controlling access to tasks.

To create a task use the command:
```
npm run createTask TASK_NAME
```
After that, a folder with the name of your task with a project template will appear in the "tasks" folder.

***
## Launching and deploying
To run the application with nodeJS, navigate to the project folder and use the command:
```
npm start
```
To run an application using Docker, use the commands:
1. To build a docker image:
```
sudo docker build --no-cache -t task_manager .
```
2. To start the server using docker-compose, run:
```
sudo docker compose up -d
```

***
## Notes
*  Default application port: 8070
*  To set up autorun tasks, enter their names in the [startup.config](https://github.com/ImAllergicToFish/task_manager/blob/master/startup.config) file
