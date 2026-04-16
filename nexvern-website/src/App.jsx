import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  Code,
  Cloud,
  Smartphone,
  Shield,
  Brain,
  Zap,
  ChevronRight,
  Mail,
  Phone,
  MapPin,
  Menu,
  X,
  Cpu,
  Wifi,
  Camera,
  Navigation as NavIcon,
  Users,
  Lightbulb,
  Briefcase
} from 'lucide-react'
import './App.css'

gsap.registerPlugin(ScrollTrigger)

const PREMIUM_EASING = [0.16, 1, 0.3, 1]

// Mask Reveal Component
const MaskReveal = ({ children, delay = 0, duration = 1.2 }) => (
  <div style={{ overflow: 'hidden', position: 'relative' }}>
    <motion.div
      initial={{ y: '100%' }}
      whileInView={{ y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ delay, duration, ease: PREMIUM_EASING }}
    >
      {children}
    </motion.div>
  </div>
)

// Custom Brand Icons (since they are missing from core lucide-react)
const Github = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
)

const Twitter = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
)

const Linkedin = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
)

const Instagram = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
)

// Logo Component
const Logo = ({ size = 60 }) => (
  <img
    src="/NVlogo.png"
    alt="Nexvern Enterprise Logo"
    style={{
      width: size,
      height: size,
      objectFit: 'cover',
      borderRadius: '50%',
      boxShadow: '0 0 20px rgba(37, 150, 190, 0.2)',
      display: 'inline-block',
      verticalAlign: 'middle'
    }}
  />
)

// Background Geometric Lines
const BGLines = () => {
  const { scrollYProgress } = useScroll()
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1.2])

  return (
    <svg className="bg-lines" viewBox="0 0 100 100" preserveAspectRatio="none">
      <motion.path
        d="M -10,20 Q 30,50 110,20"
        className="bg-line"
        style={{ pathLength }}
      />
      <motion.path
        d="M -10,80 Q 70,50 110,80"
        className="bg-line"
        style={{ pathLength }}
      />
      <motion.path
        d="M 20,-10 Q 50,30 20,110"
        className="bg-line"
        style={{ pathLength }}
      />
      <motion.path
        d="M 80,-10 Q 50,70 80,110"
        className="bg-line"
        style={{ pathLength, transitionDelay: '0.2s' }}
      />
    </svg>
  )
}

// Particle Background
const Particles = () => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles = Array.from({ length: 50 }, () => ({
      x: Math.random() * canvas.width,
      y: canvas.height + Math.random() * 100,
      vx: (Math.random() - 0.5) * 0.5,
      vy: -Math.random() * 2 - 1,
      size: Math.random() * 3 + 1,
      opacity: Math.random() * 0.5 + 0.2
    }))

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach(p => {
        p.x += p.vx
        p.y += p.vy

        if (p.y < -10) {
          p.y = canvas.height + 10
          p.x = Math.random() * canvas.width
        }

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(37, 150, 190, ${p.opacity})`
        ctx.fill()
      })

      requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return <canvas ref={canvasRef} className="particles" style={{ position: 'fixed', top: 0, left: 0, pointerEvents: 'none', zIndex: 0 }} />
}

// Navigation Component
const Navigation = () => {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = ['Home', 'Services', 'About', 'Technologies', 'Contact']

  return (
    <nav className={`nav ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <a href="#" className="nav-logo">
          <Logo size={40} />
          <span className="gradient-text">NEXVERN ENTERPRISES</span>
        </a>

        <ul className="nav-menu">
          {navItems.map((item) => (
            <li key={item}>
              <a href={`#${item.toLowerCase()}`}>{item}</a>
            </li>
          ))}
          {/* <li>
            <a href="#contact" className="btn btn-primary nav-cta">
              Get Started
            </a>
          </li> */}
        </ul>

        <button className="mobile-menu-btn" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X /> : <Menu />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            style={{
              position: 'fixed',
              top: '80px',
              left: 0,
              right: 0,
              background: 'rgba(255, 255, 255, 0.98)',
              padding: '2rem',
              zIndex: 999,
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)'
            }}
          >
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {navItems.map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    onClick={() => setMobileOpen(false)}
                    style={{ color: 'var(--dark)', textDecoration: 'none', fontSize: '1.25rem' }}
                  >
                    {item}
                  </a>
                </li>
              ))}
              <li>
                <a href="#contact" className="btn btn-primary" style={{ display: 'inline-flex' }}>
                  Get Started
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

