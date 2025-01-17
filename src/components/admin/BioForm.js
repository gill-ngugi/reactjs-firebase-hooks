import { useState, useEffect } from 'react';
import { db } from '../../config/firebase';
import {
    doc,
    setDoc,
    getDoc,
    serverTimestamp
} from 'firebase/firestore';

function BioForm() {
    const [bio, setBio] = useState({
        name: '',
        title: '',
        summary: '',
        email: '',
        linkedin: '',
        github: ''
    });
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchBio = async () => {
            try {
                const bioDoc = await getDoc(doc(db, 'bio', 'main'));
                if (bioDoc.exists()) {
                    setBio(bioDoc.data());
                }
                setLoading(false);
            } catch (error) {
                console.error('Error fetching bio:', error);
                setLoading(false);
            }
        };

        fetchBio();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await setDoc(doc(db, 'bio', 'main'), {
                ...bio,
                updatedAt: serverTimestamp()
            });
            setMessage('Bio updated successfully!');
            setTimeout(() => setMessage(''), 3000);
        } catch (error) {
            console.error('Error updating bio:', error);
            setMessage('Error updating bio. Please try again.');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBio(prevBio => ({
            ...prevBio,
            [name]: value
        }));
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="bio-form">
            <h2>Update Bio</h2>
            {message && <div className={message.includes('Error') ? 'error' : 'success'}>{message}</div>}

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Full Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={bio.name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="title">Professional Title</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={bio.title}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="summary">Professional Summary</label>
                    <textarea
                        id="summary"
                        name="summary"
                        value={bio.summary}
                        onChange={handleChange}
                        rows="6"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={bio.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="linkedin">LinkedIn URL</label>
                    <input
                        type="url"
                        id="linkedin"
                        name="linkedin"
                        value={bio.linkedin}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="github">GitHub URL</label>
                    <input
                        type="url"
                        id="github"
                        name="github"
                        value={bio.github}
                        onChange={handleChange}
                    />
                </div>

                <button type="submit" className="submit-button">Update Bio</button>
            </form>
        </div>
    );
}

export default BioForm;
