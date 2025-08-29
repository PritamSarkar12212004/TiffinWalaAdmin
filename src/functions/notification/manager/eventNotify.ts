import notifee, {AndroidStyle, AndroidImportance} from '@notifee/react-native';

const eventNotify = async (remoteMessage: any) => {
  const {title, body, image} = remoteMessage.notification;
  const data = remoteMessage.data;

  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'event notiFy',
    sound: 'notify',
    importance: AndroidImportance.HIGH,
  });

  await notifee.displayNotification({
    title: title || '',
    body: body || '',
    android: {
      channelId,
      smallIcon: 'ic_launcher',
      style: {
        type: AndroidStyle.BIGPICTURE,
        picture: image || data.image,
      },
      pressAction: {
        id: 'default',
      },
    },
  });
};

export default eventNotify;
