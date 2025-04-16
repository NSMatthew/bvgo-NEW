import React from 'react';
import { StatusBar } from 'react-native';
import Navigation from '../src/navigation/Navigation';

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <Navigation />
    </>
  );
};

export default App;