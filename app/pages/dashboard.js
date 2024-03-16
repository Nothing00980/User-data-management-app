// Dashboard.js
import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Dashboard = () => {
  const navigation = useNavigation();

  const navigateToSubmitForm = () => {
    navigation.navigate('SubmitFormData');
  };

  const navigateToRetrieveData = () => {
    navigation.navigate('RetrieveData');
  };

  return (
    <View style={styles.container}>
      <Button title="Submit Form Data" onPress={navigateToSubmitForm} />
      <Button title="Retrieve Form Data" onPress={navigateToRetrieveData} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Dashboard;
