Añadimos el paquete de las notificaciones Push
`npm install @capacitor/push-notifications`

Ejecutamos comando
`ionic cap sync`

Registramos nuestra app con su id en firebase y descargamos el *google-services.json*
Y lo añadimos en la raiz de la carpeta android/app.
![[Pasted image 20230306084632.png]]
Añadir logo de la app a las notificaciones:
En el archivo AndroidManifest.xml, añadimos:
`<meta-data android:name="com.google.firebase.messaging.default_notification_icon" android:resource="@mipmap/ic_launcher_round" />`
Con la ruta al logo a usar

Para usar las Push hacemos el import 
`import { PushNotifications } from '@capacitor/push-notifications';`

Campos que acepta la API V1 de Firebase:
https://firebase.google.com/docs/reference/fcm/rest/v1/projects.messages?hl=es-419


EventListeners:
```ts
	PushNotifications.addListener('registration', (token) => {
      console.log('Token registro: ', token.value);
    });

  
    PushNotifications.addListener('registrationError', (err) => {
      console.log('Error de registro Push: ', err.error);
    });

  
    PushNotifications.addListener('pushNotificationReceived',
      (notification) => {
        console.log('Notificacion recibida: ' + notification.badge);
      }
    );

	PushNotifications.addListener('pushNotificationActionPerformed',
      (notification) => {
        console.log('Acción realizada al tocar la Push: ' + JSON.stringify(notification)
        );
      }
    );
```

URL Enviar Mensajes (POST)
`https://fcm.googleapis.com/v1/projects/<id-proyecto>/messages:send`

Header: 
Authorization : Bearer <token Google OAuth>