import { db } from '@/lib/firebase';
import { collection, getDocs, deleteDoc, doc, query, where } from 'firebase/firestore';

export async function cleanupContent() {
  try {
    console.log('Starting content cleanup...');

    // Clean up modules collection
    const modulesSnapshot = await getDocs(collection(db, 'modules'));
    const seenIds = new Set();
    const seenContent = new Map();

    for (const doc of modulesSnapshot.docs) {
      const data = doc.data();
      const contentKey = `${data.subjectId}-${data.topicId}-${data.subtopicId}-${data.id}`;
      
      if (seenContent.has(contentKey)) {
        // This is a duplicate, delete it
        console.log(`Deleting duplicate module: ${doc.id}`);
        await deleteDoc(doc.ref);
      } else {
        seenContent.set(contentKey, doc.id);
      }
    }

    // Clean up subjects collection
    const subjectsSnapshot = await getDocs(collection(db, 'subjects'));
    const seenSubjectIds = new Set();

    for (const doc of subjectsSnapshot.docs) {
      const data = doc.data();
      if (seenSubjectIds.has(data.id)) {
        console.log(`Deleting duplicate subject: ${doc.id}`);
        await deleteDoc(doc.ref);
      } else {
        seenSubjectIds.add(data.id);
      }
    }

    // Clean up quizzes collection
    const quizzesSnapshot = await getDocs(collection(db, 'quizzes'));
    const seenQuizIds = new Set();

    for (const doc of quizzesSnapshot.docs) {
      const data = doc.data();
      if (seenQuizIds.has(data.id)) {
        console.log(`Deleting duplicate quiz: ${doc.id}`);
        await deleteDoc(doc.ref);
      } else {
        seenQuizIds.add(data.id);
      }
    }

    console.log('Content cleanup completed successfully!');
  } catch (error) {
    console.error('Error during content cleanup:', error);
    throw error;
  }
} 