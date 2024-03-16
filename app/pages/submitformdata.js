import React, { useState } from 'react';
import { View, Text, Button, Alert,TextInput } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SubmitFormDataPage = () => {
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [image, setImage] = useState(null);

  const handleChooseImage = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert('Permission to access camera is required!');
      return;
    }

    const pickerResult = await ImagePicker.launchCameraAsync();
    if (!pickerResult.cancelled) {
      setImage(pickerResult.uri);
    }
  };

  const handleSubmit = async () => {
    try {
      
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        return Alert.alert('Error', 'Token not found');
      }
      const formData = new FormData();
      formData.append('latitude', latitude);
      formData.append('longitude', longitude);
      formData.append('image', {
        uri: image,
        name: 'photo.jpg',
        type: 'image/jpeg',
      });

      const response = await fetch('http://192.168.177.197:3000/form', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Success', data.message);
      } else {
        Alert.alert('Error', data.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <View>
      <Text>Latitude:</Text>
      <TextInput value={latitude} onChangeText={setLatitude} />
      <Text>Longitude:</Text>
      <TextInput value={longitude} onChangeText={setLongitude} />
      <Button title="Choose Image" onPress={handleChooseImage} />
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

export default SubmitFormDataPage;
