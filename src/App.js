import "./App.css";
import Body from "./components/Body";

import Header from "./components/Header";

import { Provider } from "react-redux";

import appStore from "./utils/appStore";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import MainContainer from "./components/MainContainer";
import WatchPage from "./components/WatchPage";
import SearchResultPage from "./components/SearchResultPage";

const HeadAndBody = () => {
  return (
    <>
      <Header />
      <Body />
    </>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <HeadAndBody />,
    children: [
      {
        path: "/",
        element: <MainContainer />,
      },
      {
        path: "watch",
        element: <WatchPage />,
      },
      {
        path: "results",
        element: <SearchResultPage />,
      },
    ],
  },
]);

function App() {
  return (
    <Provider store={appStore}>
      <div>
        <RouterProvider router={appRouter} />
        {/* <Header /> */}
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
