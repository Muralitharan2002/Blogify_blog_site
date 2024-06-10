# Blogify

Blogify is a comprehensive blog platform developed with the MERN stack (MongoDB, Express.js, React.js, Node.js). It utilizes JWT for secure authentication, enabling users to view all blogs, create their own posts using the React Quill editor, and manage their profiles and blog entries. The user interface is designed with Tailwind CSS for a modern and responsive experience.

## Features

- **User Authentication**: Secure user authentication using JSON Web Tokens (JWT).
- **Blog Management**: Users can create, read, update, and delete their own blogs.
- **Profile Page**: Users can view their profile information.
- **Rich Text Editor**: Implemented using React Quill for creating and editing blogs.
- **Responsive Design**: Built with Tailwind CSS to ensure a responsive and modern user interface.

## Tech Stack

- **Frontend**: React.js, React Quill, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)

  ## Demo

Check out the live demo of the application here:

[Blogify Demo](https://blogify-blog-site.vercel.app/)

Use the following credentials to log in:

- **Email**:
  ```david@gmail.com```
  
- **Password**:
  ```david!098```

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

3. **Run the server**:
    ```sh
    cd blog_server
    npm start
    ```

4. **Run the client**:
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

4. **Manage Your Blogs**:
    - Visit your profile page to view, edit, or delete your own blogs.
