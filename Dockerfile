FROM node:12.14.1

RUN mkdir -p /opt/app

RUN apt-get -q update && apt-get -qy install netcat
RUN npm install npm@latest -g
RUN npm install pm2 -g

WORKDIR /opt
COPY package.json ./
COPY package-lock.json ./
RUN npm install && npm cache clean --force

ENV PATH /opt/node_modules/.bin:$PATH

WORKDIR /opt/app
COPY . /opt/app

ADD wait-for.sh /wait-for.sh

EXPOSE 5001
