# Para construir imagen:
# - ubicado en la raiz del proyecto usar:
#   docker build -t interview-coding-api .
#   docker run interview-coding-api
FROM node:8.11.3-alpine

WORKDIR ./app

COPY ["package.json", "app.js", "./"]

RUN touch startup.sh && \
    echo "#!/bin/bash" >> startup.sh && \
    echo "npm run start" >> startup.sh && \
	  chmod +x startup.sh

RUN npm i --quiet --only=prod

COPY app ./app

ENTRYPOINT ["sh", "./startup.sh"]
