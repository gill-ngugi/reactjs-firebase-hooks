import { useState, useEffect } from 'react';
import { db } from '../../config/firebase';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import '../styles/Skills.css';

function Skills() {
    const [skills, setSkills] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const q = query(collection(db, 'skills'), orderBy('proficiency', 'desc'));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const skillsData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));

            // Group skills by category
            const groupedSkills = skillsData.reduce((acc, skill) => {
                const category = skill.category || 'Other';
                if (!acc[category]) {
                    acc[category] = [];
                }
                acc[category].push(skill);
                return acc;
            }, {});

            setSkills(groupedSkills);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    if (loading) {
        return (
            <div className="skills-loading">
                <p>Loading skills...</p>
            </div>
        );
    }

    return (
        <div className="skills-container">
            <h2 className="skills-title">Technical Skills</h2>

            {Object.entries(skills).map(([category, categorySkills]) => (
                <div key={category} className="skills-category">
                    <h3 className="category-title">{category}</h3>
                    <div className="skills-grid">
                        {categorySkills.map(skill => (
                            <div key={skill.id} className="skill-card">
                                <h4 className="skill-name">{skill.name}</h4>
                                <div className="skill-proficiency">
                                    <div
                                        className="proficiency-bar"
                                        style={{
                                            width: `${skill.proficiencyLevel}%`,
                                            backgroundColor: getProficiencyColor(skill.proficiencyLevel)
                                        }}
                                    />
                                </div>
                                {skill.description && (
                                    <p className="skill-description">{skill.description}</p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}

// Helper function to determine proficiency bar color
function getProficiencyColor(level) {
    if (level >= 80) return '#28a745'; // Expert
    if (level >= 60) return '#17a2b8'; // Advanced
    if (level >= 40) return '#ffc107'; // Intermediate
    return '#dc3545'; // Beginner
}

export default Skills;
