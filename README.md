# Chat 6

This demo shows how to add bldg25-chat to an existing angular 6+ application

- git clone; npm install
- install redis server or obtain redistogo or redislabs server

## Pre-Launch

### Initialize redis database

- Local Redis

```bash
redis-server ./server/database/redis.conf
npm run pre-load-app-data-local # initializes local redis database
```

- RedisToGo

```bash
# obtain redistogo database
# set options in server-config.ts and package.json script
npm run pre-load-app-data # initializes RedisToGo
```

- RedisLabs

```bash
# obtain redislabs database and set options here
DBHOST='redis-10568.c9.us-east-1-2.ec2.cloud.redislabs.com'
DBPORT=10568
DBAUTH=26tEoF1QdEghVi0g4BvfNLekflbXF2gY
ts-node ./server/database/pre-load-app-data.ts --prod --dbHost $DBHOST --dbPort $DBPORT --dbAuth $DBAUTH
# redis-cli -h redis-10568.c9.us-east-1-2.ec2.cloud.redislabs.com -p 10568 -a 26tEoF1QdEghVi0g4BvfNLekflbXF2gY
redis-cli -h $DBHOST -p $DBPORT -a $DBAUTH
```

## Launch Scenarios

- Local Devlopment with RedisToGo Server

```bash
redis-cli -h catfish.redistogo.com -p 9782 -a 63cf95b9b1a52f2fe6d0a9c5a67fa527  # optional
# cntl-shft-b to build server code in vs-code
npm run start-server
npm start
```

- Local development with debug server with RedisToGo Server

```bash
redis-cli -h catfish.redistogo.com -p 9782 -a 63cf95b9b1a52f2fe6d0a9c5a67fa527 # optional
# Launch server with vs-code debugger
npm start
```

- Local development with local redis server

```bash
redis-server ./server/database/redis.conf
redis-cli -p 6379 -a this_should_be_a_secret_authcode # optional
npm run start-server-local
npm start
```

- Local development with debug server with local redis server

```bash
redis-server ./server/database/redis.conf
redis-cli -p 6379 -a this_should_be_a_secret_authcode  # optional
# Launch server with vs-code debugger
npm run start-server-local  # move local options to debug launch in vs code
npm start
```

- Local test of prod

```bash
DBHOST='redis-10568.c9.us-east-1-2.ec2.cloud.redislabs.com'
DBPORT=10568
DBAUTH=26tEoF1QdEghVi0g4BvfNLekflbXF2gY
redis-cli -h $DBHOST -p $DBPORT -a $DBAUTH # optional
npm run build # to build demo app angular code and server code
# cntl-shft-b to build only server code in vs-code
# npm run build-server to build only server code
node dist/server.js --secure --prod --dbHost $DBHOST --dbPort $DBPORT --dbAuth $DBAUTH
```

## TODO: Urgent

1.  type files frisby and node-fetch were modified - node fetch change reverted

/home/rob/Documents/Training-GreenLanternOnly/bldg25-chat-6/bldg25-chat-demo/node_modules/@types/node-fetch/index.d.ts
/home/rob/Documents/Training-GreenLanternOnly/bldg25-chat-6/bldg25-chat-demo/node_modules/@types/frisby/index.d.ts
(line 81)export function formData(): FormData // ********\*\********* modified

2.  Remove redis auth keys from code except local - auth keys only in README file for now
3.  Create build script for use by Heroku OR decide to build locally and push to Heroku

## TODO: Normal

1.  Deploy to Heroku
2.  Minify and/or uglify server code
3.  Delete images in server folder and remove image server code
4.  Add gmail oath 2.0 signup OR okta login option
5.  Final product card if it is alone stretches accross the screen
6.  Create instructions on how to use this demo app
7.  Signup should add snack bar message when it fails

### Deployment Options

1.  Heroku - custom backend
2.  Others

#### Heroku

1.  Create account on Heroku
2.  Download Heroku cli
3.  Setup process.env.PORT .REDISHOST etc to configure redisdb and server.ts

```bash
heroku --version
heroku login
heroku create  # gets a random name
heroku open # opens address in chrome
# move angular/cli and angular/compiler-cli to dependencies for use by heroku
# move typescript
# move ts-node (maybe not needed if server.ts is compiled)
# script section
"postinstall": "ng build --prod"
"postinstall": "ng build --prod && ./node_modules/typescript/bin/tsc ./server/server.ts"
npm i express
# change start script to run node server; create dev start script for existing start
"start": "./node_modules/.bin/ts-node ./server/server.ts"
# or maybe compile server.ts and then run it
"start": "./node_modules/typescript/bin/tsc ./server/server.ts && node server.js"

git push heroku master  # push changes to heroku
heroku open # shortcut to go to webpage

# good idea - add engines to package.json
"engines": {
  "node": "x.x.x",
  "npm": "x.x.x"
}
```

#### Setup on Github

```bash
# - create repo
# - git remote add origin...
git push origin master
npm i -g angular-cli-ghpages
ng build --prod --base-href="https://<username>.github.io/<repository>/" # trailing / important
ngh --no-silent # maybe run with sudo
```

## Install Redis on Linux Mint

1.  download redis tar ball from [Redis.io](https://redis.io/) and unzip
2.  make
3.  make test
4.  cd /home/rob/redis-4.0.6/src/
5.  Add redis to your path so scripts can find it
6.  npm run start-redisdb
7.  redis-cli
