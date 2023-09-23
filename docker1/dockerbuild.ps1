
DOCKER_BUILDKIT=1 docker build -t projectcodeug.azurecr.io/metadent-patients:latest -f ./docker/Dockerfile .
$env:DOCKER_BUILDKIT=1; docker build -t projectcodeug.azurecr.io/metadent-patients:latest -f ./docker/Dockerfile .

# az acr build --registry projectcodeprd01 --file Dockerfile .

# docker run --rm -d  -p 8888:8888/tcp -e BackendUrl=https://dev.api.metadent.nl/api projectcodeug.azurecr.io/metadent-patients:latest 
docker run --rm  -p 8888:80/tcp -e BackendUrl=https://expo.api.metadent.nl/api projectcodeug.azurecr.io/metadent-patients:latest

docker exec -it c4 /bin/sh
docker exec -it c4 /bin/bash

# DOCKER_BUILDKIT=1  docker build -t projectcodeug.azurecr.io/metadent-backend -f ./docker/Dockerfile .
# docker run --rm -d  -p 8888:8888/tcp  projectcodeprd01.azurecr.io/metadent-backend:latest
# docker exec -it d49a /bin/bash

apt update
apt install wget -y
wget http://archive.ubuntu.com/ubuntu/pool/main/g/glibc/multiarch-support_2.27-3ubuntu1.4_amd64.deb
apt install ./multiarch-support_2.27-3ubuntu1.4_amd64.deb
ACCEPT_EULA=Y apt-get install -y msodbcsql17
ACCEPT_EULA=Y apt-get install -y mssql-tools

apt install unixodbc-dev -y

pecl install sqlsrv
pecl install pdo_sqlsrv
./usr/local/lib/php/extensions/no-debug-non-zts-20180731/pdo_sqlsrv.so

/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
/tmp/pear/temp/sqlsrv/shared/xplat.h:30:10: fatal error: sql.h: No such file or directory


echo extension=sqlsrv.so >> /usr/local/etc/php/php.ini-production
echo extension=pdo_sqlsrv.so >> /usr/local/etc/php/php.ini-production

mv "/usr/local/etc/php/php.ini-production" "/usr/local/etc/php/php.ini"

curl -v http://localhost:8888/

DB_CONNECTION=sqlsrv
DB_HOST=xperters-local.database.windows.net
DB_PORT=1433
DB_DATABASE=rapidboda-local
DB_USERNAME=rapidboda-local-01
DB_PASSWORD="FcvNd3YHIYZr3NA5L7FIhDQONkKu5t6ogJHLt+s2UJU="

# plain text
BUILDKIT_PROGRESS=plain

docker run -d  -p 8888:8888/tcp \
    -e DB_CONNECTION=sqlsrv \
    -e DB_HOST=xperters-local.database.windows.net \
    -e DB_PORT=1433 \
    -e DB_DATABASE=rapidboda-local \
    -e DB_USERNAME=rapidboda-local-01 \
    -e DB_PASSWORD="FcvNd3YHIYZr3NA5L7FIhDQONkKu5t6ogJHLt+s2UJU=" projectcodeprd01.azurecr.io/metadent-backend:latest

    az webapp create-remote-connection --subscription 5ab6f993-e7ec-49e3-934b-72e08d30625b --resource-group rapidboda-dev-rg -n rapidboda-dev-01 &
