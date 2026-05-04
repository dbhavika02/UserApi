FROM node:24.15.0

WORKDIR /app

# Copy only package files first (better caching)
COPY package*.json ./

RUN npm install

# Now copy rest of the code
COPY . .

EXPOSE 5000

CMD ["node", "index.js"]