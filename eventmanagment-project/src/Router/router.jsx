import {
  createBrowserRouter,
} from "react-router-dom";
import Mainlayout from "../Mainlayout";
import Home from "../Pages/Home";
import AddEvent from "../Pages/AddEvent";
import Register from "../Pages/Register";
import Login from "../Pages/Login";
import PrivateRoute from "../Pages/PrivateRoute";
import Events from "../Pages/Events";
import MyEvents from "../Pages/MyEvents";
import Update from "../Pages/Update";

const router = createBrowserRouter([

     {
      path: "/",
      element: <Mainlayout></Mainlayout>,
      children:[
        {
            path:'/',
            element:<Home></Home>
        },
        {
          path:'/addevents',
          element:<PrivateRoute><AddEvent></AddEvent></PrivateRoute>
        },
        {
          path:'/reg',
          element:<Register></Register>
        },
        {
          path:'/login',
          element:<Login></Login>
        },
        {
          path:'/events',
          element:<PrivateRoute><Events></Events></PrivateRoute>
        },
        {
          path:"/myevents",
          element:<PrivateRoute><MyEvents></MyEvents></PrivateRoute>
        },
         {
          path:"/update/:id",
          element:<PrivateRoute><Update></Update></PrivateRoute>
        }
      ]

      }
]);

export default router;