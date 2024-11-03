FROM node:20.18.0

WORKDIR /app
COPY package.json /app/

# RUN npm install -g npm@10.9.0

RUN npm cache clean --force
RUN npm install 

COPY . .
EXPOSE 8080

CMD ["node", "app.mjs"]