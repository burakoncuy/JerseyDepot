# NowJersey

NowJersey is a platform that connects sports enthusiasts with buyers and sellers, offering a wide range of jerseys across multiple sport categories. Whether you're looking to buy, sell, or maybe trade, NowJersey makes it easy to find the perfect jersey while fostering a community of sports fans.

# Live Link

[NowJersey](https://nowjersey.onrender.com/)

## Tech Stack
### Frameworks and Libraries
![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54) ![Flask](https://img.shields.io/badge/flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=white) ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white) ![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white) ![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)

 ### Database:
 ![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
  
 ### Hosting:
 ![Render](https://img.shields.io/badge/Render-%46E3B7.svg?style=for-the-badge&logo=render&logoColor=white)


# Index
- [Database Schema][database-schema]
- [Future List][future-list]
- [User Stories][user-stories]
- [Wireframes][wireframes]

<!-- Reference-style link definitions -->
[database-schema]: https://github.com/burakoncuy/NowJersey/wiki/DATABASE-SCHEMA
[future-list]: https://github.com/burakoncuy/NowJersey/wiki/MVP's-FEATURE-LIST
[user-stories]: https://github.com/burakoncuy/NowJersey/wiki/USER-STORIES
[wireframes]: https://github.com/burakoncuy/NowJersey/wiki/WIREFRAMES


# Endpoints



## User Auth Sign in and Sign Up

Users can log into an existing account or sign up and create a new account. Users can also test the site with the Demo Login feature.
![Splash page](./react-vite/public/splash.png)
![Demo-user page](./react-vite/public/demo-user.png)
![Login page](./react-vite/public/login.png)
![Sign up page](./react-vite/public/signup.png)

## Users can view all listing items and make search or filtering based on categories, price, size, status,condition, store and add to Cart.

![All items page](./react-vite/public/user-landing.png)

## Users can create , update and delete their own items.
![Manage items](./react-vite/public/manage.png)
![Create an item](./react-vite/public/create.png)
![Update an item](./react-vite/public/update.png)

## Users can view item's details can add to cart or add to favorite and add a review.

![Item detail](./react-vite/public/detail.png)

## Users can view their favorites and remove them from favorites

![Item detail](./react-vite/public/favorites.png)

## Users can list their reviews and update or delete them .

![Manage reviews](./react-vite/public/review.png)
![Update review](./react-vite/public/reviewupdate.png)

## Cart

Users can add items by clicking on add to cart and view, remove items and check out in the shopping cart.

![View user's cart](./react-vite/public/cart.png)

## Order

Users can view their orders , cancel them before shipped or change the status of the item that they sold .

![Manage order](./react-vite/public/orders.png)

### Auth Endpoints

Method | Endpoint | Description | Request Body (JSON) | Response
--------|---------|-------------|--------------------- |---------
**GET** | `/auth/` | Authenticates a user. | None | **If authenticated:** `{ "id": 1, "username": "user1", "email": "user1@example.com" }`<br>**If not authenticated:** `{ "errors": { "message": "Unauthorized" } }` (401)
**POST** | `/auth/login` | Logs a user in. | `{ "email": "user1@example.com", "password": "password123" }` | **If successful:** `{ "id": 1, "username": "user1", "email": "user1@example.com" }`<br>**If failed:** Form errors (401)
**GET** | `/auth/logout` | Logs a user out. | None | `{ "message": "User logged out" }`
**POST** | `/auth/signup` | Creates a new user and logs them in. | `{ "username": "user1", "email": "user1@example.com", "password": "password123" }` | **If successful:** `{ "id": 1, "username": "user1", "email": "user1@example.com" }`<br>**If failed:** Form errors (401)
**GET** | `/auth/unauthorized` | Returns unauthorized JSON. | None | `{ "errors": { "message": "Unauthorized" } }` (401)

---

### Item Endpoints

Method | Endpoint | Description | Request Body (JSON) | Response
--------|---------|-------------|---------------------|----------
**GET** | `/api/items/` | Get all items. | None | `[ { "id": 1, "name": "Jersey", "price": 50.99, ... }, ...]`
**GET** | `/api/items/<int:id>` | Get a specific item by ID. | None | `{ "id": 1, "name": "Jersey", "price": 50.99, ... }`<br>or `{ "message": "Item not found" }` (404)
**GET** | `/api/items/current` | Get items owned by the current user. | None | `{ "items": [ { "id": 1, "name": "Jersey", ... }, ...] }`<br>or `{ "message": "No items found" }`
**POST** | `/api/items/new` | Create a new item. | `{ "name": "Jersey", "description": "A cool jersey", "price": 50.99, "category": "Sports", "condition": "NEW", "size": "M", "item_status": "available", "image": file }` | `{ "id": 1, "name": "Jersey", ... }` (201)<br>or `{ "errors": { "name": "This field is required" } }` (400)
**PUT** | `/api/items/<int:id>/update` | Update an item. | `{ "name": "Updated Jersey", "description": "Updated description", "price": 55.99, "category": "Sports", "condition": "NEW", "size": "M", "item_status": "available", "image": file }` | `{ "id": 1, "name": "Updated Jersey", ... }` (200)<br>or `{ "error": "Item not found" }` (404)<br>or `{ "error": "Unauthorized to update this item" }` (403)
**DELETE** | `/api/items/<int:id>/delete` | Delete an item. | None | `{ "message": "Item successfully deleted" }` (200)<br>or `{ "errors": ["Item not found"] }` (404)<br>or `{ "error": "Unauthorized to delete this item" }` (403)

---

### Review Endpoints

Method | Endpoint | Description | Request Body (JSON) | Response
--------|---------|-------------|---------------------|----------
**GET** | `/api/items/<int:id>/reviews` | Get reviews for a specific item. | None | `[ { "id": 1, "rating": 5, "comment": "Great product!", "user_name": "JohnDoe" }, ...]` (200)<br>or `{ "message": "No reviews yet" }` (404)
**POST** | `/api/items/<int:id>/reviews` | Add a review to an item. | `{ "rating": 5, "comment": "Great product!" }` | `{ "id": 1, "rating": 5, "comment": "Great product!", "user_id": 2, ... }` (201)<br>or `{ "message": "Item not found" }` (404)<br>or `{ "errors": { "rating": "This field is required" } }` (400)
**PUT** | `/reviews/<int:id>` | Update a review (only by the user who created it). | `{ "comment": "Updated comment", "rating": 5 }` | `{ "id": 1, "comment": "Updated comment", "rating": 5, ... }` (200)<br>or `{ "message": "Review not found" }` (404)<br>or `{ "message": "You can only update your own reviews" }` (403)
**DELETE** | `/reviews/<int:id>` | Delete a review (only by the user who created it). | None | `{ "message": "Review deleted successfully" }` (200)<br>or `{ "message": "Review not found" }` (404)<br>or `{ "message": "Unauthorized" }` (403)

---

### Cart Endpoints

Method | Endpoint | Description | Request Body (JSON) | Response
--------|---------|-------------|---------------------|----------
**GET** | `/cart/` | View current user's cart. | None | `{ "message": "Your cart is empty." }` (200)<br>or `[ { "id": 1, "user_id": 1, "item_id": 1, "quantity": 2, "item": { "id": 1, "name": "Item 1", ... } }, ...]` (200)
**POST** | `/cart/` | Add item to the cart. | `{ "item_id": 1, "quantity": 2 }` | `{ "id": 1, "user_id": 1, "item_id": 1, "quantity": 2, ... }` (201)<br>or `{ "message": "Item not found." }` (404)

---

### Order Endpoints

Method | Endpoint | Description | Request Body (JSON) | Response
--------|---------|-------------|---------------------|----------
**GET** | `/orders/` | List orders (buyer or seller). | None | `[ { "id": 1, "user_id": 1, "total": 100.0, "order_status": "PENDING", "order_items": [ { "id": 1, "item_id": 1, "quantity": 2, "price": 50.0, "item": { "id": 1, "name": "Item 1", ... } } ] } ]` (200)
**POST** | `/orders/checkout` | Create a new order (checkout). | None | `{ "order": { "id": 1, "user_id": 1, "total": 100.0, "order_status": "PENDING", ... }, "sold_items": [ { "id": 1, "name": "Item 1", ... } ] }` (201)<br>or `{ "message": "Your cart is empty." }` (400)


# Feature List
1. Advanced search options to filter items by category, store , condition , size , availability
2. 

# Feature Implementation Goals
1. ChatHelpBot (websockets)
2. Diverse Payment System Integration
3. Real-time notifications
