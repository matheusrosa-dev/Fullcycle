FROM node:22-slim

WORKDIR /app

EXPOSE 3333

ENTRYPOINT [ "./.docker/docker-entrypoint.sh" ]
# CMD [ "tail", "-f", "/dev/null" ]
