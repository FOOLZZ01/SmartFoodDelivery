# 1) Builder faza
FROM node:18-alpine AS builder
WORKDIR /app

# Namesti vse odvisnosti
COPY package*.json ./
RUN npm install

# Copy Webpack in public
COPY webpack.config.js ./
COPY public ./public

# Copy izvorno kodo in build
COPY src ./src
RUN npm run build

# 2) Runner faza
FROM nginx:stable-alpine AS runner
# COPY nginx.conf /etc/nginx/conf.d/default.conf   # po želji

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
