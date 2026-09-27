import React from 'react';
import { StyleSheet, SafeAreaView, Platform } from 'react-native';

export default function CouponScreen() {
  const url = 'https://app.couponoo.it/hills-burger/promozioni-pubbliche';

  // Sintonizziamo sia web che mobile per caricare la pagina interattiva
  if (Platform.OS === 'web') {
    return (
      <SafeAreaView style={styles.container}>
        <object 
          data={url} 
          style={{ width: '100%', height: '100vh', border: 'none' }} 
        />
      </SafeAreaView>
    );
  }

  const { WebView } = require('react-native-webview');

  return (
    <SafeAreaView style={styles.container}>
      <WebView 
        source={{ uri: url }} 
        style={styles.webview}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  webview: {
    flex: 1,
  },
});
