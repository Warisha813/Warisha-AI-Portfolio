import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>AI Intern</h4>
                <h5>NUST School of Electrical Engineering & Computer Science (SEECS)</h5>
              </div>
              <h3>2024</h3>
            </div>
            <p>
              Studied supervised, unsupervised, and reinforcement learning approaches, exploring the complete AI data lifecycle. Participated in technical research sessions and developed analytical and problem-solving skills.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>AI-Powered Data Insights Virtual Intern</h4>
                <h5>Rochester Institute of Technology (RIT) – Excelerate</h5>
              </div>
              <h3>2025</h3>
            </div>
            <p>
              Applied AI-powered approaches to data analysis, trend identification, and insight generation. Awarded "Star Performer" recognition for outstanding contributions and analytical excellence.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>BS in AI</h4>
                <h5>Pak-Austria Fachhochschule (PAF-IAST)</h5>
              </div>
              <h3>PRESENT</h3>
            </div>
            <p>
              Undergraduate program specializing in Artificial Intelligence. Building a strong foundation in machine learning fundamentals, Python programming, research methodologies, and intelligent systems.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
