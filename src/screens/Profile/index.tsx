import React from 'react';
import { View, Text, TextInput, Button } from 'react-native';

export function Profile() {
  return (
    <View>
      <Text>Profile</Text>

      <TextInput placeholder="Name" autoCorrect={false}/>
      <TextInput placeholder="Email" />

      <Button title="Save" onPress={() => {}}/>
    </View>
  );
}