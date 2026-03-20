**Blogify**
A fully functional backend for a blogging application built with Node.js, Express, and MongoDB, supporting authentication, authorization, and interactive features like likes and comments.

Features

1 - Authentication & Authorization

- User Signup & Login
- Password hashing using bcrypt
- Role-based access (User & Admin)
- Admin can manage all blogs
- Users can only modify their own blogs

2 - Blog Management (CRUD)

- Create Blog
- Read All Blogs
- Read User’s Blogs
- Edit Blog
- Delete Blog

3 - Interaction Features

- Like / Unlike Blogs
- Comment on Blogs
- View comments on each blog

4 - Security & Access Control

- Protected routes using middleware
- Authorization checks for edit/delete
- Clean API structure

5 - Tech Stack

- Backend: Node.js, Express.js
- Database: MongoDB
- Authentication: JWT (JSON Web Token)
- Password Hashing: bcrypt

Project Structure - 

├── controllers
├── models
├── routes
├── middlewares
├── config
├── app.js / server.js


## 📸 Screenshots

### Signup API
![Signup](./assets/signup.png)

### Create Blog
![Create Blog](./assets/home.png)

### All blog Feature
![All blogs](./assets/allblogs.png)

### View blog Feature
![View blogs](./assets/view.png)

### Edit blog Feature
![Edit blogs](./assets/edit.png)

## 🎥 Demo

![Demo](./assets/gitForBloggingapp.gif)

**Installation & Setup**

1. Clone the repository
 
git clone https://github.com/Harshal135701/Blogify.git

2. Install dependencies

npm install

3. Setup environment variables

Create a .env file

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

4. Run the server
npm start

**What I Learned**

- Building REST APIs from scratch
- Implementing authentication & authorization
- Designing scalable backend structure
- Handling real-world features like likes & comments
- Writing clean and modular code

**Future Improvements**

- Pagination & Search
- Image upload (Cloud storage)
- Rate limiting & security enhancements
- Deployment with Nginx

**Author**

Harshal Borse