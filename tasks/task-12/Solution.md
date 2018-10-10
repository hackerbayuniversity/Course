# Task 12 Tutorial
*In this tutorial you will explore Docker and prepare your app for deployment. Docker creates "containers" that isolate your app and allows you to run it anywhere.*

##### 1. Install Docker
* Go to [docker.com](https://www.docker.com) create an account and install Docker in your computer.
* Check if the installation was succesful, on the command line run.
    ```bash
    docker version
    ```
    *You should see something like this*
    
    ![docker version](./images/docker-version.png)
    
###### 2. Dockerize backend
*Now that Docker is installed, let's create a container for the backend of the app.*

* Inside the root folder of your backend create a file called `Dockerfile` and copy the following code.
    ```dockerfile
    FROM node:8
    
    WORKDIR /home/app
    
    COPY package*.json ./
    
    RUN npm install
    
    COPY . .
    
    EXPOSE 3001
    
    CMD ["npm", "start"]
    ```
    *This file is blueprint that Docker will use to build the container.*
    * `FROM` creates a layer of `node.js` from the NODE:8 Docker image.
    * `WORKDIR` creates a directory inside the container.
    * `COPY` adds files from your Docker client’s current directory.
    * `RUN` runs `npm install` in you app.
    * `CMD` specifies what command to run within the container.
    
* Now that you have your app inside a container,  connect the app to a Postgres database, for this you will use `docker-compose.`

    *Compose is a tool for defining and running multi-container Docker applications. You will integrate a postgres container to your current container. In order for compose to work, you need to install it. Click [here](https://docs.docker.com/compose/install/#install-compose) and follow the instructions.*

* Inside the root folder create a file called `docker-compose.yml` and add the following code.
    ```yaml
    version: '3'
    services:
      app:
        container_name: docker-node
        restart: always
        build: .
        ports:
          - '3001:3001'
        links:
          - db
        depends_on: 
          - db
        environment:
          DB_HOST: db
      db:
        container_name: postgres
        image: postgres
        ports:
          - '5432:5432'
        environment:
          POSTGRES_USER: student
          POSTGRES_DB: web_monitor
        volumes:
          - ./init:/docker-entrypoint-initdb.d/
    ```
    *Let's explain what's going on here.*
    * `services` lists all the containers in your app, in this case `app` is the server and `db` the database.
    * `container_name` is the name you give to the container.
    * `restart` tells the app to always restart upon failure.
    * `build` is the path to the build context.
    * `ports` are the ports that will be exposed.
    * `links` links to containers in another service, in this case the database. 
    * `depends_on` makes the container wait for another container to start.
    * `environment` sets environment variables.
    * `image` points to an image in [hub.docker.com](https://hub.docker.com).
    * `volumes` is where you store data for the container to use, in this case the database set up.
    
* The database you get from the Docker image  is empty, without any tables, so the queries will fail. Let's fix that.

* Inside the root folder create a folder called `init`.
* Inside `init` create a file called `init.sql` and add the following code.
    ```SQL
    CREATE USER docker;
    CREATE DATABASE docker;
    GRANT ALL PRIVILEGES ON DATABASE docker TO docker;
    
    CREATE SEQUENCE public.users_id_seq;
    
    ALTER SEQUENCE public.users_id_seq
        OWNER TO student;
    
    CREATE SEQUENCE public.websites_id_seq;
    
    ALTER SEQUENCE public.websites_id_seq
        OWNER TO student;
    
    CREATE TABLE public."Users"
    (
        id integer NOT NULL DEFAULT nextval('users_id_seq'::regclass),
        email character varying(255) COLLATE pg_catalog."default" NOT NULL,
        password character varying(255) COLLATE pg_catalog."default" NOT NULL,
        "createdAt" timestamp with time zone NOT NULL,
        "updatedAt" timestamp with time zone NOT NULL,
        CONSTRAINT users_pkey PRIMARY KEY (id),
        CONSTRAINT users_email_key UNIQUE (email)
    
    )
    WITH (
        OIDS = FALSE
    )
    TABLESPACE pg_default;
    
    ALTER TABLE public."Users"
        OWNER to student;
    
    CREATE TABLE public."Websites"
    (
        id integer NOT NULL DEFAULT nextval('websites_id_seq'::regclass),
        name character varying(255) COLLATE pg_catalog."default" NOT NULL,
        url character varying(255) COLLATE pg_catalog."default" NOT NULL,
        status character varying(255) COLLATE pg_catalog."default" NOT NULL DEFAULT 'online'::character varying,
        "createdAt" timestamp with time zone NOT NULL,
        "updatedAt" timestamp with time zone NOT NULL,
        "UserId" integer,
        CONSTRAINT websites_pkey PRIMARY KEY (id),
        CONSTRAINT "websites_userId_fkey" FOREIGN KEY ("UserId")
            REFERENCES public."Users" (id) MATCH SIMPLE
            ON UPDATE CASCADE
            ON DELETE SET NULL
    )
    WITH (
        OIDS = FALSE
    )
    TABLESPACE pg_default;
    
    ALTER TABLE public."Websites"
        OWNER to student;
    ```
    *If you know SQL this may look familiar, this is all the work sequelize did for us under the hood. Now the container will run this script and set up the tables, relations, etc.*

* Change the url that your app uses to connect to the database. Inside `db/index.js` modify the following code.

    ```javascript
    // Other code
    
    if(process.env.NODE_ENV === 'test') dbUrl = 'postgres://utvdnzdb:hxLot3tUXkVkmG66z7uQlO05f-N1rjun@packy.db.elephantsql.com:5432/utvdnzdb';
    else {
      // Change this variable
      dbUrl = 'postgres://student@postgres/web_monitor';
    }
    
    //Other code
    ```

* Create a `.dockerignore` file and add the following code.
    ```
    node_modules
    ```

* Time to see if this actually works, on the command line run.
    ```bash
    docker-compose up
    ```
*Your backend should be running, start your frontend and see if you can interact with the backend and brand new database.*
    
###### 3. Dockerize Frontend
*Now let's create a container for your front end project, inside the `frontend` folder, follow these instructions.*
* Inside the root folder create a file called `Dockerfile` and add the following code.
    ```dockerfile
    FROM node:8
    
    RUN mkdir /usr/src/app
    WORKDIR /usr/src/app
    
    ENV PATH /usr/src/app/node_modules/.bin:$PATH
    
    COPY package.json /usr/src/app/package.json
    RUN npm install --silent
    RUN npm install react-scripts@1.1.1 -g --silent
    
    # start app
    CMD ["npm", "start"]
    ```
    
*  Now create a file called `docker-compose.yml` and add the following code.
    ```yaml
    version: '3.5'
    
    services:
    
      app:
        container_name: react-app
        build:
          context: .
          dockerfile: Dockerfile
        volumes:
          - '.:/usr/src/app'
          - '/usr/src/app/node_modules'
        ports:
          - '3000:3000'
        environment:
          - NODE_ENV=development
    ```
* Once installed, make aure you are inside the `frontend` folder and in the command line run.
    ```bash
    docker-compose up
    ```
    *The first time you do this it may take some time depending on your connection.*
    
*After all the process are finished your react should be running. It doesn't look like anything changed, but you are running it from a container and not your local machine.*

##### 4. Wrapping up
*Great job, Docker can be a little bit intimidating in the beginning but you did it. You could run both of your containers at the same time but they won't be able to communicate with each other. You will take care of that in the next section.*