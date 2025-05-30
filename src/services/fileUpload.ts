import { storage } from '../lib/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export const uploadFile = async (file: File, path: string): Promise<string> => {
  try {
    console.log('Starting file upload:', { fileName: file.name, path });
    
    // Create a storage reference
    const storageRef = ref(storage, path);
    console.log('Storage reference created');
    
    // Upload the file
    const snapshot = await uploadBytes(storageRef, file);
    console.log('File uploaded successfully:', snapshot);
    
    // Get the download URL
    const downloadURL = await getDownloadURL(snapshot.ref);
    console.log('Download URL obtained:', downloadURL);
    
    return downloadURL;
  } catch (error) {
    console.error('Error uploading file:', error);
    if (error instanceof Error) {
      console.error('Error details:', {
        message: error.message,
        name: error.name,
        stack: error.stack
      });
    }
    throw error;
  }
};

export const getFileUrl = async (path: string): Promise<string> => {
  try {
    console.log('Getting file URL for path:', path);
    const storageRef = ref(storage, path);
    const url = await getDownloadURL(storageRef);
    console.log('File URL obtained:', url);
    return url;
  } catch (error) {
    console.error('Error getting file URL:', error);
    if (error instanceof Error) {
      console.error('Error details:', {
        message: error.message,
        name: error.name,
        stack: error.stack
      });
    }
    throw error;
  }
}; 