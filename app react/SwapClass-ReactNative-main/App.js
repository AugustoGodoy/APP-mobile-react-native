import React from 'react';
import { StatusBar } from 'expo-status-bar';
import MainNavigator from './src/routes';

export default function App() {
  return (
    <>
      <MainNavigator />
      <StatusBar style="auto" />
    </>
  );
}
