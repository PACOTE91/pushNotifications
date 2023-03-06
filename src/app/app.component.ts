import { Component, OnInit } from '@angular/core';
import { ActionPerformed, PushNotifications } from '@capacitor/push-notifications';
import { Platform } from '@ionic/angular';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
    public numNotificaciones: number = 0
    public token: string = "";
    public appPages = [
        { title: 'Inbox', url: '/folder/Inbox', icon: 'mail' },
        { title: 'Outbox', url: '/folder/Outbox', icon: 'paper-plane' },
        { title: 'Favorites', url: '/folder/Favorites', icon: 'heart' },
        { title: 'Archived', url: '/folder/Archived', icon: 'archive' },
        { title: 'Trash', url: '/folder/Trash', icon: 'trash' },
        { title: 'Spam', url: '/folder/Spam', icon: 'warning' },
    ];
    public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
    constructor(private platform: Platform) {
    }

    ngOnInit(): void {
        this.platform.ready().then(() => {

            if (this.platform.is("desktop") == false) {
                PushNotifications.register().then(() => {
                    this.addListeners()
                })
            }
        })
    }


    addListeners() {
        PushNotifications.addListener('registration', token => {
            console.log('Token registro: ', token.value);
        });

        PushNotifications.addListener('registrationError', err => {
            console.log('Error de registro Push: ', err.error);
        });

        PushNotifications.addListener('pushNotificationReceived', notification => {

            console.log("Notificacion recibida: " + notification.badge);
        });

        PushNotifications.addListener(
            'pushNotificationActionPerformed', notification => {
                console.log('Acción realizada al tocar la Push: ' + JSON.stringify(notification));
            },
        );
    }


    getDeliveredNotifications = async () => {
        const notificationList = await PushNotifications.getDeliveredNotifications();
        console.log('delivered notifications', notificationList);
    }

}
