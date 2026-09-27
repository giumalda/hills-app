import React from 'react';
import { StyleSheet, SafeAreaView, Platform, Text, View, Pressable } from 'react-native';

export default function CouponScreen() {
  const url = 'https://app.couponoo.it/hills-burger/promozioni-pubbliche';

  // Se siamo sul web, mostriamo il box pulito con il link diretto
  if (Platform.OS === 'web') {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.webWrapper}>
          <Text style={styles.webTitle}>Coupon Hills' Burger</Text>
          <Text style={styles.webText}>
            Clicca sul pulsante qui sotto per aprire la pagina ufficiale dei coupon e riscattare le offerte.
          </Text>
          <Pressable 
            style={styles.webButton}
            onClick={() => window.open(url, '_blank')}
          >
            <Text style={styles.webButtonText}>Apri Couponoo</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  // Sull'app mobile carica la WebView nativa
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
  webWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  webTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#111',
  },
  webText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#555',
    marginBottom: 24,
    maxWidth: 400,
  },
  webButton: {
    backgroundColor: '#111',
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 8,
  },
  webButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
