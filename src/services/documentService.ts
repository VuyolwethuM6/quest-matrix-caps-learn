import { db } from '@/lib/firebase';
import { collection, query, orderBy, getDocs, doc, updateDoc, where } from 'firebase/firestore';

export interface Document {
  id: string;
  userId: string;
  fileName: string;
  fileUrl: string;
  status: 'pending' | 'reviewed' | 'rejected';
  feedback?: string;
  uploadedAt: string;
  userName: string;
}

export const getDocuments = async (): Promise<Document[]> => {
  try {
    const documentsRef = collection(db, 'documents');
    const q = query(documentsRef, orderBy('uploadedAt', 'desc'));
    const querySnapshot = await getDocs(q);
    
    const documents: Document[] = [];
    for (const doc of querySnapshot.docs) {
      const data = doc.data();
      documents.push({
        id: doc.id,
        userId: data.userId,
        fileName: data.fileName,
        fileUrl: data.fileUrl,
        status: data.status || 'pending',
        feedback: data.feedback,
        uploadedAt: data.uploadedAt.toDate().toISOString(),
        userName: data.userName
      });
    }
    
    return documents;
  } catch (error) {
    console.error('Error fetching documents:', error);
    throw error;
  }
};

export const updateDocumentStatus = async (
  documentId: string,
  status: 'reviewed' | 'rejected',
  feedback: string
): Promise<void> => {
  try {
    const documentRef = doc(db, 'documents', documentId);
    await updateDoc(documentRef, {
      status,
      feedback,
      reviewedAt: new Date()
    });
  } catch (error) {
    console.error('Error updating document status:', error);
    throw error;
  }
};

export const getUserDocuments = async (userId: string): Promise<Document[]> => {
  try {
    const documentsRef = collection(db, 'documents');
    const q = query(
      documentsRef,
      where('userId', '==', userId),
      orderBy('uploadedAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    
    const documents: Document[] = [];
    for (const doc of querySnapshot.docs) {
      const data = doc.data();
      documents.push({
        id: doc.id,
        userId: data.userId,
        fileName: data.fileName,
        fileUrl: data.fileUrl,
        status: data.status || 'pending',
        feedback: data.feedback,
        uploadedAt: data.uploadedAt.toDate().toISOString(),
        userName: data.userName
      });
    }
    
    return documents;
  } catch (error) {
    console.error('Error fetching user documents:', error);
    throw error;
  }
}; 