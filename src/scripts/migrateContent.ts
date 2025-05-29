// import { db } from '@/lib/firebase';
// import { collection, doc, setDoc } from 'firebase/firestore';
// import { subjects } from '@/data/curriculum';

// export async function migrateContent() {
//   try {
//     console.log('Starting content migration...');
    
//     // First, migrate the subject structure
//     for (const subject of subjects) {
//       console.log(`Migrating subject: ${subject.name}`);
      
//       // Save subject
//       const subjectRef = doc(collection(db, 'subjects'));
//       await setDoc(subjectRef, {
//         id: subject.id,
//         name: subject.name,
//         description: subject.description,
//         icon: subject.icon,
//         color: subject.color,
//         createdAt: new Date(),
//         updatedAt: new Date()
//       });
      
//       for (const topic of subject.topics) {
//         console.log(`  Migrating topic: ${topic.name}`);
        
//         // Save topic
//         const topicRef = doc(collection(db, `subjects/${subject.id}/topics`));
//         await setDoc(topicRef, {
//           id: topic.id,
//           name: topic.name,
//           description: topic.description,
//           createdAt: new Date(),
//           updatedAt: new Date()
//         });
        
//         for (const subtopic of topic.subTopics) {
//           console.log(`    Migrating subtopic: ${subtopic.name}`);
          
//           // Save subtopic
//           const subtopicRef = doc(collection(db, `subjects/${subject.id}/topics/${topic.id}/subtopics`));
//           await setDoc(subtopicRef, {
//             id: subtopic.id,
//             name: subtopic.name,
//             description: subtopic.description,
//             createdAt: new Date(),
//             updatedAt: new Date()
//           });
          
//           // Create content blocks with proper structure
//           const contentBlocks = subtopic.content.map((block, index) => ({
//             id: block.id,
//             type: block.type,
//             content: block.content,
//             subjectId: subject.id,
//             topicId: topic.id,
//             subtopicId: subtopic.id,
//             order: index
//           }));
          
//           // Save each content block to Firestore
//           for (const block of contentBlocks) {
//             const docRef = doc(collection(db, 'modules'));
//             await setDoc(docRef, {
//               ...block,
//               createdAt: new Date(),
//               updatedAt: new Date()
//             });
//             console.log(`      Saved content block: ${block.id}`);
//           }
          
//           // Save quiz if it exists
//           if (subtopic.quiz) {
//             const quizRef = doc(collection(db, 'quizzes'));
//             await setDoc(quizRef, {
//               id: subtopic.quiz.id,
//               title: subtopic.quiz.title,
//               description: subtopic.quiz.description,
//               questions: subtopic.quiz.questions,
//               subjectId: subject.id,
//               topicId: topic.id,
//               subtopicId: subtopic.id,
//               createdAt: new Date(),
//               updatedAt: new Date()
//             });
//             console.log(`      Saved quiz: ${subtopic.quiz.id}`);
//           }
//         }
//       }
//     }
    
//     console.log('Content migration completed successfully!');
//   } catch (error) {
//     console.error('Error during content migration:', error);
//     throw error; // Re-throw the error to handle it in the component
//   }
// }

// // Run the migration
// migrateContent(); 