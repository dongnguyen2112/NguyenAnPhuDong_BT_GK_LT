import React, { useState, useEffect } from "react";
import { View, Image, StyleSheet, ImageBackground, Alert } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { login, useMyContextProvider } from "../store";
import { useIsFocused } from '@react-navigation/native'; // Import hook useIsFocused

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [controller, dispatch] = useMyContextProvider();
  const { userLogin } = controller;
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const isFocused = useIsFocused(); // Sử dụng hook useIsFocused

  useEffect(() => {
    if (isFocused) {
      // Nếu trang Login được focus, xóa giá trị của email và password
      clearCredentials();
    }
  }, [isFocused]);

  // Hàm để xóa giá trị của email và password
  const clearCredentials = () => {
    setEmail('');
    setPassword('');
    setEmailError(false); // Đảm bảo rằng lỗi email sẽ được xóa khi quay lại
    setPasswordError(false); // Đảm bảo rằng lỗi password sẽ được xóa khi quay lại
  };

  useEffect(() => {
    if (userLogin && userLogin.fullname) {
      navigation.navigate("Jobs", { fullname: userLogin.fullname });
    }
  }, [userLogin]);

  const handleLogin = () => {
    // Kiểm tra điều kiện email và password
    if (!validateEmail(email)) {
      setEmailError(true);
      return;
    } else {
      setEmailError(false);
    }

    if (password.length < 6) {
      setPasswordError(true);
      return;
    } else {
      setPasswordError(false);
    }

    // Đăng nhập nếu điều kiện được đáp ứng
    login(dispatch, email, password);
  };

  // Hàm kiểm tra email có hợp lệ không
  const validateEmail = (email) => {
    const emailRegex = /\S+@\S+\.\S+/;
    return emailRegex.test(email);
  };

  return (
    <ImageBackground
      source={require('../img/login.jpg')}
      style={myStyle.background}
    >
      <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center', marginBottom: 100 }}>
        <Image
          style={myStyle.logo}
          source={require("../img/anh.png")}
          resizeMode="contain"
        />
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={[myStyle.input, emailError && myStyle.errorInput]}
          mode="outlined"
        />

        {emailError && <Text style={myStyle.errorText}>Vui lòng nhập địa chỉ email hợp lệ.</Text>}

        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
          style={[myStyle.input, passwordError && myStyle.errorInput]}
          right={<TextInput.Icon icon="eye" onPress={() => setShowPassword(!showPassword)} />}
          mode="outlined"
        />

        {passwordError && <Text style={myStyle.errorText}>Mật khẩu phải chứa ít nhất 6 ký tự.</Text>}

        <Button style={myStyle.button}
          mode="contained-tonal"
          onPress={handleLogin}
          labelStyle={{ fontSize: 20 }}
        >
          Log in
        </Button>

        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
          <Text>Don't have an account ? </Text>
          <Button onPress={() => navigation.navigate("Register")}>
            Sign up
          </Button>
        </View>
      </View>
    </ImageBackground>
  );
};

export default Login;

const myStyle = StyleSheet.create({
  logo: {
    alignSelf: "center",
    justifyContent: "center"
  },
  button: {
    backgroundColor: '#6666FF',
    margin: 10,
    padding: 5
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  input: {
    margin: 10,
  },
  errorInput: {
    borderColor: 'red',
    borderWidth: 1,
  },
  errorText: {
    color: 'red',
    marginLeft: 15,
  }
});
