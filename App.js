import "react-native-gesture-handler"
import { MyContextControllerProvider } from "./store";
import Register from "./screen/Register";
import Login from "./screen/Login";
import { NavigationContainer } from "@react-navigation/native";
import Routers from "./routers/Routers";
import Jobs from "./screen/Jobs";

const App = () => {
  return (
      // <MyContextControllerProvider>
      //     <Login/>
      // </MyContextControllerProvider>
      // <Register/>    
        <MyContextControllerProvider>
            <Routers/>   
        </MyContextControllerProvider>
        // <Jobs/>
        

        

      
  )
}

export default App;
