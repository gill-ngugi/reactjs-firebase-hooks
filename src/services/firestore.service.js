import { db } from '../config/firebase';
import { 
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc
} from 'firebase/firestore';

export const firestoreService = {
  // Collection operations
  getCollection: (collectionName) => collection(db, collectionName),
  
  // Document operations
  getDocument: async (collectionName, id) => {
    const docRef = doc(db, collectionName, id);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null;
  },
  
  createDocument: (collectionName, data) => 
    addDoc(collection(db, collectionName), data),
  
  updateDocument: (collectionName, id, data) => 
    updateDoc(doc(db, collectionName, id), data),
  
  deleteDocument: (collectionName, id) => 
    deleteDoc(doc(db, collectionName, id))
};
