import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, ActivityIndicator,Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const RetrieveDataPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem('token'); // Get JWT token from AsyncStorage
        if (!token) {
          setLoading(false);
          return Alert.alert('Error', 'Token not found');
        }
        const response = await fetch('http://localhost:3000/data', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        const responseData = await response.json();
        

        if (response.ok) {
          setData(responseData);
        } else {
          Alert.alert('Error', responseData.message || 'An error occurred');
        }
      } catch (error) {
        console.error('Error:', error);
        Alert.alert('Error', 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View>
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>Latitude: {item.latitude}</Text>
            <Text>Longitude: {item.longitude}</Text>
            <Image source={{ uri: item.imageUrl }} style={{ width: 200, height: 200 }} />
          </View>
        )}
      />
    </View>
  );
};

export default RetrieveDataPage;
