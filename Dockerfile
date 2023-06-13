FROM node:16-alpine
#Comment for local version
RUN apk update && apk add --no-cache bash
WORKDIR /task-manager
ADD package*.json ./
#Comment for local version
RUN apk add git
RUN npm install
ADD . .
RUN npm run build
#RUN npm run db:create
CMD ["npm", "start"]

