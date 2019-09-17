## Installation

To start the project, clone the repository from GitHub and install the dependencies.

```
$ git clone https://github.com/temitopeadesoji/hackerbay-backend
$ cd yourProjectName
$ npm install
```


## Start the app

```
$ npm start
```
by default, the app will start on `POST 8080`

You will now be able to access the following endpoints 

`[POST] http://localhost:8080/api/login` this endpoint returns a token that should be attached to other calls header

`[POST] http://localhost:8080/jsonpatch` Applys json patch to a object using this [library](https://www.npmjs.com/package/json-patch)

> there will be no access if the token is not passed in the header

`[POST] http://localhost:8080/api/createthumbnail` Generates a thumbnail from a given url by converting the image to buffer directly from the url and then resizing(50x50) from buffer using [lovell sharp library](https://github.com/lovell/sharp). Thumbnails generated is returned as a base64 image

> there will be no access if the token is not passed in the header

## Testing the app

```
$ npm test
```

## File Structure
-app 
    - controllers
        - jsonpatch.js
        - main.js
        - thumbnail-generator.js
        - user.js
    - helpers
        - index.js
    - middleware
        - auth.js
- config
    - index.js
    - prod.js
- logger
    - logs
    - index.js
- public
    - images
- test
    - authenticate.js
    - generatethumbnail.js
    - userjsonpatch.js

