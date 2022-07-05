import React from 'react';
import { View, Text, TextInput, Button } from 'react-native';

export function Profile() {
  return (
    <View>
      <Text testID='text-tile'>Perfil</Text>

      <TextInput testID='input-name' placeholder="Nome" autoCorrect={false} value="Aleuci"/>
      <TextInput testID='input-surname' placeholder="Email" value='Lima'/>

      <Button title="Save" onPress={() => {}}/>
    </View>
  );
}