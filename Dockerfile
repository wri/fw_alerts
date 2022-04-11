FROM node:12-alpine
MAINTAINER info@vizzuality.com

ENV NAME fw-alerts
ENV USER fw-alerts

RUN apk update && apk upgrade && \
    apk add --no-cache --update bash git openssh alpine-sdk

RUN addgroup $USER && adduser -s /bin/bash -D -G $USER $USER

RUN yarn global add grunt-cli bunyan

RUN mkdir -p /opt/$NAME
COPY package.json /opt/$NAME/package.json
COPY .eslintrc /opt/$NAME/.eslintrc
RUN cd /opt/$NAME && yarn

COPY config /opt/$NAME/config

WORKDIR /opt/$NAME

COPY ./app /opt/$NAME/app
COPY ./.babelrc /opt/$NAME/.babelrc
COPY ./tsconfig.json /opt/$NAME/tsconfig.json
RUN yarn build

RUN chown -R $USER:$USER /opt/$NAME

# Tell Docker we are going to use this ports
EXPOSE 4200
USER $USER

CMD ["node", "dist/app.js"]
