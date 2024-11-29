FROM node:22-slim

WORKDIR /app

RUN apt-get update

EXPOSE 3333

ENTRYPOINT [ "./.docker/docker-entrypoint.sh" ]