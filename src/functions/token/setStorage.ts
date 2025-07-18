import {storage} from '../../util/sotrage/Storage';

const setStorage = (key: any, value: any) => {
  storage.set(key, JSON.stringify(value));
  return true;
};
export default setStorage;
