#!/bin/bash

# Inicia o servidor React
cd /app/react-app
npm start &

# Inicia a aplicação Java
java -jar /app/app.jar
