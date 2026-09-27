import React from 'react';
import { StyleSheet, SafeAreaView, Platform } from 'react-native';

export default function CouponScreen() {
  const url = 'https://app.couponoo.it/hills-burger/promozioni-pubbliche';

  if (Platform.OS === 'web') {
    return (
      <SafeAreaView style={styles.container}>
        <iframe 
          src={url} 
          style={{ width: '100%', height: '100%', border: 'none', flex: 1 }} 
        />
      </SafeAreaView>
    );
  }

  // Importazione dinamica: si attiva solo su app iOS e Android
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
  },
  webview: {
    flex: 1,
  },
});
