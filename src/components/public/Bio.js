import { useState, useEffect } from 'react';
import { db } from '../../config/firebase';
import { doc, getDoc } from 'firebase/firestore';
import '../styles/Bio.css';

function Bio() {
  const [bioData, setBioData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBio = async () => {
      try {
        const bioDoc = await getDoc(doc(db, 'bio', 'main'));
        if (bioDoc.exists()) {
          setBioData(bioDoc.data());
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching bio:', error);
        setLoading(false);
      }
    };

    fetchBio();
  }, []);

  if (loading) {
    return (
      <div className="bio-loading">
        <p>Loading bio...</p>
      </div>
    );
  }

  if (!bioData) {
    return (
      <div className="bio-error">
        <p>Bio information not available.</p>
      </div>
    );
  }

  return (
    <div className="bio-container">
      <div className="bio-header">
        <div className="bio-image-container">
          {bioData.imageUrl && (
            <img 
              src={bioData.imageUrl} 
              alt={bioData.name} 
              className="bio-image"
            />
          )}
        </div>
        <div className="bio-title-section">
          <h1 className="bio-name">{bioData.name}</h1>
          <h2 className="bio-title">{bioData.title}</h2>
        </div>
      </div>

      <div className="bio-content">
        <section className="bio-section">
          <h3>About Me</h3>
          <p className="bio-text">{bioData.about}</p>
        </section>

        {bioData.experience && (
          <section className="bio-section">
            <h3>Experience</h3>
            <div className="experience-timeline">
              {bioData.experience.map((exp, index) => (
                <div key={index} className="experience-item">
                  <div className="experience-date">{exp.period}</div>
                  <div className="experience-details">
                    <h4>{exp.role}</h4>
                    <h5>{exp.company}</h5>
                    <p>{exp.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {bioData.education && (
          <section className="bio-section">
            <h3>Education</h3>
            <div className="education-list">
              {bioData.education.map((edu, index) => (
                <div key={index} className="education-item">
                  <h4>{edu.degree}</h4>
                  <h5>{edu.institution}</h5>
                  <p>{edu.period}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {bioData.interests && (
          <section className="bio-section">
            <h3>Interests</h3>
            <div className="interests-list">
              {bioData.interests.map((interest, index) => (
                <span key={index} className="interest-tag">
                  {interest}
                </span>
              ))}
            </div>
          </section>
        )}

        <section className="bio-section">
          <h3>Contact</h3>
          <div className="contact-info">
            {bioData.email && (
              <a href={`mailto:${bioData.email}`} className="contact-link">
                {bioData.email}
              </a>
            )}
            {bioData.linkedin && (
              <a 
                href={bioData.linkedin} 
                target="_blank" 
                rel="noopener noreferrer"
                className="contact-link"
              >
                LinkedIn
              </a>
            )}
            {bioData.github && (
              <a 
                href={bioData.github}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-link"
              >
                GitHub
              </a>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

export default Bio;
