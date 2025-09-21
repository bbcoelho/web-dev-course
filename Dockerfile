FROM node:20-alpine

# Install dependencies for Playwright browsers
RUN apk add --no-cache \
    chromium \
    nss \
    freetype \
    freetype-dev \
    harfbuzz \
    ca-certificates \
    ttf-freefont

# Set Playwright to use installed Chromium
ENV PLAYWRIGHT_BROWSERS_PATH=/usr/bin/chromium-browser
ENV PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1

WORKDIR /app

COPY package.json .
COPY package-lock.json* .

# Install all dependencies including devDependencies for tests
RUN npm ci

COPY ./src ./src
COPY ./tests ./tests
COPY tsconfig.json .
COPY playwright.config.ts .

RUN npm run build

EXPOSE 3000
CMD ["node", "dist/app.js"]