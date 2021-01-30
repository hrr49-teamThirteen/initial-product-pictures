
## Photos API usage
### read / get
```sh
/api/photos
/api/photos/id=:id
/api/photos/forproductid/id=:id
/api/photosBlack
/api/photosRed
```
### update / put
```sh
 /api/photos/updatephoto/id=:id
```
#### Body Format JSON
```sh
{
    "product_id": int,
    "photo_url": string,
    "color_id": int(1 or 2)
}
```

### post / create
```sh
/api/photos/createphoto
```
#### Body Format JSON
```sh
{
    "photoURL": string,
    "colorID": int(1 or 2),
    "productID": int,
}
```

### delete
```sh
/api/photos/delete/id=:id
```

## Products API usage
### Read / get
```sh
/api/products1
/api/products/id=:id
```

### update / put
```sh
/api/products/updateproduct/id=:id
```
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
```sh
/api/products/createproduct
```
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
```sh
/api/products/delete/id=:id'
```



