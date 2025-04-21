# Usa la imagen oficial de Node.js
FROM node:22

# Directorio de trabajo
WORKDIR /app

# Copia solo package.json y package-lock.json para cachear instalación
COPY package*.json ./

# Instala dependencias sin devDependencies
RUN npm ci --omit=dev

# Copia el resto del proyecto
COPY . .

# Expone el puerto que usas (por ejemplo el 3000)
EXPOSE 3000

# Comando de arranque de tu API
CMD ["node", "app.js"]