// Hero Section
const Hero = () => {
  const { scrollY } = useScroll()
  const y2 = useTransform(scrollY, [0, 500], [0, -150])
  const opacity = useTransform(scrollY, [0, 400], [1, 0])

  const titleVariants = {
    hidden: { opacity: 0, y: 100 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }
    })
  }

  return (
    <section id="home" className="hero">
      <motion.div
        className="hero-content"
        style={{ opacity }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: PREMIUM_EASING }}
          className="hero-badge"
        >
          <span className="pulse-dot" />
          <span>Engineer Without Limits™</span>
        </motion.div>

        <div className="hero-title-container">
          <MaskReveal delay={0.2}>
            <h1 style={{ marginBottom: 0 }}>Nexvern Enterprises</h1>
          </MaskReveal>
          <MaskReveal delay={0.4}>
            <span className="hero-subtitle-top" style={{ display: 'block', fontSize: '1.5rem', fontWeight: 500, marginTop: '0.5rem', color: 'var(--primary)' }}>
              Multidisciplinary Technology & Innovation
            </span>
          </MaskReveal>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1, ease: PREMIUM_EASING }}
          className="hero-subtitle"
        >
          Delivering end-to-end digital and hardware solutions tailored for industry, government, and institutional clients.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1, ease: PREMIUM_EASING }}
          className="hero-buttons"
        >
          <a href="#contact" className="btn btn-primary">
            Start Your Project
            <ChevronRight size={20} />
          </a>
          <a href="#services" className="btn btn-outline">
            Explore Services
          </a>
        </motion.div>
      </motion.div>

      {/* Animated Background Elements */}
      <motion.div
        className="hero-image"
        style={{ y: y2 }}
      >
        <svg className="hero-logo-3d" style={{ position: 'absolute', top: '20%', left: '10%' }} viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="45" stroke="rgba(37, 150, 190, 0.2)" strokeWidth="2" fill="none" />
        </svg>
        <svg className="hero-logo-3d" style={{ position: 'absolute', bottom: '20%', right: '10%', animationDelay: '-10s' }} viewBox="0 0 100 100">
          <rect x="20" y="20" width="60" height="60" stroke="rgba(76, 180, 219, 0.2)" strokeWidth="2" fill="none" />
        </svg>
      </motion.div>

      <div className="scroll-indicator">
        <div className="scroll-mouse">
          <div className="scroll-wheel" />
        </div>
        <span>Scroll to explore</span>
      </div>
    </section>
  )
}

// Services Section
const Services = () => {
  const sectionRef = useRef(null)

  useGSAP(() => {
    const cards = sectionRef.current.querySelectorAll('.service-card')
    gsap.from(cards, {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
      },
      y: 100,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power3.out'
    })
  }, { scope: sectionRef })

  const services = [
    {
      icon: <Code size={32} />,
      title: 'Software & Web Development',
      description: 'Custom websites, enterprise software, mobile applications, ERP/CRM systems, and automation platforms.'
    },
    {
      icon: <Cpu size={32} />,
      title: 'Hardware & Embedded Systems',
      description: 'Design and development of electronic systems, PCB prototyping, and embedded solutions.'
    },
    {
      icon: <Wifi size={32} />,
      title: 'IoT & Smart Technologies',
      description: 'Smart sensors, real-time monitoring systems, industrial automation, and smart city solutions.'
    },
    {
      icon: <Camera size={32} />,
      title: 'CCTV & Surveillance Systems',
      description: 'Professional installation, maintenance, and AI-enabled intelligent security systems for complete safety.'
    },
    {
      icon: <NavIcon size={32} />,
      title: 'Road Safety & Smart Infrastructure',
      description: 'Intelligent traffic systems, accident detection technologies, and innovative public safety solutions.'
    },
    {
      icon: <Users size={32} />,
      title: 'Technical Manpower & Services',
      description: 'Skilled workforce deployment, IT support services, and specialized project-based technical staffing.'
    },
    {
      icon: <Lightbulb size={32} />,
      title: 'Innovation & Research',
      description: 'End-to-end product development, academic collaboration, and R&D in emerging technologies.'
    },
    {
      icon: <Briefcase size={32} />,
      title: 'Consultancy & Digital Transformation',
      description: 'Strategic IT consulting, system architecture, and seamless implementation of technology-driven solutions.'
    },
    {
      icon: <Shield size={32} />,
      title: 'Cybersecurity Solutions',
      description: 'Advanced protection for your digital assets, ensuring data integrity and robust security layers.'
    }
  ]

  return (
    <section id="services" className="section section-dark" ref={sectionRef}>
      <div className="section-header">
        <MaskReveal>
          <span className="section-tag">Our Services</span>
        </MaskReveal>
        <MaskReveal delay={0.2}>
          <h2 className="section-title">
            <span className="gradient-text">Multidisciplinary</span> Solutions
          </h2>
        </MaskReveal>
      </div>

      <div className="services-grid">
        {services.map((service, index) => (
          <motion.div
            key={index}
            className="service-card"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              delay: index * 0.1,
              duration: 1,
              ease: PREMIUM_EASING
            }}
            whileHover={{
              y: -10,
              scale: 1.02,
              boxShadow: "0 20px 40px rgba(37, 150, 190, 0.1)"
            }}
            viewport={{ once: true }}
          >
            <div className="service-card-content">
              <motion.div
                className="service-icon"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 1, ease: PREMIUM_EASING }}
              >
                {service.icon}
              </motion.div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

