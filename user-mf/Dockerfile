# 1) Builder faza
FROM node:18-alpine AS builder
WORKDIR /app

# Copy package files & install ALL deps
COPY package*.json ./
RUN npm install

# Copy konfiguracijo in javne vire
COPY webpack.config.js ./
COPY public ./public

# Copy izvorno kodo in build
COPY src ./src
RUN npm run build

# 2) Runner faza
FROM nginx:stable-alpine AS runner

# (opcijsko: custom nginx.conf)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Prekopiraj build artefakte
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
