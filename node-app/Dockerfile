# Dockerfile

# Usa una imagen de Node.js como base
FROM node:14-alpine
RUN apk update && apk add --no-cache nano curl
WORKDIR /app
COPY package.json /app

# Instala las dependencias
RUN npm install -g nodemon
RUN npm install

# Copia el resto de la aplicación
COPY . .

# Compila el código TypeScript
RUN npm run build

# Expone el puerto en el que se ejecuta la aplicación
EXPOSE 8080

# Comando para ejecutar la aplicación
CMD ["npm", "start"]
