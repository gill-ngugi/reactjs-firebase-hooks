import { storage } from '../config/firebase';
import {
    ref,
    uploadBytes,
    getDownloadURL,
    deleteObject
} from 'firebase/storage';

export const storageService = {
    uploadFile: async (path, file) => {
        const storageRef = ref(storage, path);
        await uploadBytes(storageRef, file);
        return getDownloadURL(storageRef);
    },

    deleteFile: (path) => {
        const storageRef = ref(storage, path);
        return deleteObject(storageRef);
    }
};
