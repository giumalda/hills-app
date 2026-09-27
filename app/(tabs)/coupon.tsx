import React from 'react';
import { StyleSheet, SafeAreaView, Platform } from 'react-native';

export default function CouponScreen() {
  const url = 'https://app.couponoo.it/hills-burger/promozioni-pubbliche';

  // Integrazione diretta a schermo intero anche per il sito web
  if (Platform.OS === 'web') {
    return (
      <SafeAreaView style={styles.container}>
        <iframe 
          src={url} 
          style={{ width: '100%', height: '100vh', border: 'none', flex: 1 }} 
          title="Coupon Hills Burger"
        />
      </SafeAreaView>
    );
  }

  // WebView nativa per l'app mobile (iOS e Android)
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
