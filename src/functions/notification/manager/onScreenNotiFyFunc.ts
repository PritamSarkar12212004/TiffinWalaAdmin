import notifee, {AndroidStyle, AndroidImportance} from '@notifee/react-native';

const onScreenNotiFyFunc = async (remoteMessage: any) => {
  const {title, body} = remoteMessage.notification;
  console.log(remoteMessage.notification);

  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
    sound: 'notify',
    importance: AndroidImportance.HIGH,
  });

  await notifee.displayNotification({
    title: title,
    body: body,
    android: {
      channelId,
      largeIcon: 'ic_launcher',
      style: {
        type: AndroidStyle.BIGPICTURE,
        picture:
          remoteMessage.notification?.android?.imageUrl ||
          remoteMessage.notification?.imageUrl,
      },
      pressAction: {
        id: 'default',
      },
    },
  });
};

export default onScreenNotiFyFunc;
