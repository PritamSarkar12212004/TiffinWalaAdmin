import notifee, {AndroidStyle, AndroidImportance} from '@notifee/react-native';

const onScreenNotiFyFunc = async (remoteMessage: any) => {
  const {title, body} = remoteMessage.notification;
  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'open notiFy',
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
        type: AndroidStyle.BIGTEXT,
        text: body || '',
      },
      pressAction: {
        id: 'default',
      },
    },
  });
};
export default onScreenNotiFyFunc;
