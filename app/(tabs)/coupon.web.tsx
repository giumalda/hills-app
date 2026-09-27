import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';

export default function CouponScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <iframe 
        src="https://app.couponoo.it/hills-burger/promozioni-pubbliche" 
        style={{ width: '100%', height: '100vh', border: 'none' }} 
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
