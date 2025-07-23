import {storage} from '../../util/sotrage/Storage';

const getStorage = async (key: any) => {
  const data = storage.getString(key);
  if (!data) {
    return null;
  } else {
    const fainalData = JSON.parse(data);
    return fainalData;
  }
};
export default getStorage;
