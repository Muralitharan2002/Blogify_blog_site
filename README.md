# Blogify

Blogify is a full-featured blog website created using the MERN stack (MongoDB, Express, React, Node.js). This project includes secure JWT authentication, comprehensive CRUD operations, real-time updates with Socket.io, and a customizable text editor for users to create and personalize their own blogs using React Quill editor.

## Features

- **User Authentication**: Secure user authentication using JSON Web Tokens (JWT).
- **Blog Management**: Users can create, read, update, and delete their own blogs.
- **Profile Page**: Users can view their profile information.
- **Likes and Comments**: Users can like and comment on blogs.
- **Real-Time Updates**: Real-time updates for likes and comments using Socket.io.
- **Rich Text Editor**: Create and customize blog posts with a rich text editor using React Quill.

## Tech Stack

- **Frontend**: React.js, React Quill, Tailwind CSS, Socket.io-client
- **Backend**: Node.js, Express.js, Socket.io
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)

  ## Demo

Check out the live demo of the application here:

[Blogify Demo](https://blogify-blog-site.vercel.app/)

Use the following credentials to log in:

- **Email**:
  `david@gmail.com`
- **Password**:
  `david!098`

## Installation

1. **Clone the repository**:

   ```sh
   git clone https://github.com/Muralitharan2002/Blogify_blog_site.git
   ```

2. **Install server dependencies**:

   ```sh
   cd blog_server
   npm install
   ```

3. **Install client dependencies**:
   ```sh
   cd blog_client
   npm install
   ```

## Configuration

1. **Set up environment variables**:

   Create a `.env` file in the `server` directory and add the following:

   MONGO_URI=your_mongodb_connection_string

   JWT_SECRET=your_jwt_secret_key

2. **Run the server**:

   ```sh
   cd blog_server
   npm start
   ```

3. **Run the client**:
   ```sh
   cd blog_client
   npm start
   ```

## Usage

1. **Sign Up / Sign In**:

   - Create a new account or sign in with an existing account.

2. **Create a Blog**:

   - Navigate to the "Create Blog" page.
   - Use the React Quill editor to compose your blog post.
   - Save your blog post to publish it.

3. **View Blogs**:

   - Browse all blogs on the homepage.
   - Click on any blog to read it in detail.

4. **Interact with Blogs:**

   - Like and comment on blog posts in real-time.

5. **Manage Your Blogs**:

   - Visit your profile page to view, edit, or delete your own blogs.
