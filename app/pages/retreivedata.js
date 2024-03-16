import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, ActivityIndicator,Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
const RetrieveDataPage = () => {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem('token'); // Get JWT token from AsyncStorage
        if (!token) {
          setLoading(false);
          Alert.alert('Error', 'Token not found');
          navigation.navigate('SignUp');
          return ;
        }
        const response = await fetch('http://192.168.177.197:3000/data', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        const responseData = await response.json();
        

        if (response.ok) {
          setData(responseData);
        } else {
          Alert.alert('Error', responseData.message || 'An error occurred');
          navigation.navigate('SignUp');
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
      {data.length === 0 ? (
        <Text>No data added</Text>
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            
            <View>
              <Text>Latitude: {item.latitude}</Text>
              <Text>Longitude: {item.longitude}</Text>
              <Image source={{ uri: item.imageUrl.replace(/\\/g, '/') }} style={{ width: 200, height: 200 }} />
            </View>
          )}
        />
      )}
    </View>
  );
};

export default RetrieveDataPage;
