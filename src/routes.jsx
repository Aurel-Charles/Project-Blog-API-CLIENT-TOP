import App from "./App";
import { Posts } from "./pages/Posts";
import { SinglePost } from "./pages/SinglePost";

export const routes = [
    {
      path: "/",
      element : <App/>,
      children: [
        {index : true ,element : <h1>Home page</h1> },
        {path : "posts",element : <Posts/> },
        {path : "posts/:postId",element : <SinglePost/> },
        {path : "login",element : <h1>Login page</h1> },
        {path : "register",element : <h1>Register page</h1> },
        {path : "*",element : <h1>Error page</h1> },
      ]
    }
  ]