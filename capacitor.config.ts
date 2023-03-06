import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
    appId: 'io.ionic.starter',
    appName: 'push_notifications',
    webDir: 'www',
    bundledWebRuntime: false,
    plugins: {
        "PushNotifications": {
            "presentationOptions": ["badge", "sound", "alert"]
        }
    }
};

export default config;
