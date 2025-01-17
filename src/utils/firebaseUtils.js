// src/utils/firebaseUtils.js
import { 
    collection, 
    doc, 
    getDoc, 
    getDocs, 
    addDoc, 
    updateDoc, 
    deleteDoc, 
    query, 
    where, 
    orderBy, 
    limit 
  } from 'firebase/firestore';
  import { db } from '../config/firebase';
  
  // Generic CRUD operations
  export const firebaseUtils = {
    // Create
    create: async (collectionName, data) => {
      try {
        const docRef = await addDoc(collection(db, collectionName), {
          ...data,
          createdAt: new Date(),
          updatedAt: new Date()
        });
        return docRef.id;
      } catch (error) {
        console.error('Error creating document:', error);
        throw error;
      }
    },
  
    // Read
    get: async (collectionName, id) => {
      try {
        const docRef = doc(db, collectionName, id);
        const docSnap = await getDoc(docRef);
        return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null;
      } catch (error) {
        console.error('Error getting document:', error);
        throw error;
      }
    },
  
    // Read all
    getAll: async (collectionName) => {
      try {
        const querySnapshot = await getDocs(collection(db, collectionName));
        return querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
      } catch (error) {
        console.error('Error getting documents:', error);
        throw error;
      }
    },
  
    // Update
    update: async (collectionName, id, data) => {
      try {
        const docRef = doc(db, collectionName, id);
        await updateDoc(docRef, {
          ...data,
          updatedAt: new Date()
        });
        return true;
      } catch (error) {
        console.error('Error updating document:', error);
        throw error;
      }
    },
  
    // Delete
    delete: async (collectionName, id) => {
      try {
        const docRef = doc(db, collectionName, id);
        await deleteDoc(docRef);
        return true;
      } catch (error) {
        console.error('Error deleting document:', error);
        throw error;
      }
    },
  
    // Query
    query: async (collectionName, conditions = [], orderByField = 'createdAt', limitTo = null) => {
      try {
        let q = collection(db, collectionName);
        
        // Add where conditions
        conditions.forEach(condition => {
          q = query(q, where(condition.field, condition.operator, condition.value));
        });
  
        // Add orderBy
        if (orderByField) {
          q = query(q, orderBy(orderByField, 'desc'));
        }
  
        // Add limit
        if (limitTo) {
          q = query(q, limit(limitTo));
        }
  
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
      } catch (error) {
        console.error('Error querying documents:', error);
        throw error;
      }
    }
  };
  