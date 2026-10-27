import App from "./App";
import { Account } from "./pages/Account";
import { AccountDeleted } from "./pages/AccountDeleted";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { NotFound } from "./pages/NotFound";
import { Posts } from "./pages/Posts";
import { Register } from "./pages/Register";
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
        {path : "register",element : <Register/> },
        {path : "account",element : <Account/> },
        {path : "account-deleted",element : <AccountDeleted/> },
        {path : "*",element : <NotFound/> },
      ]
    }
  ]