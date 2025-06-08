# --- Builder faza: zgradi React aplikacijo ---
FROM node:18-alpine AS builder

WORKDIR /app

# 1) Kopiraj package.json in package-lock.json
COPY package*.json ./

# 2) Namesti vse odvisnosti (dependencies + devDependencies)
RUN npm install

# 3) Kopiraj konfiguracijo in javne vire
COPY webpack.config.js ./
COPY public ./public

# 4) Kopiraj aplikacijsko kodo in zgradi
COPY src ./src
RUN npm run build     # kliče "webpack --mode production", izhod je v ./dist

# --- Runner faza: streži statične datoteke z Nginx ---
FROM nginx:stable-alpine AS runner

# (po potrebi custom Nginx config)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Prekopiraj zgrajene datoteke
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
