import React from 'react';
import { StyleSheet, SafeAreaView, Platform } from 'react-native';
import { WebView } from 'react-native-webview';

export default function CouponScreen() {
  const url = 'https://app.couponoo.it/hills-burger/promozioni-pubbliche';

  return (
    <SafeAreaView style={styles.container}>
      <WebView 
        source={{ uri: url }} 
        style={styles.webview}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
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
