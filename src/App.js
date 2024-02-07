import "./App.css";
import Body from "./components/Body";

import Header from "./components/Header";

import { Provider } from "react-redux";

import appStore from "./utils/appStore";

function App() {
  return (
    <Provider store={appStore}>
      <div>
        <Header />
        <Body />

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
