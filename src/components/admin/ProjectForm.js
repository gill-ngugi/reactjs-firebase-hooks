import { useState } from 'react';
import { db } from '../../config/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

function ProjectForm() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [technologies, setTechnologies] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addDoc(collection(db, 'projects'), {
                title,
                description,
                technologies: technologies.split(',').map(tech => tech.trim()),
                createdAt: serverTimestamp()
            });
            setTitle('');
            setDescription('');
            setTechnologies('');
        } catch (error) {
            console.error('Error adding project:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Project Title"
                required
            />
            <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Project Description"
                required
            />
            <input
                type="text"
                value={technologies}
                onChange={(e) => setTechnologies(e.target.value)}
                placeholder="Technologies (comma-separated)"
                required
            />
            <button type="submit">Add Project</button>
        </form>
    );
}

export default ProjectForm;
