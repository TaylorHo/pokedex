####### Build Frontend inside the container #######

FROM node:16-alpine as node

WORKDIR /usr/app/frontend
COPY ./frontend .
RUN npm install
RUN npm run build


####### Run the server (API + Front) #######

FROM node:16-alpine

# Copy the Angular build to the deserved path
COPY --from=node /usr/app/frontend/dist/frontend /usr/app/web

WORKDIR /usr/app/

# Delete the frontend directory, because it's not needed anymore
RUN rm -rf /usr/app/frontend


# Run the server
COPY ./server .
RUN npm install

EXPOSE 3000
CMD [ "node", "server.js" ]


####### Request the required env var (MONGO_URI) #######

COPY ./server/entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh
ENTRYPOINT ["entrypoint.sh"]