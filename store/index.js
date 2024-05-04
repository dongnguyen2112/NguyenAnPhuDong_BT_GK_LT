import { createContext, useContext, useReducer, useMemo } from "react";
import auth from "@react-native-firebase/auth";

import firestore from "@react-native-firebase/firestore";
import { Alert } from "react-native";

const MyContext = createContext();

// Setting custom name for the context

MyContext.displayName = "My store";

// React reducer

const reducer = (state, action)=> {
  switch (action.type) 
  {
    case "USER_LOGIN": 
      return { ...state, userLogin: action.value }
    
    case "LOGOUT":
        return {... state, userLogin: null}
    default: {
      throw new Error("Action khong ton tai");
    }
  }
}

// React context provider

const MyContextControllerProvider=({ children })=> {
  const initialState = {
    userLogin: null,
    jobs:[]
  }

  const [controller, dispatch] = useReducer(reducer, initialState);
  const value = useMemo(() => [controller, dispatch], [controller, dispatch]);

  return (
    <MyContext.Provider value={value}>{children}</MyContext.Provider>
  )
}
//React custom hook for using context
const useMyContextProvider = () => {

    const context = useContext (MyContext);
    if (!context) {
    
        throw new Error(
            "useMyContextProvider phai dat trong MyContextControllerProvider."
        )
    }
    
    return context;
}
    
    //Table
  const USERS = firestore().collection("USERS")
    //Actions
    const createAccount=(email, password, fullname)=>{
        auth().createUserWithEmailAndPassword(email,password)
        .then(()=>{
           Alert.alert("Tao tai khoan thanh cong voi email: " + email)
            USERS.doc(email)
            .set(
                {
                    email,
                    password,
                    fullname,
                }
            )
        })
        .catch(e => console.log(e.message))
    }
    const login = (dispatch, email, password, fullname) => {
        auth().signInWithEmailAndPassword (email, password)
        .then(()=>
              USERS.doc(email)
              .onSnapshot (u => {
                  if(u.exists)
                  {
                    console.log("Dang nhap thanh cong voi: " + u.id)
                    dispatch({type: "USER_LOGIN", value : u.data()})
                  }
                
              })                                                                              
    )
    .catch(e =>  Alert.alert("Vui lòng kiểm tra lại Email hoặc PassWord"))
}
const logout = (dispatch) => {
    auth().signOut()
    .then(()=>dispatch({ type: "LOGOUT", }));
};
  

export {
    MyContextControllerProvider,
    useMyContextProvider,
    login,
    logout,
    createAccount
  };
     