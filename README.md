# 🍽️ Aam Backend API

![Node.js](https://img.shields.io/badge/Node.js-Enabled-brightgreen?logo=node.js)
![Express](https://img.shields.io/badge/Express.js-Backend-lightgrey?logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-Connected-brightgreen?logo=mongodb)
![Cloudinary](https://img.shields.io/badge/Cloudinary-Image%20Storage-blue?logo=cloudinary)
![JWT](https://img.shields.io/badge/JWT-Auth-orange)

This is the backend for the **Aam** food web app — powering both the customer website and the admin panel. It provides RESTful APIs for authentication, products, categories, orders, image uploads, and user management.

---

## 📁 Project Structure

Aam-Backend/ │ ├── config/ # DB & Cloudinary configs ├── controllers/ # Business logic ├── middleware/ # Auth, error handling, etc. ├── models/ # Mongoose schemas ├── routes/ # API route definitions ├── uploads/ # Static file serving (fallback) ├── utils/ # Helper functions ├── server.js # Entry point └── .env # Environment variables

---

## 🔧 Technologies Used

- **Node.js**
- **Express.js**
- **MongoDB + Mongoose**
- **JWT for authentication**
- **Cloudinary + Multer for image handling**
- **dotenv, cors, morgan, express-async-handler**

---

## 🔐 API Features

- 🔑 **User Auth** – login, register
- 📦 **Product APIs** – CRUD, image upload
- 📂 **Category APIs** – CRUD
- 🧾 **Order APIs** – Create, list, update status
- 🌩️ **Image Uploads** – Cloudinary integrated
- 🛡️ **Admin Routes** – Protected with JWT middleware

---

## 🔌 Environment Setup

Create a `.env` file in the root:

```env
PORT=5000
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
🚀 Getting Started
bash
Copy
Edit
git clone https://github.com/your-username/Aam-Backend.git
cd Aam-Backend
npm install
npm run dev
🌍 Deployment
The API is deployed on Vercel:
https://food-mern-api.vercel.app/

