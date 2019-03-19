# 🔄 source-reload [![Build Status](https://travis-ci.com/erdembircan/source-reload.svg?token=uZBBgzqyPXwqVmSropq2&branch=master)](https://travis-ci.com/erdembircan/source-reload) [![Coverage Status](https://coveralls.io/repos/github/erdembircan/source-reload/badge.svg?branch=master)](https://coveralls.io/github/erdembircan/source-reload?branch=master)
> client side browser reloader for server side changes

## Why
Sometimes you may want to reflect the changes on your server/api endpoints to your front-end development. This package gives you the ability to reload your connected frontend browser on server side changes. It's change detection agnostic (whether you use node.js `watch` or wonderful `nodemon` package).

## Usage
Please checkout out the `example` folder for sample usage. 
```bash
# start example server
npm run example:server
```

## API
### source-reload
main object consists of a middleware and frontend client
- **type**: `object`
- **props**: 
    - `SourceReloadMiddleware`: A middleware for Node.js server
      - **type**: `function` 
      - **arguments**:
        - `req`: request object
          - **type**: `object`
        - `res`: response object
          - **type**: `object`
    - `SourceReloadClient`: Frontend client
      - **type**: `function` 
      - **arguments**:
        - `url`: url adress for backend stream connection
          - **type**: `string`

## Contribution
Please feel free to contact for any bugs/updates.

## Licence
[MIT](http://opensource.org/licences/MIT)

Erdem Bircan (c) 2019-present
