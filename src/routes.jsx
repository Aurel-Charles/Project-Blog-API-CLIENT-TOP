import App from "./App";

export const routes = [
    {
      path: "/",
      element : <App/>,
      children: [
        {index : true ,element : <h1>Home page</h1> },
        {path : "posts",element : <h1>Posts page</h1> },
        {path : "posts/:postId",element : <h1>Single post (posts/:postId) page</h1> },
        {path : "login",element : <h1>Login page</h1> },
        {path : "register",element : <h1>Register page</h1> },
        {path : "*",element : <h1>Error page</h1> },
      ]
    }
  ]