import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';

function App() {
  // Hero carousel images
  const heroImages = [
    {
      src: "assets/img/background/dujiangyan.JPG",
      alt: "Dujiangyan, China",
      caption: "Dujiangyan Irrigation System"
    },
    {
      src: "assets/img/background/nyc.JPG",
      alt: "New York, NY",
      caption: "NYC Skyline"
    },
    {
      src: "assets/img/background/monteverde.JPG",
      alt: "Monteverde, Costa Rica",
      caption: "Hanging Bridges in Monteverde"
    },
    {
      src: "assets/img/background/austin.JPG",
      alt: "Austin Texas",
      caption: "Lady Bird Lake in Austin"
    },
    {
      src: "assets/img/background/amazon.JPG",
      alt: "Amazon",
      caption: "My time as an Amazonian"
    },
    {
      src: "assets/img/background/chengdu.JPG",
      alt: "Chengdu",
      caption: "Bamboo Fountains in Chengdu"
    },
    {
      src: "assets/img/background/seattle.JPG",
      alt: "Seattle",
      caption: "Hiking in Seattle"
    },
    {
      src: "assets/img/background/zhangjiajie.JPG",
      alt: "Zhangjiajie",
      caption: "Zhangjiajie National Forest Park - Avatar Mountains"
    }
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [expandedCards, setExpandedCards] = useState({});

  // Work experience data with summary and full details
  const workExperiences = [
    {
      id: 'amazon-intern',
      title: "Systems Development Engineer Intern",
      company: "Amazon Inc. (Whole Foods) - World-Wide Grocery Tech",
      period: "May 2025 - Aug. 2025",
      location: "Austin, TX",
      image: "assets/img/wholefoods.JPG",
      summary: "Improved an existing tool using AI-driven forecasting and analytics",
      keySkills: ["Python", "SQL", "AWS", "Machine Learning", "Data Analytics"],
      fullDescription: [
        "Engineered AI-driven forecasting and anomaly detection on historical datasets, cutting investigation cycles by ~25% through Python scripting and SQL in Athena, while contributing to system design discussions that improved long-term data strategy",
        "Streamlined log pipelines for scalability and reliability, driving ~45% storage savings, ~10% latency reduction, and ~15% reliability gains by automating deltas and snapshots with AWS Lambda, CDK, CloudWatch, and S3",
        "Designed interactive analytics that reduced manual reporting effort by ~40%, building QuickSight dashboards with Amazon Q natural language queries, and authoring documentation to support compliance, onboarding, and long-term maintainability"
      ],
      allSkills: ["Python", "SQL", "AWS Athena", "AWS Lambda", "AWS CDK", "CloudWatch", "S3", "QuickSight", "Amazon Q", "Machine Learning", "Data Analytics", "System Design", "Documentation"]
    },
    {
      id: 'it-worker',
      title: "Student IT Support Technician",
      company: "NYU Faculty of Arts and Sciences",
      period: "Jan. 2024 - Dec. 2025",
      location: "New York, NY",
      image: "assets/img/nyu_fas.JPG",
      summary: "Providing technical support and troubleshooting for university systems",
      keySkills: ["Technical Support", "Hardware Setup", "Problem Solving", "Customer Service"],
      fullDescription: [
        "Orchestrated Tier 1 technical support in computer setups, printer troubleshooting, and mobile device assistance",
        "Resolved 95% of technical issues within first contact, improving user satisfaction",
        "Maintained detailed documentation of common issues and solutions for team reference"
      ],
      allSkills: ["Windows/Mac/Linux Support", "Printer Management", "Mobile Device Setup", "Network Troubleshooting", "Documentation", "Customer Service"]
    },
    {
      id: 'operations-attendant',
      title: "Operations Attendant",
      company: "NYU Athletics",
      period: "Oct. 2023 - Aug. 2024",
      location: "New York, NY",
      image: "assets/img/nyu_404.jpg",
      summary: "Managed athletic facility operations and earned Emerging Leader Award",
      keySkills: ["Operations Management", "Leadership", "Event Coordination", "Team Collaboration"],
      fullDescription: [
        "Achieved the 'Emerging Leader Award' while elevating operational excellence in athletic facilities",
        "Coordinated daily operations for multiple athletic events and facility usage",
        "Trained new staff members on safety protocols and operational procedures"
      ],
      allSkills: ["Facility Management", "Event Planning", "Safety Protocols", "Staff Training", "Leadership", "Communication", "Emergency Response"]
    },
    {
      id: 'ra-assistant',
      title: "Summer (RA) Assistant",
      company: "NYU Office of Residential Life and Housing Services",
      period: "May 2024 - Aug. 2024",
      location: "New York, NY",
      image: "assets/img/nyu_gram.jpg",
      summary: "Supported 700+ summer residents through data management and administrative tasks",
      keySkills: ["Data Management", "Administrative Support", "Resident Services", "Excel/Database"],
      fullDescription: [
        "Elevated productivity through data management as an office assistant while supporting 700+ summer residents",
        "Streamlined check-in/check-out processes, reducing wait times by 40%",
        "Created and maintained comprehensive databases for resident information and facility usage"
      ],
      allSkills: ["Excel", "Database Management", "Administrative Tasks", "Resident Relations", "Process Improvement", "Data Analysis", "Customer Service"]
    }
  ];

  // Projects data with summary and full details
  const projects = [
    {
      id: 'itch-io-games',
      title: "Game Development Portfolio on itch.io",
      period: "2023 - Present",
      location: "Brooklyn, NY",
      image: "assets/img/portfolio/game.jpeg",
      summary: "Collection of indie games developed using Godot and Game Maker",
      keySkills: ["Godot", "Game Maker", "Game Design", "Game Development"],
      link: "https://stevloc.itch.io/",
      fullDescription: [
        "Developed and published multiple indie games on itch.io using Godot and Game Maker engines",
        "Explored various game genres and mechanics to build a diverse portfolio of playable experiences",
        "Applied game design principles including player feedback, level design, and gameplay balancing",
        "Iterated on game concepts based on player feedback and testing to improve user experience"
      ],
      allSkills: ["Godot", "Game Maker", "Game Design", "Level Design", "Game Mechanics", "Player Testing", "2D Graphics", "Game Publishing"]
    },
    {
      id: 'jira-service',
      title: "Jira Service Adapter",
      period: "Sep. 2025 - Dec. 2025",
      location: "Brooklyn, NY",
      image: "assets/img/jira.png",
      summary: "Built Jira microservice with OAuth 2.0, FastAPI, and CI/CD deployment achieving 90% test coverage",
      keySkills: ["FastAPI", "OAuth 2.0", "CI/CD", "Python"],
      link: "https://github.com/kiamygomes/osdp-team6",
      fullDescription: [
        "Implemented a Jira microservice by defining clean API design, integrating OAuth 2.0, and deploying FastAPI service to public cloud environment with reliable CI/CD integration using automated build and deployment pipelines",
        "Improved service stability by maintaining typed interfaces, passing all required mypy and Ruff checks, and developing unit, integration, and E2E tests that achieved 90% coverage, ensuring consistent API behavior and dependable client generation"
      ],
      allSkills: ["FastAPI", "Python", "OAuth 2.0", "Microservices", "CI/CD", "Cloud Deployment", "mypy", "Ruff", "Unit Testing", "Integration Testing", "E2E Testing", "API Design", "Typed Interfaces"]
    },
    {
      id: 'hustle-hub',
      title: "Hustle Hub Job Board",
      period: "Jan. 2025 - Dec. 2025",
      location: "Brooklyn, NY",
      image: "assets/img/portfolio/jobboard.JPG",
      summary: "Multi-language job board expanding access for underserved communities",
      keySkills: ["Angular", "Django", "PostgreSQL", "Multi-language Support"],
      link: "https://github.com/HanmingXiong/HustleHub",
      fullDescription: [
        "Built a multi-language job board that expanded access to job and financial resources for underserved communities by ~40%",
        "Improved usability for non-technical users through intuitive Angular frontend design",
        "Optimized workflows, security, and backend performance, increasing accessibility by ~25%",
        "Streamlined the application process by ~30% through scalable system design and compliance-focused development"
      ],
      allSkills: ["Angular", "Django", "PostgreSQL", "Multi-language Localization", "Security", "Performance Optimization", "System Design", "Compliance"]
    },
    {
      id: 'staypal',
      title: "StayPal – Smart Roommate Finder",
      period: "Sep. 2025 - Present",
      location: "Brooklyn, NY",
      image: "assets/img/portfolio/roommates.jpg",
      summary: "Cross-platform roommate-matching app for interns seeking affordable housing",
      keySkills: ["React Native", "Firebase", "PostgreSQL", "Mobile Development"],
      fullDescription: [
        "Planned a cross-platform roommate-matching app to help interns find affordable housing",
        "Designed MVP architecture with React Native for cross-platform compatibility",
        "Outlined product roadmap for swipe-based matching and real-time chat features",
        "Scoped features, user flows, and technical stack for target MVP delivery in ~6–8 weeks"
      ],
      allSkills: ["React Native", "Firebase", "PostgreSQL", "Mobile App Development", "Product Planning", "User Experience Design", "Real-time Chat", "Matching Algorithms"]
    },
    {
      id: 'computer-simulation',
      title: "Computer Simulation Projects",
      period: "Jan. 2025 - May 2025",
      location: "New York, NY",
      image: "assets/img/portfolio/simulation.JPG",
      summary: "MATLAB simulations analyzing urban systems, ecological dynamics, and natural phenomena",
      keySkills: ["MATLAB", "Simulation Modeling", "Data Analysis", "Visualization"],
      link: "https://github.com/stevloc/matlab/tree/main",
      fullDescription: [
        "Wildfire Simulation: Developed a cellular automaton model simulating wildfire spread using probabilistic propagation across a 2D forest grid with dynamic visualization",
        "Urban Rat Population Simulation: Created a seasonal Lotka-Volterra model simulating rat, feral cat, and hawk populations in NYC with logistic growth and predator-prey interactions using forward Euler integration",
        "Urban Layout Efficiency Analysis: Compared travel efficiency between Manhattan (grid) and Amsterdam (radial) street layouts through 1000-trial simulations, measuring Euclidean vs. actual path distance ratios with statistical visualization"
      ],
      allSkills: ["MATLAB", "Cellular Automaton", "Lotka-Volterra Models", "Forward Euler Integration", "Statistical Analysis", "Data Visualization", "Simulation Design", "Mathematical Modeling"]
    },
    {
      id: 'brass-bets',
      title: "Brass Bets Casino Board Game",
      period: "Sep. 2024 - Dec. 2024",
      location: "Shanghai, CN",
      image: "assets/img/portfolio/brassbets.JPG",
      summary: "Engaging casino-themed board game developed during study abroad",
      keySkills: ["Game Design", "Strategy", "Cultural Integration", "Creative Development"],
      link: "https://drive.google.com/file/d/1pk06BFISqoWgiJO6HdbS6oZ7biWPlDDg/view?usp=sharing",
      fullDescription: [
        "Developed an engaging casino-themed board game during my study away experience in Shanghai",
        "Integrated Chinese cultural elements with Western casino concepts for unique gameplay",
        "Designed balanced game mechanics that encourage strategic thinking and social interaction",
        "Created comprehensive rulebook and game materials for easy learning and setup"
      ],
      allSkills: ["Game Design", "Strategic Planning", "Cultural Research", "Creative Writing", "Prototyping", "User Testing", "Rule Development"]
    },
    {
      id: 'criminal-database',
      title: "Criminal Database",
      period: "Feb. 2024 - May 2024",
      location: "Brooklyn, NY",
      image: "assets/img/portfolio/database.jpeg",
      summary: "Advanced SQL database system with enhanced data management capabilities",
      keySkills: ["SQL", "phpMyAdmin", "Database Design", "Backend Development"],
      link: "https://github.com/paripatel55/DatabaseProject",
      fullDescription: [
        "Recreated backend of criminal database utilizing advanced SQL methods through phpMyAdmin",
        "Enhanced data management capabilities with complex queries and optimized performance",
        "Implemented functions, procedures, and triggers for filtering, addition, and deletion of records",
        "Designed normalized database schema to ensure data integrity and reduce redundancy"
      ],
      allSkills: ["SQL", "phpMyAdmin", "Database Design", "MySQL", "Data Normalization", "Stored Procedures", "Triggers", "Query Optimization"]
    },
    {
      id: 'farm-ninja',
      title: "Farm Ninja Game",
      period: "Mar. 2024 - May 2024",
      location: "Brooklyn, NY",
      image: "assets/img/portfolio/game.jpeg",
      summary: "Object-oriented C++ game with engaging gameplay mechanics",
      keySkills: ["C++", "Xcode", "Object-Oriented Programming", "Game Development"],
      link: "https://github.com/stevloc/farm_ninja",
      fullDescription: [
        "Engineered an engaging 'Farm Ninja' themed game using C++ and Xcode frameworks",
        "Employed object-oriented programming principles to design reusable and modular classes",
        "Enhanced gameplay mechanics and code maintainability through proper software architecture",
        "Implemented collision detection, scoring system, and progressive difficulty levels"
      ],
      allSkills: ["C++", "Xcode", "Object-Oriented Programming", "Game Logic", "Memory Management", "Debugging", "Software Architecture"]
    },
    {
      id: 'bounce-nyc',
      title: "Bounce NYC Game - miniHack-NYU",
      period: "Dec 2023",
      location: "New York, NY",
      image: "assets/img/portfolio/nyc.jpg",
      summary: "Python game developed during hackathon with focus on mechanics and interaction",
      keySkills: ["Python", "Pygame", "Game Mechanics", "Problem Solving"],
      link: "https://github.com/stevloc/bounce_nyc",
      fullDescription: [
        "Overcame 15+ unique coding challenges and graphical design issues during hackathon",
        "Enhanced game functionality and visual appeal through iterative development",
        "Coded over 150+ lines in Python using Pygame framework",
        "Focused on game mechanics and user interaction for engaging gameplay experience"
      ],
      allSkills: ["Python", "Pygame", "Game Development", "Graphics Programming", "Event Handling", "Animation", "Rapid Prototyping"]
    },
    {
      id: 'hpc-vip',
      title: "High-Performance Computing VIP",
      period: "Jun. 2023 - May 2024",
      location: "New York, NY",
      image: "assets/img/portfolio/hpc.jpg",
      summary: "Research project involving data lake optimization and ML performance benchmarking",
      keySkills: ["Python", "Data Analysis", "Machine Learning", "Research"],
      link: "https://engineering.nyu.edu/research-innovation/student-research/vertically-integrated-projects/vip-teams/high-performance-computing",
      fullDescription: [
        "Data Lake LIDAR Team: Developed entity-relationship diagrams and assisted faculty in optimizing the Research Data Lake repository",
        "Leveraged Python to enhance data organization on the Greene computer cluster for the Sunset Park LIDAR project",
        "MLPERF Team: Contributed to MLPerf Inference benchmarking, leading to 15% improvement in assessing ML model performance",
        "Enhanced model deployment strategies across diverse deployment scenarios"
      ],
      allSkills: ["Python", "Data Lake Architecture", "LIDAR Data Processing", "Machine Learning", "Performance Benchmarking", "Database Optimization", "Research Methodology"]
    },
    {
      id: 'sneakyclean',
      title: "Sneak y Clean",
      period: "Sep. 2022 - Dec. 2022",
      location: "Brooklyn, NY",
      image: "assets/img/portfolio/sneakyclean.jpg",
      summary: "Accessible shoe cleaner prototype for people with physical disabilities",
      keySkills: ["Fusion 360", "Product Design", "Prototyping", "Collaboration"],
      link: "https://engineering.nyu.edu/research-innovation/student-research/vertically-integrated-projects/vip-teams/high-performance-computing",
      fullDescription: [
        "Compiled and researched the most appropriate material for the prototype's design by reducing its original production cost by 30%, making it more efficient for its introduction to the market",
        "Constructed an accessible shoe cleaner prototype that offered an effortless cleaning option for everyday footwear for people with physical disabilities using Fusion 360 CAD software",
        "Collaborated with 2 other members to assess and develop all the necessary components by testing it at least 10 times before submitting its final results to the EG1004 department"
      ],
      allSkills: ["Fusion 360", "Rapid Prototyping", "Product Design", "Collaboration", "Project Management", "Database Optimization", "Research Methodology"]
    }
  ];

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === heroImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, [heroImages.length]);

  // Prevent image dragging globally
  useEffect(() => {
    const preventDrag = (e) => {
      if (e.target.tagName === 'IMG') {
        e.preventDefault();
        return false;
      }
    };

    document.addEventListener('dragstart', preventDrag);
    document.addEventListener('selectstart', preventDrag);

    return () => {
      document.removeEventListener('dragstart', preventDrag);
      document.removeEventListener('selectstart', preventDrag);
    };
  }, []);

  const handleDragStart = (e) => {
    e.preventDefault();
    return false;
  };

  const goToSlide = (index) => {
    setCurrentImageIndex(index);
  };

  const goToPrevious = () => {
    setCurrentImageIndex(currentImageIndex === 0 ? heroImages.length - 1 : currentImageIndex - 1);
  };

  const goToNext = () => {
    setCurrentImageIndex(currentImageIndex === heroImages.length - 1 ? 0 : currentImageIndex + 1);
  };

  const toggleCard = (cardId) => {
    setExpandedCards(prev => ({
      ...prev,
      [cardId]: !prev[cardId]
    }));
  };

  return (
    <div className="App">
      {/* Navigation */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        <div className="container">
          <a className="navbar-brand" href="#home" onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}>
            Steven Lo Cen
          </a>
          <div className="navbar-nav ms-auto">
            <a className="nav-link" href="#home" onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}>Home</a>
            <a className="nav-link" href="#about" onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}>About</a>
            <a className="nav-link" href="#resume" onClick={(e) => { e.preventDefault(); scrollToSection('resume'); }}>Resume</a>
            <a className="nav-link" href="#projects" onClick={(e) => { e.preventDefault(); scrollToSection('projects'); }}>Projects</a>
            <a className="nav-link" href="#journey" onClick={(e) => { e.preventDefault(); scrollToSection('journey'); }}>Journey</a>
            <a className="nav-link" href="#contact" onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}>Contact</a>
          </div>
        </div>
      </nav>

      {/* Hero Section with Carousel */}
      <section id="home" className="hero-section">
        <div className="hero-carousel">
          {heroImages.map((image, index) => (
            <img
              key={index}
              src={image.src}
              alt={image.alt}
              className={`hero-bg ${index === currentImageIndex ? 'active' : ''}`}
              draggable="false"
              onDragStart={handleDragStart}
            />
          ))}
        </div>

        <div className="container text-center text-white hero-content">
          <h1>Hello, I'm Steven</h1>
          <p className="lead">CS @ NYU • Prev Amazon SysDev Intern • Global Explorer • Aspiring AI/Tech Innovator</p>
          <p className="hero-caption">{heroImages[currentImageIndex].caption}</p>
        </div>

        {/* Carousel Controls */}
        <button className="carousel-control prev" onClick={goToPrevious}>
          <i className="bi bi-chevron-left"></i>
        </button>
        <button className="carousel-control next" onClick={goToNext}>
          <i className="bi bi-chevron-right"></i>
        </button>

        {/* Carousel Indicators */}
        <div className="carousel-indicators">
          {heroImages.map((_, index) => (
            <button
              key={index}
              className={`indicator ${index === currentImageIndex ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
            ></button>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-5">
        <div className="container">
          <h2 className="text-center mb-5">About Me</h2>
          <div className="row">
            <div className="col-md-6">
              <img src="assets/img/profile-img.jpg" className="img-fluid rounded mb-4" alt="Steven Lo Cen" draggable="false" onDragStart={handleDragStart} />

              <div className="row">
                <div className="col-md-12">
                  <h5><strong>Programming Languages</strong></h5>
                  <ul className="list-unstyled mb-3">
                    <li>Python (Proficient)</li>
                    <li>Java, C++/C (Intermediate)</li>
                    <li>JavaScript, TypeScript, HTML/CSS (Beginner)</li>
                  </ul>

                  <h5><strong>Tools/Frameworks</strong></h5>
                  <ul className="list-unstyled mb-3">
                    <li>React, Flask, AWS, AWS CDK</li>
                    <li>Kubernetes, GPT, MATLAB</li>
                    <li>Git, CI/CD, Agile Development</li>
                  </ul>
                </div>
              </div>

              <div className="row">

                <h5><strong>Databases</strong></h5>
                <ul className="list-unstyled">
                  <li>SQL (MySQL)</li>
                  <li>NoSQL (DynamoDB)</li>
                </ul>


                <h5><strong>Operating Systems</strong></h5>
                <ul className="list-unstyled">
                  <li>Linux (Ubuntu)</li>
                  <li>macOS</li>
                  <li>Windows</li>
                </ul>
              </div>
            </div>

            <div className="col-md-6">
              <div className="mb-4">
                <p><strong>Name:</strong> Steven Lo Cen (老嘉荣)</p>
                <p><strong>Email:</strong> stevloc03@gmail.com</p>
                <p><strong>School Email:</strong> steven.lo@nyu.edu</p>
                <p><strong>Current Location:</strong> New York, NY</p>
                <p><strong>Hometown:</strong> San Jose, Costa Rica</p>
                <p><strong>Professional Interests:</strong> AI, Game Design, Cybersecurity, Software Engineering, Emerging Technologies, Smart Cities, Human Computer Interaction</p>
                <p><strong>Personal Interests:</strong> Travel, Cooking, Running, Hiking, Cafés, Biking (Citibike), Photography, Music, Pickleball, Cultural Exploration</p>
              </div>

              <div>
                <p>Welcome to my personal website!</p>
                <p>
                  Hi! I'm Steven Lo, a Chinese Costa Rican Computer Science student at NYU Tandon minoring in Mathematics and Game Engineering. I previously worked as a Systems Development Engineer Intern at Amazon, where I integrated AI-powered forecasting tools and deployed scalable AWS pipelines.
                </p>
                <p>
                  I'm passionate about combining innovation with practical solutions and have a strong interest in AI, Data Science, Game Design, and Software Engineering.
                  My ultimate goal is to build a career at the intersection of these fields, creating technology that makes a real impact.
                </p>
                <p>
                  Outside of tech, I enjoy hiking, cooking, biking, running, and exploring new places. I love trying different cuisines, spending time in nature, and discovering unique cultural experiences.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Resume Section */}
      <section id="resume" className="py-5 bg-light">
        <div className="container">
          <div className="text-center mb-5">
            <h2>Resume</h2>
            <a href="/resume/steven_lo_resume.pdf" target="_blank" rel="noopener noreferrer" className="btn btn-outline-primary">
              <i className="bi bi-download me-2"></i>Download PDF
            </a>
          </div>

          <div className="row">
            <div className="col-lg-6 mb-4">
              <h3 className="mb-4">Education</h3>

              <div className="card mb-4">
                <img src="assets/img/nyu_tandon.jpg"
                  className="card-img-top education-card-img" alt="NYU Campus" draggable="false" onDragStart={handleDragStart} />
                <div className="card-body">
                  <h5 className="card-title">
                    <a href="https://engineering.nyu.edu/" target="_blank" rel="noopener noreferrer" className="text-decoration-none">
                      New York University, Tandon School of Engineering
                    </a>
                  </h5>
                  <h6 className="card-subtitle mb-2 text-muted">B.S. Computer Science</h6>
                  <p className="card-text"><small className="text-muted">Sep. 2022 - May 2026 • Brooklyn, NY</small></p>
                  <ul className="list-unstyled">
                    <li><strong>Minors:</strong> Game Engineering, Mathematics</li>
                    <li><strong>Clubs:</strong> Chinese Mei Society (VP), Theta Tau (Webmaster), Tech@NYU, Society of Hispanic Professional Engineers (SHPE), HackNYU, Running Club</li>
                    <li><strong>Relevant Coursework:</strong> Data Structures, Algorithms, Databases, Game Programming, Object-Oriented Programming, Operating Systems</li>
                  </ul>
                </div>
              </div>

              <div className="card mb-4">
                <img src="assets/img/vinuni.jpg"
                  className="card-img-top education-card-img" alt="VinUniversity" draggable="false" onDragStart={handleDragStart} />
                <div className="card-body">
                  <h5 className="card-title">
                    <a href="https://vinuni.edu.vn/" target="_blank" rel="noopener noreferrer" className="text-decoration-none">
                      VinUniversity
                    </a>
                  </h5>
                  <h6 className="card-subtitle mb-2 text-muted">Study Away</h6>
                  <p className="card-text"><small className="text-muted">Jan. 2026 • Hanoi, VN</small></p>

                </div>
              </div>

              <div className="card mb-4">
                <img src="assets/img/nyu_shanghai.jpg"
                  className="card-img-top education-card-img" alt="NYU Shanghai Campus" draggable="false" onDragStart={handleDragStart} />
                <div className="card-body">
                  <h5 className="card-title">
                    <a href="https://shanghai.nyu.edu/" target="_blank" rel="noopener noreferrer" className="text-decoration-none">
                      上海纽约大学 New York University Shanghai
                    </a>
                  </h5>
                  <h6 className="card-subtitle mb-2 text-muted">Study Away</h6>
                  <p className="card-text"><small className="text-muted">Sep. 2024 - Dec. 2024 • Shanghai, CN</small></p>
                  <ul className="list-unstyled">
                    <li><strong>Clubs:</strong> Language Peer Mentor, Qilin Boxing Club</li>
                  </ul>
                </div>
              </div>
            

            
            </div>

            <div className="col-lg-6">
              <h3 className="mb-4">Work Experience</h3>

              {workExperiences.map((work) => (
                <div key={work.id} className={`card mb-3 expandable-card ${expandedCards[work.id] ? 'expanded' : ''}`}>
                  <img
                    src={work.image}
                    className={`card-img-top work-card-img ${expandedCards[work.id] ? 'expanded-img' : ''}`}
                    alt={work.title}
                    draggable="false"
                    onDragStart={handleDragStart}
                  />
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-start">
                      <div className="flex-grow-1">
                        <h5 className="card-title">{work.title}</h5>
                        <h6 className="card-subtitle mb-2 text-muted">{work.company}</h6>
                        <p className="card-text"><small className="text-muted">{work.period} • {work.location}</small></p>
                      </div>
                      <button
                        className="btn btn-link p-0 expand-btn"
                        onClick={() => toggleCard(work.id)}
                      >
                        <i className={`bi ${expandedCards[work.id] ? 'bi-chevron-up' : 'bi-chevron-down'}`}></i>
                      </button>
                    </div>

                    {/* Summary View */}
                    {!expandedCards[work.id] && (
                      <div className="summary-view">
                        <p className="card-text">{work.summary}</p>
                        <div className="key-skills">
                          <strong>Key Skills: </strong>
                          {work.keySkills.map((skill, index) => (
                            <span key={index} className="skill-tag">{skill}</span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Expanded View */}
                    {expandedCards[work.id] && (
                      <div className="expanded-view">
                        <div className="full-description">
                          <h6>Responsibilities & Achievements:</h6>
                          <ul>
                            {work.fullDescription.map((item, index) => (
                              <li key={index}>{item}</li>
                            ))}
                          </ul>
                        </div>
                        <div className="all-skills">
                          <h6>Technical Skills & Tools:</h6>
                          <div className="skills-grid">
                            {work.allSkills.map((skill, index) => (
                              <span key={index} className="skill-tag expanded">{skill}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {/* Add new work experiences here - Example: */}
              {/* 
              <div className="card">
                <img src="YOUR_IMAGE_URL" 
                     className="card-img-top work-card-img" 
                     alt="Job Description" 
                     draggable="false" 
                     onDragStart={handleDragStart} />
                <div className="card-body">
                  <h5 className="card-title">Your Job Title</h5>
                  <h6 className="card-subtitle mb-2 text-muted">Company Name</h6>
                  <p className="card-text"><small className="text-muted">Date Range • Location</small></p>
                  <p className="card-text">Job description and achievements</p>
                </div>
              </div>
              */}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-5">
        <div className="container">
          <h2 className="text-center mb-5">Projects</h2>

          <div className="row">
            {projects.map((project) => (
              <div key={project.id} className="col-lg-6 mb-4">
                <div className={`card h-100 expandable-card ${expandedCards[project.id] ? 'expanded' : ''}`}>
                  <img
                    src={project.image}
                    className={`card-img-top project-img ${expandedCards[project.id] ? 'expanded-img' : ''}`}
                    alt={project.title}
                    draggable="false"
                    onDragStart={handleDragStart}
                  />
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-start">
                      <div className="flex-grow-1">
                        <h5 className="card-title">
                          {project.link ? (
                            <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-decoration-none">
                              {project.title} <i className="bi bi-box-arrow-up-right"></i>
                            </a>
                          ) : (
                            project.title
                          )}
                        </h5>
                        <h6 className="card-subtitle mb-2 text-muted">
                          {project.period} {project.location && `• ${project.location}`}
                        </h6>
                      </div>
                      <button
                        className="btn btn-link p-0 expand-btn"
                        onClick={() => toggleCard(project.id)}
                      >
                        <i className={`bi ${expandedCards[project.id] ? 'bi-chevron-up' : 'bi-chevron-down'}`}></i>
                      </button>
                    </div>

                    {/* Summary View */}
                    {!expandedCards[project.id] && (
                      <div className="summary-view">
                        <p className="card-text">{project.summary}</p>
                        <div className="key-skills">
                          <strong>Key Technologies: </strong>
                          {project.keySkills.map((skill, index) => (
                            <span key={index} className="skill-tag">{skill}</span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Expanded View */}
                    {expandedCards[project.id] && (
                      <div className="expanded-view">
                        <div className="full-description">
                          <h6>Project Details & Achievements:</h6>
                          <ul>
                            {project.fullDescription.map((item, index) => (
                              <li key={index}>{item}</li>
                            ))}
                          </ul>
                        </div>
                        <div className="all-skills">
                          <h6>Technologies & Skills Used:</h6>
                          <div className="skills-grid">
                            {project.allSkills.map((skill, index) => (
                              <span key={index} className="skill-tag expanded">{skill}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Personal Journey Section */}
      <section id="journey" className="py-5 bg-light">
        <div className="container">
          <h2 className="text-center mb-5">Personal Journey</h2>

          {/* Costa Rica Section */}
          <div className="journey-location mb-5">
            <div className="row">
              <div className="col-lg-8 mx-auto text-center">
                <h3 className="mb-4">A Piece of Home: Costa Rica 🇨🇷</h3>
                <p className="lead">
                  I was born and raised in San José, Costa Rica, as the child of Chinese immigrants. 
                  Growing up in such a vibrant and welcoming environment shaped my outlook on life and taught me the importance of staying positive and open-minded.
                </p>
                <p>
                  Surrounded by Costa Rica's rich biodiversity — from rainforests to beaches — I developed a deep appreciation for nature, sustainability, and environmental care.
                  These values continue to influence how I approach my work, guiding me to create solutions that are thoughtful, balanced, and grounded in respect for both people and the world around us.
                </p>
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-12">
                <div className="journey-gallery">
                  <img src="assets/img/personal_journey/costarica1.JPG"
                    className="journey-img" alt="Costa Rica 1" draggable="false" onDragStart={handleDragStart} />
                  <img src="assets/img/personal_journey/costarica2.JPG"
                    className="journey-img" alt="Costa Rica 2" draggable="false" onDragStart={handleDragStart} />
                  <img src="assets/img/personal_journey/costarica3.JPG"
                    className="journey-img" alt="Costa Rica 3" draggable="false" onDragStart={handleDragStart} />
                  <img src="assets/img/personal_journey/costarica4.JPG"
                    className="journey-img" alt="Costa Rica 4" draggable="false" onDragStart={handleDragStart} />
                </div>
              </div>
            </div>
          </div>

          {/* NYC Section */}
          <div className="journey-location mb-5">
            <div className="row">
              <div className="col-lg-8 mx-auto text-center">
                <h3 className="mb-4">Shaping My Journey in New York City 🗽</h3>
                <p className="lead">
                  Moving to New York City to study at NYU Tandon has been one of the most transformative chapters of my life. Living in Brooklyn introduced me to a fast-paced, diverse, and dynamic environment that continuously challenges me to grow both academically and personally.
                </p>
                <p>
                  Adjusting to life in the city took time. Learning how to navigate the subway, balance a demanding course load, and manage work and extracurricular commitments taught me the importance of resilience, independence, and time management.
                  Through these experiences, I became more confident and adaptable, qualities that continue to guide me both inside and outside the classroom.
                </p>
                <p>
                  As I settled into city life, I also discovered a love for exploring New York's incredible food scene. I started using <strong>Beli</strong> to track my favorite restaurants, hidden gems, and new cuisines.
                  It's been a fun and rewarding way to connect with the city and its diverse cultures through food.
                </p>
                <p>
                The city's thriving tech ecosystem and cultural richness have broadened my perspective and deepened my passion for computer science and innovation.
                New York has shaped not only my academic journey but also how I appreciate creativity, community, and the little experiences that make life meaningful.
                </p>
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-12">
                <div className="journey-gallery">
                  <img src="assets/img/personal_journey/nyc1.JPG"
                    className="journey-img" alt="NYC 1" draggable="false" onDragStart={handleDragStart} />
                  <img src="assets/img/personal_journey/nyc2.JPG"
                    className="journey-img" alt="NYC 2" draggable="false" onDragStart={handleDragStart} />
                  <img src="assets/img/personal_journey/nyc3.JPG"
                    className="journey-img" alt="NYC 3" draggable="false" onDragStart={handleDragStart} />
                  <img src="assets/img/personal_journey/nyc4.JPG"
                    className="journey-img" alt="NYC 4" draggable="false" onDragStart={handleDragStart} />
                </div>
              </div>
            </div>
          </div>

          {/* Austin TX Section */}
          <div className="journey-location mb-5">
            <div className="row">
              <div className="col-lg-8 mx-auto text-center">
                <h3 className="mb-4">Hook 'Em and Eating Brisket in Austin 🐮</h3>
                <p className="lead">
                  My time in Austin, Texas was my first experience living in the state, and it became one of the most meaningful chapters of my life. I lived near the University of Texas at Austin campus, which allowed me to experience both the academic atmosphere and the city’s lively culture.
                </p>
                <p>
                  Living in Austin introduced me to the city’s thriving tech scene, from innovative startups to major companies. This exposure helped me better understand what I want to pursue in computer science and how technology can impact people’s everyday lives.
                </p>
                <p>
                  Outside of work, I enjoyed exploring Austin’s food scene. Terry Black’s BBQ and Cabo Bob’s quickly became two of my favorite spots. I also started running more frequently and used <strong>Strava</strong> to track my routes. Some of my best runs were along Lady Bird Lake at sunset and across the Congress Avenue Bridge, where I often stopped to watch the bats fly out in the evenings.
                </p>
                <p>
                  Austin taught me to stay curious, be active, and appreciate every experience along the way.
                </p>
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-12">
                <div className="journey-gallery">
                  <img src="assets/img/personal_journey/austin1.JPG"
                    className="journey-img" alt="Austin 1" draggable="false" onDragStart={handleDragStart} />
                  <img src="assets/img/personal_journey/austin2.JPG"
                    className="journey-img" alt="Austin 2" draggable="false" onDragStart={handleDragStart} />
                  <img src="assets/img/personal_journey/austin3.JPG"
                    className="journey-img" alt="Austin 3" draggable="false" onDragStart={handleDragStart} />
                  <img src="assets/img/personal_journey/austin4.JPG"
                    className="journey-img" alt="Austin 4" draggable="false" onDragStart={handleDragStart} />
                </div>
              </div>
            </div>
          </div>

          {/* China Section */}
          <div className="journey-location">
            <div className="row">
              <div className="col-lg-8 mx-auto text-center">
                <h3 className="mb-4">Adventures Across China 🇨🇳</h3>
                <p className="lead">
                  In Fall 2024, I studied away at NYU Shanghai, where I reconnected with my family roots and immersed myself in Chinese language and culture. I practiced Mandarin, learned to navigate daily life with apps like WeChat, Alipay, and Meituan, and enjoyed local favorites such as HeyTea, Chagee, Molly Tea, and Haidilao Hotpot.
                </p>
                <p>
                  Traveling on the Gaotie high-speed rail, I explored cities including Shanghai, Chongqing, Beijing, Chengdu, Wuhan, Guangzhou, Shenzhen, Hong Kong, Macau, Xi'an, and Nanjing, as well as the stunning landscapes of Zhangjiajie and Huangshan. Visiting landmarks like the Great Wall, the Forbidden City, and the Terracotta Warriors, and celebrating the Mid-Autumn Festival with friends, made the experience unforgettable.
                </p>
                <p>
                  My time in China strengthened my connection to my heritage and gave me a deeper appreciation for how culture, language, and people shape the way we see the world.
                </p>
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-12">
                <div className="journey-gallery">
                  <img src="assets/img/personal_journey/china1.JPG"
                    className="journey-img" alt="China 1" draggable="false" onDragStart={handleDragStart} />
                  <img src="assets/img/personal_journey/china2.JPG"
                    className="journey-img" alt="China 2" draggable="false" onDragStart={handleDragStart} />
                  <img src="assets/img/personal_journey/china3.JPG"
                    className="journey-img" alt="China 3" draggable="false" onDragStart={handleDragStart} />
                  <img src="assets/img/personal_journey/china4.JPG"
                    className="journey-img" alt="China 4" draggable="false" onDragStart={handleDragStart} />
                  <img src="assets/img/personal_journey/china5.jpg"
                    className="journey-img" alt="China 5" draggable="false" onDragStart={handleDragStart} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-5 bg-light">
        <div className="container">
          <h2 className="text-center mb-5">Contact Information</h2>
          <p className="text-center mb-4">Let's connect!</p>

          <div className="row text-center justify-content-center">
            <div className="col-lg-2 col-md-4 col-sm-6 mb-3">
              <a href="https://www.linkedin.com/in/stevloc" target="_blank" rel="noopener noreferrer" className="text-decoration-none contact-link">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg"
                  className="contact-logo" alt="LinkedIn" draggable="false" onDragStart={handleDragStart} />
                <h5 className="mt-2">LinkedIn</h5>
              </a>
            </div>
            <div className="col-lg-2 col-md-4 col-sm-6 mb-3">
              <a href="mailto:stevloc03@gmail.com" className="text-decoration-none contact-link">
                <img src="https://img.icons8.com/fluency/96/gmail-new.png"
                  className="contact-logo" alt="Email" draggable="false" onDragStart={handleDragStart} />
                <h5 className="mt-2">Email</h5>
                <p>stevloc03@gmail.com</p>
              </a>
            </div>
            <div className="col-lg-2 col-md-4 col-sm-6 mb-3">
              <a href="https://app.joinhandshake.com/profiles/42837368" target="_blank" rel="noopener noreferrer" className="text-decoration-none contact-link">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDql8BuIAsmd3YEIjw3XTGS08JPPIjMn3iIw&s"
                  className="contact-logo" alt="Handshake" draggable="false" onDragStart={handleDragStart} />
                <h5 className="mt-2">Handshake</h5>
              </a>
            </div>
            <div className="col-lg-2 col-md-4 col-sm-6 mb-3">
              <a href="https://github.com/stevloc" target="_blank" rel="noopener noreferrer" className="text-decoration-none contact-link">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg"
                  className="contact-logo" alt="GitHub" draggable="false" onDragStart={handleDragStart} />
                <h5 className="mt-2">GitHub</h5>
              </a>
            </div>
            <div className="col-lg-2 col-md-4 col-sm-6 mb-3">
              <a href="https://strava.app.link/HMPSp2IPdXb" target="_blank" rel="noopener noreferrer" className="text-decoration-none contact-link">
                <img src="https://media2.dev.to/dynamic/image/width=800%2Cheight=%2Cfit=scale-down%2Cgravity=auto%2Cformat=auto/https%3A%2F%2Fcdn.hashnode.com%2Fres%2Fhashnode%2Fimage%2Fupload%2Fv1654952873734%2FaCWW9H1li.png"
                  className="contact-logo" alt="Strava" draggable="false" onDragStart={handleDragStart} />
                <h5 className="mt-2">Strava</h5>
              </a>
            </div>
            <div className="col-lg-2 col-md-4 col-sm-6 mb-3">
              <a href="https://beliapp.co/app/stevloc2" target="_blank" rel="noopener noreferrer" className="text-decoration-none contact-link">
                <img src="https://images.squarespace-cdn.com/content/v1/5d27a2af17e26b0001269fd6/8f86dd75-d05e-41db-a33f-01aa6c7391d4/Beli+Logo_FINAL070423.png"
                  className="contact-logo" alt="Beli" draggable="false" onDragStart={handleDragStart} />
                <h5 className="mt-2">Beli</h5>
              </a>
            </div>
            <div className="col-lg-2 col-md-4 col-sm-6 mb-3">
              <a href="https://stevloc.itch.io/" target="_blank" rel="noopener noreferrer" className="text-decoration-none contact-link">
                <img src="https://static.itch.io/images/itchio-textless-black.svg"
                  className="contact-logo" alt="itch.io" draggable="false" onDragStart={handleDragStart} />
                <h5 className="mt-2">itch.io</h5>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark text-white text-center py-3">
        <div className="container">
          <p>&copy; 2025 Steven Lo Cen Portfolio</p>
        </div>
      </footer>
    </div>
  );
}

export default App;