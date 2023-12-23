FROM node:lts
COPY ./ /usr/src/app
WORKDIR /usr/src/app
RUN npm i
RUN npm install -g serve
RUN npm run build
CMD ["serve", "-s", "build"]