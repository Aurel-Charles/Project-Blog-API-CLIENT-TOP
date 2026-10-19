import App from "./App";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Posts } from "./pages/Posts";
import { SinglePost } from "./pages/SinglePost";

export const routes = [
    {
      path: "/",
      element : <App/>,
      children: [
        {index : true ,element : <Home/> },
        {path : "posts",element : <Posts/> },
        {path : "posts/:postId",element : <SinglePost/> },
        {path : "login",element : <Login/> },
        {path : "register",element : <h1>Register page</h1> },
        {path : "*",element : <h1>Error page</h1> },
      ]
    }
  ]