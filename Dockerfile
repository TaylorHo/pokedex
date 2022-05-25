## Build Frontend inside the container

FROM node:16-alpine as node

WORKDIR /usr/app/frontend
COPY ./frontend .
RUN npm install
RUN npm run build


## Run the server (API + Front)

FROM node:16-alpine
COPY --from=node /usr/app/frontend/dist/frontend /usr/app/web

WORKDIR /usr/app/
RUN rm -rf /usr/app/frontend

COPY ./server .
RUN npm install

EXPOSE 3000
CMD [ "node", "server.js" ]


# Request the required env var (MONGO_URI)

COPY ./server/entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh
ENTRYPOINT ["entrypoint.sh"]