# Project Name

> Project description

## Related Projects

  - https://github.com/teamName/repo
  - https://github.com/teamName/repo
  - https://github.com/teamName/repo
  - https://github.com/teamName/repo

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)

## Usage

> Some usage instructions

## Photos API usage
### read / get
> /api/photos
> /api/photos/id=:id
> /api/photos/forproductid/id=:id
> /api/photosBlack
> /api/photosRed

### update / put
> /api/photos/updatephoto/id=:id
#### Body Format JSON
```sh
{
    "product_id": int,
    "photo_url": string,
    "color_id": int(1 or 2)
}
```

### post / create
 > /api/photos/createphoto
#### Body Format JSON
```sh
{
    "photoURL": string,
    "colorID": int(1 or 2),
    "productID": int,
}
```

### delete
> /api/photos/delete/id=:id

## Products API usage
### Read / get
> /api/products1
> /api/products/id=:id

### update / put
> /api/products/updateproduct/id=:id
#### Body Format JSON
```sh
{
    "colorid": int,
    "price": DECIMAL(10, 2),
    "reviewscore": DECIMAL(10, 2) (1.00-5.00),
    "questions": int,
    "title": string
}
```

### post / create
> /api/products/createproduct
#### Body Format JSON
```sh
{
    "colorID": int,
    "price": DECIMAL(10, 2),
    "reviewscore": DECIMAL(10, 2) (1.00-5.00),
    "questions": int,
    "title": string
}
```

### delete
> /api/products/delete/id=:id', productsController.deleteProduct







## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm

- Node 6.13.0
- etc

## Development

### Installing Dependencies

From within the root directory:

```sh
npm install -g webpack
npm install
```
1Server start is 'npm run server'
2)Webpack start is 'npm run build'
3)You have to set up the schema before you run the faker seed data.
4)Seed should be 'npm run seed'
5)Port is 1238 for server

-- mysql -u root < schema.sql -pcheeze
