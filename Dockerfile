FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./
COPY src ./src

RUN npm install -g typescript && npm install
RUN npm run build

ENV NODE_ENV=production
USER node
ENTRYPOINT ["node", "build/index.js"]
