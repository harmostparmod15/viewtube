import "./App.css";
import Body from "./components/Body";

import Header from "./components/Header";

import { Provider } from "react-redux";

import appStore from "./utils/appStore";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import MainContainer from "./components/MainContainer";
import WatchPage from "./components/WatchPage";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Body />,
    children: [
      {
        path: "/",
        element: <MainContainer />,
      },
      {
        path: "watch",
        element: <WatchPage />,
      },
    ],
  },
]);

function App() {
  return (
    <Provider store={appStore}>
      <div>
        <Header />
        <RouterProvider router={appRouter} />

        {/* 
       Head
       Body
            Sidebar
                Menu Items
         MainContainer
            ButtonList
            VideoContainer
                VideoCard        
      */}
      </div>
    </Provider>
  );
}

export default App;
