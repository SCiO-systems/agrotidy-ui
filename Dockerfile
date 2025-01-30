FROM node:20.16.0 as build

WORKDIR /app

COPY .npmrc ./
COPY package.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx:stable-alpine

COPY --from=build /app/dist /usr/share/nginx/html

RUN sed -i '/location \/ {/a \
    try_files $uri $uri/ /index.html;' /etc/nginx/conf.d/default.conf



# FROM node:20.16.0
# WORKDIR /app
# COPY package.json .
# RUN npm install
# COPY . .
# RUN npm run build
# CMD ["npm", "run", "start:prod"]
