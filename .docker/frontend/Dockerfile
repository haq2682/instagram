# ---- Stage 1: Build ----
FROM node:20-alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY index.html vite.config.js ./
COPY public/ ./public/
COPY src/ ./src/

ARG VITE_GOOGLE_AUTH_URI
ENV VITE_GOOGLE_AUTH_URI=$VITE_GOOGLE_AUTH_URI

ARG VITE_FACEBOOK_AUTH_URI
ENV VITE_FACEBOOK_AUTH_URI=$VITE_FACEBOOK_AUTH_URI

ARG VITE_SOCKET_CLIENT_URL
ENV VITE_SOCKET_CLIENT_URL=$VITE_SOCKET_CLIENT_URL

RUN npm run build

# ---- Stage 2: Serve ----
FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html
COPY .docker/frontend/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
