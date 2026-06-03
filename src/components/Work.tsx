import "./styles/Work.css";
import WorkImage from "./WorkImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const projects = [
  {
    title: "PlantIntel-AI",
    category: "AI Plant Analysis System",
    tools: "Python, AI, Image Processing, Neural Networks",
    image: "./images/plant_intel.png",
  },
  {
    title: "AI Cyber Security Advisor",
    category: "AI Security Recommendation System",
    tools: "Python, Machine Learning, Decision Making",
    image: "./images/cyber_advisor.png",
  },
  {
    title: "Color_Fista Project",
    category: "Python Data Analytics & Visualization",
    tools: "Python, Pandas, NumPy, Matplotlib, Data Visualization",
    image: "./images/color_fista.png",
  },
  {
    title: "Unity 3D AI Chatbot",
    category: "Unity-Based Conversational AI System",
    tools: "Unity 3D, C#, Voice Recognition, AI Integration",
    image: "./images/unity_chatbot.png",
  },
  {
    title: "LearnSphere-AI",
    category: "AI-Powered Learning Platform",
    tools: "Python, AI, Web Development, Personalized Learning",
    image: "./images/learn_sphere.png",
  },
  {
    title: "Donezo_",
    category: "Productivity & Task Management App",
    tools: "HTML, CSS, JavaScript, Productivity Tools",
    image: "./images/donezo.png",
  },
  {
    title: "Favourite Movie Collection",
    category: "Flask-Based Movie Management App",
    tools: "Flask, Python, HTML/CSS, SQL, Database Integration",
    image: "./images/placeholder.webp",
  },
];

const Work = () => {
  useGSAP(() => {
    let translateX: number = 0;

    function setTranslateX() {
      const box = document.getElementsByClassName("work-box");
      if (box.length === 0) return;
      const rectLeft = document
        .querySelector(".work-container")!
        .getBoundingClientRect().left;
      const rect = box[0].getBoundingClientRect();
      const parentWidth = box[0].parentElement!.getBoundingClientRect().width;
      let padding: number =
        parseInt(window.getComputedStyle(box[0]).padding) / 2;
      translateX = rect.width * box.length - (rectLeft + parentWidth) + padding;
    }

    setTranslateX();

    let timeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".work-section",
        start: "top top",
        end: `+=${translateX}`, // Use actual scroll width
        scrub: true,
        pin: true,
        id: "work",
      },
    });

    timeline.to(".work-flex", {
      x: -translateX,
      ease: "none",
    });

    // Clean up
    return () => {
      timeline.kill();
      ScrollTrigger.getById("work")?.kill();
    };
  }, []);

  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>
        <div className="work-flex">
          {projects.map((project, index) => (
            <div className="work-box" key={index}>
              <div className="work-info">
                <div className="work-title">
                  <h3>0{index + 1}</h3>

                  <div>
                    <h4>{project.title}</h4>
                    <p>{project.category}</p>
                  </div>
                </div>
                <h4>Tools and features</h4>
                <p>{project.tools}</p>
              </div>
              <WorkImage image={project.image} alt={project.title} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;
