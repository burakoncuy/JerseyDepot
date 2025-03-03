# NowJersey

NowJersey is a platform that connects sports enthusiasts with buyers and sellers, offering a wide range of jerseys across multiple sport categories. Whether you're looking to buy, sell, or maybe trade, NowJersey makes it easy to find the perfect jersey while fostering a community of sports fans.

# Live Link

https://nowjersey.onrender.com/

## Tech Stack
### Frameworks and Libraries
![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54) ![Flask](https://img.shields.io/badge/flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=white) ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white) ![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white) ![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)

 ### Database:
 ![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
  
 ### Hosting:
 ![Render](https://img.shields.io/badge/Render-%46E3B7.svg?style=for-the-badge&logo=render&logoColor=white)

# Index
[Visit the Wiki](https://github.com/burakoncuy/NowJersey/wiki)




<!-- Reference-style link definitions -->
[database-schema]: https://github.com/Azadcelik/project-trial/wiki/Database-Schema
[future-list]: https://github.com/Azadcelik/project-trial/wiki/Future-List
[user-stories]: https://github.com/Azadcelik/project-trial/wiki/User-Stories
[wireframes]: https://github.com/Azadcelik/project-trial/wiki/Wireframes

# Landing Page

![NowJersey-project](/react-vite/public/gif/NowJersey-project-ezgif.com-video-to-gif-converter.gif)


# Endpoints


## Auth

| Request | Purpose | Return Value |
| ------- | ------- | ------------ |
| `GET /api/auth/` | Checks current user session | `{'id': INT, 'username': STRING, 'email': STRING}` |
| `POST /api/auth/unauthorized` | Handles unauthorized access | `{'errors': ARRAY[STRINGS]}` |
| `POST /api/auth/signup` | Processes new user registration | `{'id': INT, 'username': STRING, 'email': STRING}` |
| `POST /api/auth/login` | Attempts to log in a user | `{'id': INT, 'username': STRING, 'email': STRING}` |
| `POST /api/auth/logout` | Logs out the current user | `{'message': STRING}` |


## Product

| Request | Purpose | Return Value |
| ------- | ------- | ------------ |
| `GET /api/products/:id` | Retrieves a specific product by ID | `{"id": INT, "user_id": INT, "image": STRING, "make": STRING, "mileage": INT, "model": STRING, "year": INT, "price": FLOAT, "type": STRING,"created_at":DATE}`|
| `POST /api/products` | Creates a new product  | `{"id": INT, "user_id": INT, "image": STRING, "make": STRING, "mileage": INT, "model": STRING, "year": INT, "price": FLOAT, "type": STRING, "created_at": DATE}` |
| `PUT /api/products/:id` | Updates a specific product by ID  | `{"id": INT, "user_id": INT, "image": STRING, "make": STRING, "mileage": INT, "model": STRING, "year": INT, "price": FLOAT, "type": STRING}` |
| `DELETE /api/products/:id` | Deletes a specific product by ID  | `{"message": "successfully deleted"}` |


## Review

| Request | Purpose | Return Value |
| ------- | ------- | ------------ |
| `GET /api/products/:id/reviews` | Retrieves all reviews for a specific product | `[{ "review": {"id": INT, "user_id": INT, "product_id": INT, "text_body": STRING, "star_rating": INT, "created_at": DATE}, "product":{Product details}, "user": {User details} }]` |
| `POST /api/products/:id/new-review` | Adds a new review to a specific product (Auth required)  | `{ "review": {"id": INT, "user_id": INT, "product_id": INT, "text_body": STRING, "star_rating": INT, "created_at": DATE}, "product": {Product details}, "user": {User details} }` |
| `DELETE /api/reviews/:id` | Deletes a specific review by ID (Auth required)  | `{"message": "Review successfully deleted"}` |


## Shopping Cart

| Request | Purpose | Return Value |
| ------- | ------- | ------------ |
| `POST /api/shopping_cart/add-to-cart/<int:id>` | Adds a product to the shopping cart (Auth required) | `{ "productDetails": {"id": INT, "name": STRING, "model": STRING, "year": INT, "price": FLOAT, "quantity": INT} }` |
| `GET /api/shopping_cart/` | Retrieves the current user's shopping cart (Auth required) | `[{ "id": INT, "product_id": INT, "image": STRING, "name": STRING, "price": FLOAT, "model": STRING, "year": INT, "quantity": INT }]`|
| `DELETE /api/shopping_cart/<int:id>` | Removes an item from the shopping cart (Auth required) | `{"message": "successfully deleted"}` |


## Favorites

| Request | Purpose | Return Value |
| ------- | ------- | ------------ |
| `POST /api/products/:id/add-favorite` | Adds a product to favorites (Auth required) | `{ "id": INT, "user_id": INT, "image": STRING, "make": STRING, "mileage": INT, "model": STRING, "year": INT, "price": FLOAT, "type": STRING, "created_at": DATE }` |
| `GET /api/products/favorites` | Retrieves the user's favorite products (Auth required) | `[{ "id": INT, "user_id": INT, "image": STRING, "make": STRING, "mileage": INT, "model": STRING, "year": INT, "price": FLOAT, "type": STRING, "created_at": DATE }]` |
| `DELETE /api/products/:id/remove-favorite` | Removes a product from favorites (Auth required) | `{"message": "product removed from your favorites"}` |


## Product Images

| Request | Purpose | Return Value |
| ------- | ------- | ------------ |
| `POST /api/product_images/<int:id>/images` | Adds multiple images to a product (Auth required) | `{ "images": [{"product_id": INT, "url": STRING, "created_at": DATE}] }` |
| `GET /api/product_images/<int:id>/images` | Retrieves all images for a specific product | `{ "images": [{"product_id": INT, "url": STRING, "created_at": DATE}] }` |
| `DELETE /api/product_images/<int:id>/images/delete` | Deletes all images of a product | `{"message": "Successfully deleted"}` |


## Order

| Request | Purpose | Return Value |
| ------- | ------- | ------------ |
| `POST /api/orders` | Creates a new order (Auth required) | `{ "order_id": INT, "total_price": FLOAT }` |
| `GET /api/orders` | Retrieves the order history of the current user (Auth required) | `[{ "order_id": INT, "order_date": DATE, "total_price": FLOAT, "country": STRING, "full_name": STRING, "street_address": STRING, "apartment": STRING, "city": STRING, "zip_code": STRING, "items": [{"id": INT, "product_id": INT, "quantity": INT, "price": FLOAT, "name": STRING, "model": STRING, "year": INT, "image": STRING}] }]` |

# Feature List
1. Advanced search options to filter cars by make, model, year, price, etc.
2. Responsive Design

# Feature Implementation Goals
1. Enhanced Search Functionality
2. Diverse Payment System Integration
3. Develop a feedback feature where users can include photos in their car reviews
