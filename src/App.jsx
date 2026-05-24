import './App.css'
import { useEffect, useState } from 'react'
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa"

function App() {
  const [activeSection, setActiveSection] = useState("home")

  useEffect(() => {

    const canvas = document.getElementById("network")
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    let particles = []

 for (let i = 0; i < 80; i++) {
   let x = Math.random() * canvas.width
  let y = Math.random() * canvas.height

  const cx = canvas.width / 2
  const cy = canvas.height / 2

  const distToCenter = Math.hypot(x - cx, y - cy)

  if (distToCenter < canvas.width * 0.2) {
    x = Math.random() < 0.5
      ? Math.random() * canvas.width * 0.15
      : canvas.width - Math.random() * canvas.width * 0.15

    y = Math.random() < 0.5
      ? Math.random() * canvas.height * 0.15
      : canvas.height - Math.random() * canvas.height * 0.15
  }

  particles.push({
    x,
    y,
    dx: (Math.random() - 0.5) * 0.4,
    dy: (Math.random() - 0.5) * 0.4
  })
}

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (let p of particles) {
        p.x += p.dx
        p.y += p.dy

        if (p.x < 0 || p.x > canvas.width) p.dx *= -1
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1

        ctx.beginPath()
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2)
        ctx.fillStyle = "#38bdf8"
        ctx.fill()

        for (let q of particles) {
          const dist = Math.hypot(p.x - q.x, p.y - q.y)

          if (dist < 140) {
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(q.x, q.y)
            ctx.strokeStyle = `rgba(56,189,248,${1 - dist / 140})`
            ctx.stroke()
          }
        }
      }

      requestAnimationFrame(animate)
    }

    animate()

    const resizeHandler = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener("resize", resizeHandler)

    const sections = document.querySelectorAll("section")

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.4 }
    )

    sections.forEach(sec => observer.observe(sec))

    return () => {
      window.removeEventListener("resize", resizeHandler)
      observer.disconnect()
    }

  }, [])

  const scrollToSection = (id) => {
  document.getElementById(id).scrollIntoView({
    behavior:"smooth",
    block:"start"
  })
}

  const downloadResume = () => {
    const link = document.createElement("a")
    link.href = "/resume.pdf"
    link.download = "Sambhavi_Jha_Resume.pdf"
    link.click()
  }

  return (
    <>
      <canvas id="network"></canvas>

      <nav className="nav">
        <div className="logo">Portfolio</div>

        <div className="links">
          <button onClick={() => scrollToSection("home")}>Home</button>
          <button onClick={() => scrollToSection("about")}>About</button>
          <button onClick={() => scrollToSection("skills")}>Skills</button>
          <button onClick={() => scrollToSection("projects")}>Projects</button>
          <button onClick={() => scrollToSection("education")}>Education</button>
          <button onClick={() => scrollToSection("certifications")}>Certifications</button>
          <button onClick={() => scrollToSection("contact")}>Contact</button>
        </div>
      </nav>

{/*HOME*/}
      <section id="home" className={`section hero page ${activeSection === "home" ? "active" : ""}`}>
        <div className="hero-content">

          <h1 className="name">Sambhavi Jha</h1>

          <p className="tagline">
            CSE Student | Full-Stack Developer | AI/ML Enthusiast
          </p>

          <p className="subtitle">
            Building modern web applications with clean UI and scalable backend systems.
          </p>

          <div className="buttons">
            <button  className="btn-primary" onClick={() => scrollToSection("projects")}>
              Explore My Work →
            </button>

            <button className="btn-primary" onClick={() => window.open("/resume.pdf", "_blank")}>
  View Resume
</button>

<button className="btn-secondary" onClick={downloadResume}>
  Download Resume
</button>
          </div>

          <div className="contact-icons">
    <a href="mailto:sambhavi.jha10@gmail.com">
      <FaEnvelope />
    </a>

    <a
      href="https://linkedin.com/in/sambhavijha"
      target="_blank"
      rel="noreferrer"
    >
      <FaLinkedin />
    </a>

    <a
      href="https://github.com/Sambhavijhaa"
      target="_blank"
      rel="noreferrer"
    >
      <FaGithub />
    </a>
  </div>

        </div>
      </section>
      {/*ABOUT*/}

      <section id="about" className={`section page ${activeSection === "about" ? "active" : ""}`}>
        <h2>About</h2>

        <div className="card">
          <p>
           I am a Computer Science Engineering student at KIIT University
            with a strong focus on full-stack development and AI/ML.
          </p>

          <p>
            I enjoy building responsive web applications, solving algorithmic problems,
             and creating user-focused projects with clean and functional design.
           </p>

           <p>Currently exploring software development,
             machine learning, and scalable system design.</p>

        </div>
      </section>


      <section id="skills" className={`section page ${activeSection === "skills" ? "active" : ""}`}>
        <h2>Skills</h2>

        <div className="grid">
          <div className="card"><h3>Languages</h3><p>Java</p><p>C/C++</p><p>JavaScript</p><p>Python</p></div>
          <div className="card"><h3>Frontend</h3><p>React</p><p>HTML</p><p>CSS</p></div>
          <div className="card"><h3>Backend</h3><p>Node.js</p><p>Express</p><p>REST APIs</p><p>JWT Authentication/OAuth</p></div>
          <div className="card"><h3>Database</h3><p>MongoDB</p></div>
          <div className="card"><h3>Tools</h3><p>Git</p><p>Github</p><p>VS Code</p><p>Postman</p><p>Render/Vercel/Netlify</p></div>
        </div>
      </section>

      
      {/* PROJECTS */}
<section
  id="projects"
  className={`section page ${activeSection === "projects" ? "active" : ""}`}
>
  <h2>Projects</h2>

  <div className="grid">

    {/*  PROJECT 1  */}
    <div className="card">
   <img
  src="/images/project1.png" alt="Poetry App Screenshot" className="project-img" />
      <h3>Unsaid by Heart – Poetry Web App</h3>

      <p>
        A full-stack poetry platform with authentication,
          interactive engagement features, and responsive UI.
      </p>

      <p><b>Key Features:</b></p>
      <ul>
        <li>JWT + Google OAuth authentication</li>
        <li>Admin dashboard for user & poem management</li>
        <li>Like, comment, search and sorting system</li>
        <li>Dark mode + responsive design</li>
      </ul>

      <p><b>Tech Stack:</b></p>
<div className="tech-stack">
  <span className="tech">HTML</span>
  <span className="tech">CSS</span>
  <span className="tech">Node.js</span>
  <span className="tech">Express.js</span>
  <span className="tech">MongoDB</span>
  <span className="tech">JWT</span>
</div>

      <div className="buttons">
        <button className="btn-secondary" onClick={() => window.open("https://github.com/Sambhavijhaa/poetry-website")}>
          GitHub
        </button>

        <button className="btn-secondary" onClick={() => window.open("https://unsaidby-heart.onrender.com/")}>
          Live Site
        </button>
      </div>
    </div>


    {/*  PROJECT 2  */}
    <div className="card">
      <img
      src="/images/project2.png" alt="bitcn_drsn Screenshot" className="project-img" />
      <h3>Software Vulnerability Detection (BiTCN + DRSN)</h3>

      <p>
        Hybrid ML system for detecting source-code
         vulnerabilities using static analysis and deep learning
      </p>

      <p><b>Key Features:</b></p>
      <ul>
        <li>Regex-based static unsafe code detection</li>
        <li>BiTCN sequential feature extraction</li>
        <li>DRSN noise reduction pipeline</li>
        <li>SAFE / VULNERABLE classification</li>
        <li>Custom labeled dataset for training and evaluation</li>
      </ul>

      <p><b>Tech Stack:</b></p>
<div className="tech-stack">
  <span className="tech">Python</span>
  <span className="tech">PyTorch</span>
  <span className="tech">Regex</span>
  <span className="tech">Machine Learning</span>
  <span className="tech">Deep Learning</span>
</div>
      
      <div className="buttons">
        <button className="btn-secondary" onClick={() => window.open("https://github.com/Sambhavijhaa/ML-vulnerability-detection")}>
          GitHub
        </button>
      </div>
    </div>


    {/*  PROJECT 3 */}
    <div className="card">
      <img
      src="/images/project3.png" alt="Portfolio Screenshot" className="project-img" />
      <h3>Personal Portfolio Website</h3>

      <p>
        A fully responsive personal portfolio website built using React to showcase my 
        projects, skills, and experience with a modern interactive UI and smooth navigation.
      </p>

      <p><b>Key Features:</b></p>
      <ul>
        <li>Smooth scroll navigation between sections</li>
        <li>Animated particle network background for modern UI feel</li>
        <li>Responsive design for all devices</li>
        <li>Project showcase with screenshots and GitHub/live links</li>
        <li>Resume download and view functionality</li>
        <li>Clean glassmorphism-based UI components</li>
      </ul>

      <p><b>Tech Stack:</b></p>
<div className="tech-stack">
  <span className="tech">React</span>
  <span className="tech">JavaScript</span>
  <span className="tech">CSS</span>
</div>

      <div className="buttons">
        <button className="btn-secondary" onClick={() => window.open("https://github.com/Sambhavijhaa/portfolio-website")}>
          GitHub
        </button>

        <button className="btn-secondary" onClick={() => window.open("https://sambhavi-portfolio.vercel.app/")}>
          Live Site
        </button>
      </div>
    </div>

  </div>
</section>

      {/* EDUCATION */}
      <section id="education" className={`section page ${activeSection === "education" ? "active" : ""}`}>
        <h2>Education</h2>

        <div className="card">
          <h3>KIIT University</h3>
          <p>B.Tech - Computer Science Engineering</p>
          <p>2023 - 2027</p>
        </div>
      </section>

      {/* CERTIFICATIONS */}
      <section id="certifications" className={`section page ${activeSection === "certifications" ? "active" : ""}`}>
        <h2>Certifications</h2>

        <div className="grid">

          <div className="card">
            <h3>AWS Solutions Architecture - Forage</h3>
            <p>Learned AWS cloud fundamentals and service architecture.</p>
         <p>Built a scalable deployment solution using Elastic Beanstalk.</p>
            <button className="btn-secondary" onClick={() => window.open("https://drive.google.com/file/d/1kzteJ32hSeQyL9mXcuFXJ6vsNFSrUbK2/view")}>
              View Certificate
            </button>
          </div>

          <div className="card">
            <h3>Deloitte Data Analytics - Forage</h3>
            <p>Completed a virtual simulation on data analysis and business insights.</p>
  <p>Worked on interpreting datasets and visualizing trends.</p>
            <button className="btn-secondary" onClick={() => window.open("https://drive.google.com/file/d/19Xr71UW4VffC9ZQi1uQEyc5N_rZbKwu-/view")}>
              View Certificate
            </button>
          </div>

           <div className="card">
            <h3>Smart India Hackathon 2025</h3>
             <p>Designed a gamified learning platform for rural students.</p>
      <p>Collaborated in a team to propose a working prototype under time constraints.</p>
            <button className="btn-secondary" onClick={() => window.open("https://drive.google.com/file/d/1MoGirAmtHaII4dyVfy9qoWqNJ3K4fzLQ/view")}>
              View Certificate
            </button>
          </div>

           <div className="card">
            <h3>JavaScript - FreeCodeCamp </h3>

            <p>Learned core JavaScript concepts including functions, DOM, and logic building.</p>
<p>Improved problem-solving through hands-on practice.</p>
            <button className="btn-secondary" onClick={() => window.open("https://drive.google.com/file/d/1QSK19MZasNtkebfRQmL3qXhWqB8h3o-j/view")}>
              View Certificate
            </button>
          </div>

          <div className="card">
            <h3>CSS Basics - HackerRank</h3>
            <p>Learned CSS fundamentals including layout, styling, and responsiveness.</p>
  <p>Built clean and responsive UI designs through practice.</p>
            <button className="btn-secondary" onClick={() => window.open("https://drive.google.com/file/d/1PPWfDDvw0aig9dExI0LTKYkU3iS1zKBD/view")}>
              View Certificate
            </button>
          </div>

        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className={`section page ${activeSection === "contact" ? "active" : ""}`}>
        <h2>Contact</h2>

        <p className="contact-text">
    Open to internships, collaborations, and tech opportunities.
    Feel free to connect.
  </p>

<div className="contact-info">

    <p>📧 Email: sambhavi.jha10@gmail.com</p>

    <p>📍 Location: Bhubaneswar, India</p>

  </div>
        <div className="contact-icons">

          <a href="mailto:sambhavi.jha10@gmail.com">
            <FaEnvelope />
          </a>

          <a
      href="https://linkedin.com/in/sambhavijha"
      target="_blank"
      rel="noreferrer"
    >
      <FaLinkedin />
    </a>

    <a
      href="https://github.com/Sambhavijhaa"
      target="_blank"
      rel="noreferrer"
    >
      <FaGithub />
    </a>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        © 2026 Sambhavi Jha | Built with React
      </footer>
    </>
  )
}

export default App