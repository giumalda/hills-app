import React from 'react';
import { StyleSheet, SafeAreaView, Platform, Text, TouchableOpacity, Linking } from 'react-native';

export default function CouponScreen() {
  const url = 'https://app.couponoo.it/hills-burger/promozioni-pubbliche';

  if (Platform.OS === 'web') {
    return (
      <SafeAreaView style={styles.container}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', padding: '20px', textAlign: 'center', fontFamily: 'sans-serif' }}>
          <h2 style={{ marginBottom: '16px', color: '#111' }}>Sezione Coupon</h2>
          <p style={{ marginBottom: '24px', color: '#666', maxWidth: '400px' }}>
            Accedi alla piattaforma dedicata per visualizzare e riscattare tutte le promozioni attive di Hills' Burger.
          </p>
          <a 
            href={url} 
            target="_blank" 
            rel="noopener noreferrer"
            style={{
              backgroundColor: '#111',
              color: '#fff',
              padding: '12px 24px',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: 'bold',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
            }}
          >
            Apri Pagina Coupon
          </a>
        </div>
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
