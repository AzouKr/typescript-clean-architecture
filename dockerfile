FROM node:20

ADD package.json /tmp/package.json

RUN rm -rf build

RUN cd /tmp && yarn install

ADD ./ /src

RUN rm -rf src/node_modules && cp -a /tmp/node_modules /src/

WORKDIR /src

RUN npm run build

EXPOSE 3000

CMD ["node", "build/src/app.js"]