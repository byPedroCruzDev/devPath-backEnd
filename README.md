# DevPath  Learning programming with us

# Install
To run the API. you have to install all required libraries listed at ``package.json``, it is necessary to execute the following command:
```bash
yarn
```
Then, you have to create an ``.env`` file on the project root, filling all the demanded informations that exist on ``.env.example``. Finally, it is necessary to run the migrations to save them at the database. This is made through the following commands:
``` bash
# to generate the migrations
yarn typeorm:generate

# to run the migrations
yarn typeorm:run
```

# Run
You can test all routes at your computer with Insomnia help. To run the api locally, use the following command:
```bash
yarn dev
```
When you run the application, it is gonna work in ``localhost:3000``. -->

##Routes
