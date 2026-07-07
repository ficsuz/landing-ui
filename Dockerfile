# Stage 1: Builder
FROM node:22-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
# Increase Node memory limit to avoid OOM kill during build on constrained runners
ENV NODE_OPTIONS="--max-old-space-size=4096"
RUN npm run build

# Stage 2: Nginx Web Server
FROM nginx:alpine
# Clean default html files
RUN rm -rf /usr/share/nginx/html/*
# Copy build output
COPY --from=builder /app/dist /usr/share/nginx/html
# Copy custom Nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
