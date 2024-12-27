// Initialize GSAP Plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// Header Elements
const header = document.querySelector('.header');
const navbar = document.querySelector('.navbar');
const menuBtn = document.querySelector('.menu-btn');
const navContent = document.querySelector('.nav-content');
const logoText = document.querySelector('.logo-text');

// Header Scroll Effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile Menu Toggle
menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('active');
    navContent.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-link, .contact-btn').forEach(link => {
    link.addEventListener('click', () => {
        menuBtn.classList.remove('active');
        navContent.classList.remove('active');
    });
});

// Smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);
        
        if (target) {
            const headerOffset = header.offsetHeight;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerOffset;
            
            gsap.to(window, {
                duration: 1,
                scrollTo: targetPosition,
                ease: "power2.inOut"
            });
        }
    });
});

// Header Animations
gsap.from(header, {
    y: -100,
    opacity: 0,
    duration: 1.5,
    ease: "power4.out"
});

gsap.to(logoText, {
    scale: 1.1,
    duration: 1.5,
    repeat: -1,
    yoyo: true,
    ease: "power1.inOut"
});

// Custom Cursor
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

document.addEventListener('mousemove', (e) => {
    gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0
    });
    
    gsap.to(cursorFollower, {
        x: e.clientX - 20,
        y: e.clientY - 20,
        duration: 0.1
    });
});

// Hover effect on links and buttons
const links = document.querySelectorAll('a, button');
links.forEach(link => {
    link.addEventListener('mouseenter', () => {
        cursorFollower.style.transform = 'scale(1.5)';
        cursor.style.opacity = '0';
    });
    
    link.addEventListener('mouseleave', () => {
        cursorFollower.style.transform = 'scale(1)';
        cursor.style.opacity = '1';
    });
});

// Loading Animation
window.addEventListener('load', () => {
    const counter = document.querySelector('.counter');
    const loadingScreen = document.querySelector('.loading-screen');
    
    let count = 0;
    const interval = setInterval(() => {
        if (count < 100) {
            count++;
            counter.textContent = count + '%';
        } else {
            clearInterval(interval);
            gsap.to(loadingScreen, {
                opacity: 0,
                duration: 1,
                onComplete: () => loadingScreen.style.display = 'none'
            });
        }
    }, 20);
});

// 3D Animation with Three.js
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#heroCanvas'),
    alpha: true
});

renderer.setSize(window.innerWidth, window.innerHeight);

// Create particles
const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = 5000;
const posArray = new Float32Array(particlesCount * 3);

for(let i = 0; i < particlesCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 5;
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

const particlesMaterial = new THREE.PointsMaterial({
    size: 0.005,
    color: '#ffffff'
});

const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particlesMesh);

camera.position.z = 3;

// Animation
const animate = () => {
    requestAnimationFrame(animate);
    particlesMesh.rotation.y += 0.001;
    renderer.render(scene, camera);
};

animate();

// Resize handler
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Scroll Animations
gsap.from('.hero-content', {
    opacity: 0,
    y: 100,
    duration: 1,
    delay: 3
});

// Skill bars animation
const skillBars = document.querySelectorAll('.skill-bar');
skillBars.forEach(bar => {
    const percentage = bar.getAttribute('data-percentage');
    gsap.to(bar, {
        scrollTrigger: {
            trigger: bar,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        width: percentage + '%',
        duration: 1.5,
        ease: 'power4.out'
    });
});

// Project Card Animations
gsap.from('.project-card', {
    scrollTrigger: {
        trigger: '.projects-grid',
        start: 'top center+=100',
        end: 'bottom center',
        scrub: 1
    },
    y: 100,
    opacity: 0,
    stagger: 0.2
});

gsap.from('.project-tags span', {
    scrollTrigger: {
        trigger: '.projects-grid',
        start: 'top center'
    },
    scale: 0,
    opacity: 0,
    duration: 0.5,
    stagger: 0.05
});

// Add click handler for CTA button
document.querySelector('.cta-button').addEventListener('click', function() {
    const workSection = document.querySelector('#work');
    const headerOffset = header.offsetHeight;
    const targetPosition = workSection.getBoundingClientRect().top + window.pageYOffset - headerOffset;
    
    gsap.to(window, {
        duration: 1,
        scrollTo: targetPosition,
        ease: "power2.inOut"
    });
});

// Skills Section Animations
gsap.from('.skill-category', {
    scrollTrigger: {
        trigger: '.skills-grid',
        start: 'top bottom',
        end: 'center center',
        scrub: 1
    },
    y: 50,
    opacity: 0,
    stagger: 0.2
});

gsap.from('.skill-tag', {
    scrollTrigger: {
        trigger: '.skills-grid',
        start: 'top bottom',
        end: 'center center'
    },
    scale: 0,
    opacity: 0,
    duration: 0.5,
    stagger: 0.05
});

// Hire Me Section Animation
gsap.from('.hire-me-section', {
    scrollTrigger: {
        trigger: '.hire-me-section',
        start: 'top bottom',
        end: 'center center',
        scrub: 1
    },
    y: 50,
    opacity: 0
});

gsap.from('.hire-me-buttons a', {
    scrollTrigger: {
        trigger: '.hire-me-section',
        start: 'top bottom',
        end: 'center center'
    },
    x: -30,
    opacity: 0,
    duration: 0.8,
    stagger: 0.2
});

// Footer Animations
gsap.from('.footer', {
    scrollTrigger: {
        trigger: '.footer',
        start: 'top bottom',
        end: 'top center',
        scrub: 1
    },
    opacity: 0,
    y: 50
});

gsap.from('.footer-content > div', {
    scrollTrigger: {
        trigger: '.footer',
        start: 'top bottom',
        end: 'top center',
        scrub: 1
    },
    opacity: 0,
    y: 30,
    stagger: 0.2
});

// Timeline Animations
gsap.from('.timeline-item', {
    scrollTrigger: {
        trigger: '.timeline',
        start: 'top center',
        end: 'bottom center',
        scrub: 1
    },
    opacity: 0,
    y: 100,
    stagger: 0.2
});

gsap.from('.timeline::before', {
    scrollTrigger: {
        trigger: '.timeline',
        start: 'top center',
        end: 'bottom center',
        scrub: 1
    },
    height: 0
});

gsap.from('.timeline-content::before', {
    scrollTrigger: {
        trigger: '.timeline',
        start: 'top center',
        end: 'bottom center',
        scrub: 1
    },
    scale: 0,
    stagger: 0.1
});

// Email copy functionality
document.querySelector('.email-link').addEventListener('click', function(e) {
    e.preventDefault();
    navigator.clipboard.writeText('adwaitkeshari288@gmail.com');
    
    // Create and show tooltip
    const tooltip = document.createElement('div');
    tooltip.className = 'copy-tooltip';
    tooltip.textContent = 'Email copied!';
    this.appendChild(tooltip);
    
    // Remove tooltip after animation
    setTimeout(() => tooltip.remove(), 2000);
});
