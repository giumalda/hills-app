import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { WebView } from 'react-native-webview';

export default function CouponScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <WebView 
        source={{ uri: 'https://app.couponoo.it/hills-burger/promozioni-pubbliche' }} 
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
