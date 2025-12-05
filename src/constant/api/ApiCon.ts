const ApiCon = {
  AuthCall: {
    createProfile: '/auth/profile-create',
    loginOtp: '/auth/otp',
    otpVarify: '/auth/otp/provide-data',
  },
  ProductControll: {
    deleteFollower: '/follower/delete-data',
    followerFetchDetiles: '/follower/fetch-detiles',
    followerFetch: '/follower/fetch-data',
  },
  Main: {
    DataProvider: '/data-provider/main-data',
  },
  Upload: {
    productUpload: '/product/update',
  },
  Notification: {
    DeleteNotification: '/notification/delete-noti',
    FetchNotification: '/notification/fetch-noti',
    GetToken: 'notification/noti-get-token',
  },
  Options: {
    ControllOption: '/option/controll-options',
  },
  Product: {
    CreateProduct: "/product/create",
  },
  Update:{
    AppUpdateChaker:"/app/update"
  }
};
export default ApiCon;
