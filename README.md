# Hill's Burger

Expo / React Native app for Hill's Burger.

## Download Android and iOS builds

1. Open the repository's **Actions** tab and run **Build Hill's Burger**.
2. Choose Android, iOS, or both.
3. Download `Hills-Burger.apk` or `Hills-Burger-unsigned.ipa` directly from the workflow run's **Artifacts** section. Each artifact is the single original app file, not a ZIP containing a folder.

The APK is signed with the Android debug key for direct installation and testing. The IPA is a validated, unsigned package: drag the downloaded `.ipa` into Sideloadly and sign it with your Apple ID to install it. Distribution without sideloading requires an Apple Developer certificate and provisioning profile.

The app icons are generated from the burger artwork in `assets/images` and configured in `app.json`, including light/dark iOS icons and Android adaptive/themed icons.

## Push notification foundation

The Coupon screen lets a user explicitly grant the operating-system notification permission and stores that device's native push token locally. The token is not sent to Couponoo or any server, and enabling notifications does not subscribe the user to marketing campaigns. Tapping a future notification with `data.route` set to `coupon` opens the Coupon screen.

This is groundwork only: Couponoo campaign delivery is not connected. Before sending CRM campaigns, confirm Couponoo's API/webhook and consent requirements, provide the platform push credentials (APNs for iOS and Firebase/FCM for Android), and implement a secure server-side token registration and campaign-delivery path. Push notifications must be tested in a native development or release build on a physical device; Expo Go and web do not support this flow.