// About Section
const About = () => {
  const sectionRef = useRef(null)

  useGSAP(() => {
    gsap.from('.about-image', {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
      },
      x: -100,
      opacity: 0,
      duration: 1,
      ease: 'power3.out'
    })

    gsap.from('.about-content', {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
      },
      x: 100,
      opacity: 0,
      duration: 1,
      ease: 'power3.out'
    })
  }, { scope: sectionRef })

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })

  const opacityText = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])
  const scaleImage = useTransform(scrollYProgress, [0, 0.5], [0.8, 1])

  return (
    <section id="about" className="section" ref={sectionRef}>
      <div className="about">
        <motion.div
          className="about-image"
          style={{ scale: scaleImage }}
        >
          <motion.div
            className="about-curtain"
            initial={{ width: '100%' }}
            whileInView={{ width: 0 }}
            transition={{ duration: 1.2, ease: PREMIUM_EASING }}
            viewport={{ once: true }}
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              height: '100%',
              background: 'var(--primary)',
              zIndex: 2
            }}
          />
          <div style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'var(--gradient-1)'
          }}>
            <Logo size={120} />
          </div>
        </motion.div>

        <motion.div
          className="about-content"
          style={{ opacity: opacityText }}
        >
          <MaskReveal>
            <span className="section-tag">About Us</span>
          </MaskReveal>
          <MaskReveal delay={0.2}>
            <h3>
              Pioneering <span className="gradient-text">Technology Excellence</span>
            </h3>
          </MaskReveal>
          <p>
            Nexvern Enterprises is a multidisciplinary technology and innovation-driven firm specializing in the development, integration, and deployment of advanced digital and hardware solutions.
          </p>
          <p>
            The company operates at the intersection of software, hardware, IoT, and smart infrastructure, delivering end-to-end solutions tailored for industry, government, and institutional clients.
          </p>

          {/* <div className="about-stats">
            <motion.div
              className="stat"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="stat-number">100+</div>
              <div className="stat-label">Projects Delivered</div>
            </motion.div>
            <motion.div
              className="stat"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <div className="stat-number">50+</div>
              <div className="stat-label">Happy Clients</div>
            </motion.div>
            <motion.div
              className="stat"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <div className="stat-number">5+</div>
              <div className="stat-label">Years Experience</div>
            </motion.div>
          </div> */}
        </motion.div>
      </div>
    </section>
  )
}

