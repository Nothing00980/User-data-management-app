import React, { useState } from 'react';
import { View, Text, Button, Alert,TextInput } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native'; 

const SubmitFormDataPage = () => {
  const navigation = useNavigation();
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
      console.log('Image URI:', pickerResult.assets[0].uri);
      setImage(pickerResult.assets[0].uri);
      console.log("image successfully uploaded");
      // console.log('Picker Result:', pickerResult);
    }
  };

  const handleSubmit = async () => {
    try {

      const userId = await AsyncStorage.getItem('userId');
      if (!userId) {
        return Alert.alert('Error', 'User ID not found');
      }
      
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        Alert.alert('Error', 'Token not found');
        navigation.navigate('SignUp');
        return ;
      }
      console.log(userId);
      console.log(latitude);
      console.log(longitude);
      console.log(image);
      const formData = new FormData();
      formData.append('userId', userId);
      formData.append('latitude', latitude);
      formData.append('longitude', longitude);
     if (image) {
      // Get the file name from the image URI
      const fileName = image.split('/').pop();
      // Create a file object from the image URI
      const imageFile = {
        uri: image,
        name: fileName,
        type: 'image/jpeg',
      };
      // Append the image file to the FormData
      formData.append('image', imageFile);
    }

     
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

        navigation.navigate('Dashboard');

      } else {
        Alert.alert('Error', data.message);
        navigation.navigate('SignUp');
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
