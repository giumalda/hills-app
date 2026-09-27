import React from 'react';
import { StyleSheet, SafeAreaView, Platform } from 'react-native';

export default function CouponScreen() {
  const url = 'https://app.couponoo.it/hills-burger/promozioni-pubbliche';

  // Se l'utente è sul sito web, mostra un semplice riquadro HTML
  if (Platform.OS === 'web') {
    return (
      <SafeAreaView style={styles.container}>
        <iframe 
          src={url} 
          style={{ width: '100%', height: '100vh', border: 'none' }} 
        />
      </SafeAreaView>
    );
  }

  // L'importazione dinamica si attiva solo sulle app iOS e Android
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
