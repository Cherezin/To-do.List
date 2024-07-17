import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { CreateTaskList } from "./pages/home";


const router = createBrowserRouter([
  {
    path: "/",
    element: <CreateTaskList />,
  },
]);


export function App() {
  return <RouterProvider router={router} />
}
