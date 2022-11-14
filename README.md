# UpStorage/StorageUp backend
**ВНИМАНИЕ:** Для развертки проекта сперва следует развернуть MongoDB  
в режиме реплик из 
[репозитория](https://github.com/ImAllergicToFish/mongo_cluster), следуя инструкции в 
[README.md](https://github.com/ImAllergicToFish/mongo_cluster/blob/master/README.md)
***
Для развертки сервера:  
1. Перейдите в папку проекта
2. Настройте переменные .env, если вы используете не приведенную выше сборку MongoDB
3. Для сборки docker-образа выполните:
```
sudo docker build --no-cache -t ups_backend .
```
4. Для запуска сервера с помощью docker-compose выполните:
```
sudo docker compose up -d
```

## Примечания
* Рекомендуемая ОС: [Ubuntu 20.04](https://releases.ubuntu.com/20.04/)
* Рекомендуется устанавливать docker из офцициального источника
по [ссылке](https://docs.docker.com/engine/install/ubuntu/)
