# 🐳 Uporabi uradno Node.js LTS sliko
FROM node:18

# Nastavi delovno mapo v kontejnerju
WORKDIR /app

# Kopiraj package.json in package-lock.json
COPY package.json package-lock.json ./

# Namesti odvisnosti
RUN npm install

# Kopiraj celotno kodo aplikacije
COPY . .

# Nastavi okoljske spremenljivke
ENV PORT=5001
ENV MONGO_URI=mongodb+srv://admin:Trafelca123@pts.egfyo.mongodb.net/users?retryWrites=true&w=majority
ENV JWT_SECRET=mysecretkey

# Expose porta 5001 za povezavo s storitvijo
EXPOSE 5001

# Zaženi aplikacijo
CMD ["npm", "start"]
