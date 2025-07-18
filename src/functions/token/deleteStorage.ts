import {storage} from '../../util/sotrage/Storage';

const deleteStorage = (key: any) => {
  storage.delete(key);
  return true;
};
export default deleteStorage;
