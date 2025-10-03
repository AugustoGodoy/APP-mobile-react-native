import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import HomeScreen from '../pages/HomeScreen';
import InfoScreen from '../pages/InfoScreen';
import LoginScreen from '../pages/LoginScreen';
import ProductDetailScreen from '../pages/ProductDetailScreen';

const Stack = createNativeStackNavigator();

export default function MainNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#f8fafc',
            borderBottomLeftRadius: 18,
            borderBottomRightRadius: 18,
            shadowColor: '#007bff',
            shadowOpacity: 0.10,
            shadowRadius: 8,
            shadowOffset: { width: 0, height: 4 },
            elevation: 4,
          },
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontFamily: 'Poppins, Roboto, Arial',
            fontWeight: 'bold',
            fontSize: 22,
            color: '#007bff',
            letterSpacing: 1,
          },
          headerShadowVisible: true,
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={({ navigation }) => ({
            title: 'Produtos',
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => navigation.replace('Login')}
                style={styles.headerButton}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <MaterialIcons name="logout" size={22} color="#007bff" />
                  <Text style={styles.headerButtonText}>Sair</Text>
                </View>
              </TouchableOpacity>
            ),
            headerRight: () => (
              <TouchableOpacity
                onPress={() => navigation.navigate('Info')}
                style={styles.headerButton}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <MaterialIcons name="info-outline" size={22} color="#007bff" />
                  <Text style={styles.headerButtonText}>Info</Text>
                </View>
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
          name="Info"
          component={InfoScreen}
          options={{
            title: 'Sobre o App',
          }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ProductDetail"
          component={ProductDetailScreen}
          options={{
            title: 'Detalhes do Produto',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  headerButton: {
    marginHorizontal: 8,
    padding: 4,
    borderRadius: 8,
  },
  headerButtonText: {
    color: '#007bff',
    fontWeight: '600',
    marginLeft: 4,
    fontSize: 16,
    fontFamily: 'Poppins, Roboto, Arial',
  },
});

