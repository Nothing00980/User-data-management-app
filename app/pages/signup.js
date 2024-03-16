import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';

const UserSignupPage = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async () => {
    try {
      // Perform API call to signup
      const response = await fetch('http://192.168.177.197:3000/auth/user/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          name,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Success', data.message);
        navigation.navigate('Login'); // Navigate to login page after successful signup
      } else {
        Alert.alert('Error', data.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <View>
      <Text>Email:</Text>
      <TextInput value={email} onChangeText={setEmail} />
      <Text>Name:</Text>
      <TextInput value={name} onChangeText={setName} />
      <Text>Password:</Text>
      <TextInput value={password} onChangeText={setPassword} secureTextEntry={true} />
      <Button title="Signup" onPress={handleSignup} />
    </View>
  );
};

export default UserSignupPage;
