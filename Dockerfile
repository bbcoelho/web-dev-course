FROM node:20-bullseye

WORKDIR /app

COPY package.json .
COPY package-lock.json* .

# Install all dependencies including devDependencies for tests
RUN npm ci

# Install Playwright browsers and system dependencies
RUN npx playwright install --with-deps

COPY ./src ./src
COPY ./tests ./tests
COPY tsconfig.json .
COPY playwright.config.ts .

RUN npm run build

EXPOSE 3000
CMD ["node", "dist/app.js"]