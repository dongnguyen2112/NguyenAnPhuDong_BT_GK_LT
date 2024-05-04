import React, { useState, useEffect } from 'react';
import { Alert, ImageBackground, StyleSheet, View, Text, Image } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { createAccount } from '../store';

const Register = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullname, setFullname] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    const isValidEmail = email.includes('@');
    const isValidPassword = password.length >= 6;
    const isPasswordMatch = password === confirmPassword;
    const isFullNameValid = fullname.trim() !== '';

    setIsFormValid(isValidEmail && isValidPassword && isPasswordMatch && isFullNameValid);
  }, [email, password, confirmPassword, fullname]);

  const handleCreateAccount = () => {
    if (!isFormValid) {
      Alert.alert('Thông báo', 'Vui lòng điền đầy đủ và đúng thông tin.');
      return;
    }

    createAccount(email, password, fullname);
  };

  return (
    <ImageBackground
      source={require('../img/Background.jpg')}
      style={styles.background}
    >
      <View style={styles.container}>
        <Image
          style={styles.logo}
          source={require("../img/anh.png")}
          resizeMode="contain"
        />
        <TextInput
          label="Full Name"
          value={fullname}
          onChangeText={setFullname}
          style={styles.input}
          theme={{
            colors: { primary: '#007bff', text: '#007bff' },
          }}
        />
        <TextInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          autoCapitalize="none"
          keyboardType="email-address"
          theme={{
            colors: { primary: '#007bff', text: '#007bff' },
          }}
        />
        <TextInput
          label="Password"
          value={password}
          onChangeText={setPassword}
          style={styles.input}
          secureTextEntry={!showPassword}
          theme={{
            colors: { primary: '#007bff', text: '#007bff' },
          }}
          right={<TextInput.Icon 
                    icon="eye"
                    onPress={() => setShowPassword(!showPassword)} 
                 />}
        />
        <TextInput
          label="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          style={styles.input}
          secureTextEntry={!showConfirmPassword}
          theme={{
            colors: { primary: '#007bff', text: '#007bff' },
          }}
          right={<TextInput.Icon
                    icon="eye"
                    onPress={() => setShowConfirmPassword(!showConfirmPassword)} 
                 />}
        />
        
        {isFormValid && (
          <Button mode="contained" onPress={handleCreateAccount} style={styles.button}>
            Đăng ký
          </Button>
        )}
        <View style={styles.footer}>
          <Text>Already got an account?</Text>
          <Button onPress={() => navigation.navigate("Login")}>Log in</Button>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  logo: {
    width: 200,
    height: 180,
    alignSelf: 'center',
    marginBottom: 20,
  },
  input: {
    marginBottom: 20,
    paddingHorizontal: 15,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
  },
  button: {
    marginTop: 10,
    backgroundColor: '#6666FF',
    borderRadius: 20,
    elevation: 2,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Register;
