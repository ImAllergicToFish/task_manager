# Task Manager

***
Для развертки сервера:  
1. Перейдите в папку проекта
2. Для сборки docker-образа выполните:
```
sudo docker build --no-cache -t ups_backend .
```
3. Для запуска сервера с помощью docker-compose выполните:
```
sudo docker compose up -d
```

## Примечания
* Рекомендуется устанавливать docker из офцициального источника
по [ссылке](https://docs.docker.com/engine/install/ubuntu/)
