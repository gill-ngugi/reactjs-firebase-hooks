// components/admin/SkillForm.js
import { useState, useEffect } from 'react';
import { db } from '../../config/firebase';
import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  query, 
  onSnapshot, 
  serverTimestamp 
} from 'firebase/firestore';

function SkillForm() {
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState({ name: '', proficiency: '' });
  const [editing, setEditing] = useState(null);

  // Fetch skills on component mount
  useEffect(() => {
    const q = query(collection(db, 'skills'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const skillsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setSkills(skillsData);
    });

    return () => unsubscribe();
  }, []);

  // Add new skill
  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'skills'), {
        ...newSkill,
        createdAt: serverTimestamp()
      });
      setNewSkill({ name: '', proficiency: '' });
    } catch (error) {
      console.error('Error adding skill:', error);
    }
  };

  // Update skill
  const handleUpdate = async (id) => {
    try {
      const skillRef = doc(db, 'skills', id);
      await updateDoc(skillRef, {
        ...editing,
        updatedAt: serverTimestamp()
      });
      setEditing(null);
    } catch (error) {
      console.error('Error updating skill:', error);
    }
  };

  // Delete skill
  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'skills', id));
    } catch (error) {
      console.error('Error deleting skill:', error);
    }
  };

  return (
    <div className="skill-form">
      <h2>Manage Skills</h2>
      
      {/* Add Skill Form */}
      <form onSubmit={handleAdd}>
        <input
          type="text"
          value={newSkill.name}
          onChange={(e) => setNewSkill({...newSkill, name: e.target.value})}
          placeholder="Skill Name"
          required
        />
        <select
          value={newSkill.proficiency}
          onChange={(e) => setNewSkill({...newSkill, proficiency: e.target.value})}
          required
        >
          <option value="">Select Proficiency</option>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>
        <button type="submit">Add Skill</button>
      </form>

      {/* Skills List */}
      <div className="skills-list">
        {skills.map(skill => (
          <div key={skill.id} className="skill-item">
            {editing?.id === skill.id ? (
              // Edit Form
              <div className="edit-form">
                <input
                  type="text"
                  value={editing.name}
                  onChange={(e) => setEditing({...editing, name: e.target.value})}
                />
                <select
                  value={editing.proficiency}
                  onChange={(e) => setEditing({...editing, proficiency: e.target.value})}
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
                <button onClick={() => handleUpdate(skill.id)}>Save</button>
                <button onClick={() => setEditing(null)}>Cancel</button>
              </div>
            ) : (
              // Display Skill
              <div className="skill-display">
                <h3>{skill.name}</h3>
                <p>{skill.proficiency}</p>
                <button onClick={() => setEditing(skill)}>Edit</button>
                <button onClick={() => handleDelete(skill.id)}>Delete</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default SkillForm;