// Technologies Marquee
const Technologies = () => {
  const technologies = [
    { name: 'React', icon: '⚛️' },
    { name: 'Node.js', icon: '📦' },
    { name: 'Python', icon: '🐍' },
    { name: 'AWS', icon: '☁️' },
    { name: 'Docker', icon: '🐳' },
    { name: 'Kubernetes', icon: '⚓' },
    { name: 'MongoDB', icon: '🍃' },
    { name: 'PostgreSQL', icon: '🐘' },
    { name: 'GraphQL', icon: '◈' },
    { name: 'TensorFlow', icon: '🧠' },
    { name: 'Flutter', icon: '📱' },
    { name: 'Next.js', icon: '▲' },
  ]

  return (
    <section id="technologies" className="section">
      <div className="section-header">
        <span className="section-tag">Technologies</span>
        <h2 className="section-title">
          Powered by <span className="gradient-text-2">Modern Stack</span>
        </h2>
      </div>

      <div className="tech-marquee">
        <div className="tech-track">
          {[...technologies, ...technologies].map((tech, index) => (
            <motion.div
              key={index}
              className="tech-item"
              whileHover={{ scale: 1.1 }}
            >
              <div style={{ fontSize: '3rem' }}>{tech.icon}</div>
              <span>{tech.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Contact Section
const Contact = () => {
  const sectionRef = useRef(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission
    console.log('Form submitted')
  }

  return (
    <section id="contact" className="section contact" ref={sectionRef}>
      <div className="section-header">
        <span className="section-tag">Contact Us</span>
        <h2 className="section-title">
          Let's Build <span className="gradient-text">Together</span>
        </h2>
        <p className="section-subtitle">
          Ready to start your next project? Get in touch with us today.
        </p>
      </div>

      <div className="contact-container">
        <form className="contact-form" onSubmit={handleSubmit}>
          <motion.div
            className="form-group"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <input
              type="text"
              className="form-input"
              placeholder="Your Name"
              required
            />
          </motion.div>

          <motion.div
            className="form-group"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <input
              type="email"
              className="form-input"
              placeholder="Your Email"
              required
            />
          </motion.div>

          <motion.div
            className="form-group"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <input
              type="text"
              className="form-input"
              placeholder="Subject"
            />
          </motion.div>

          <motion.div
            className="form-group"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <textarea
              className="form-input"
              placeholder="Your Message"
              required
            />
          </motion.div>

          <motion.button
            type="submit"
            className="btn btn-primary"
            style={{ width: '100%', justifyContent: 'center' }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Send Message
            <Mail size={20} />
          </motion.button>
        </form>
      </div>
    </section>
  )
}

// Footer
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-brand">
          <a href="#" className="nav-logo">
            <Logo size={40} />
            <span className="gradient-text">NEXVERN ENTERPRISES</span>
          </a>
          <p>
            Empowering businesses through innovative technology solutions.
            Your partner in digital transformation.
          </p>
          {/* <div className="social-links">
            <a href="#" className="social-link"><Github size={20} /></a>
            <a href="#" className="social-link"><Twitter size={20} /></a>
            <a href="#" className="social-link"><Linkedin size={20} /></a>
            <a href="#" className="social-link"><Instagram size={20} /></a>
          </div> */}
        </div>

        <div className="footer-links">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>

        <div className="footer-links">
          <h4>Services</h4>
          <ul>
            <li><a href="#services">Software Development</a></li>
            <li><a href="#services">Cloud Solutions</a></li>
            <li><a href="#services">Mobile Apps</a></li>
            <li><a href="#services">AI & ML</a></li>
          </ul>
        </div>

        <div className="footer-links">
          <h4>Contact</h4>
          <ul>
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--gray)' }}>
              <Mail size={16} />
              email
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--gray)' }}>
              <Phone size={16} />
              +91 XXX XXX XXXX
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--gray)' }}>
              <MapPin size={16} />
              Kalyan, Maharashtra
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2026 Nexvern Enterprises. All rights reserved.</p>
      </div>
    </footer>
  )
}

// Main App Component
function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000)
    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-content">
          <motion.div
            className="loading-logo"
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          >
            <Logo size={120} />
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="loading-bar">
              <div className="loading-progress" />
            </div>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="app">
      {/* Animated Background */}
      <div className="animated-bg">
        <div className="gradient-orb orb-1" />
        <div className="gradient-orb orb-2" />
        <div className="gradient-orb orb-3" />
      </div>

      {/* Background Geometric Lines */}
      <BGLines />

      {/* Grid Pattern */}
      <div className="grid-pattern" />

      {/* Particles */}
      <Particles />

      {/* Navigation */}
      <Navigation />

      {/* Main Content */}
      <main>
        <Hero />
        <Services />
        <About />
        <Technologies />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default App
