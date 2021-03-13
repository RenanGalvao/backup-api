FROM node:lts-alpine AS deps

WORKDIR /usr/src/backup
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile


FROM node:lts-alpine  AS builder

WORKDIR /usr/src/backup
COPY --from=deps /usr/src/backup/node_modules ./node_modules
COPY --from=deps /usr/src/backup/package.json ./
COPY . .
RUN yarn build


FROM node:lts-alpine AS runner

WORKDIR /usr/src/backup
VOLUME /opt/backup
COPY --from=builder /usr/src/backup/dist ./dist
COPY --from=builder /usr/src/backup/node_modules ./node_modules
COPY --from=deps /usr/src/backup/package.json ./
EXPOSE 3000

ARG TZ=America/Sao_Paulo
ENV TZ=$TZ

CMD ["yarn", "start:prod"]