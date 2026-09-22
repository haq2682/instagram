# ---- Stage 1: Build ----
FROM node:20-alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY index.html vite.config.js tailwind.config.js postcss.config.js ./
COPY public/ ./public/
COPY src/ ./src/

# Relative paths: nginx (see nginx.conf) proxies these to the backend, so they
# work under whatever host/domain the frontend itself is served from.
ENV VITE_GOOGLE_AUTH_URI=/googleAuth/google
ENV VITE_FACEBOOK_AUTH_URI=/facebookAuth/facebook

RUN npm run build

# ---- Stage 2: Serve ----
FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html
COPY .docker/frontend/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
