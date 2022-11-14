FROM node:16-alpine
#Comment for local version
#RUN apk update && apk add --no-cache bash
WORKDIR /upstorage/backend
ADD package*.json ./
#Comment for local version
#RUN npm install
ADD . .
RUN npm run build
#RUN npm run db:create
CMD ["npm", "run", "db:create"]
ENTRYPOINT ["node", "./dist/server.js"]
