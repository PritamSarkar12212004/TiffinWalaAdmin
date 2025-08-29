import api from '../../../util/api/Axios';

const callNotiFy = async (token: any) => {
  await api.post('/notification/noti-market', {
    title: 'open',
    body: 'open',
    token: token,
  });
};
export default callNotiFy;
