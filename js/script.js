// Initialize AOS animation library
AOS.init({
    duration: 800,
    easing: 'ease-out',
    once: true,
    offset: 50,
});

// Custom Cursor
document.addEventListener('DOMContentLoaded', () => {
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    
    document.addEventListener('mousemove', (e) => {
        // Main cursor follows the mouse cursor precisely
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
        
        // Delayed follower cursor with smooth animation
        setTimeout(() => {
            cursorFollower.style.left = `${e.clientX}px`;
            cursorFollower.style.top = `${e.clientY}px`;
        }, 100);
    });
    
    // Enlarge cursor on hoverable elements
    const hoverables = document.querySelectorAll('a, button, .btn, .nav-links li, .hamburger');
    
    hoverables.forEach(hoverable => {
        hoverable.addEventListener('mouseenter', () => {
            cursor.style.width = '15px';
            cursor.style.height = '15px';
            cursorFollower.style.width = '50px';
            cursorFollower.style.height = '50px';
        });
        
        hoverable.addEventListener('mouseleave', () => {
            cursor.style.width = '10px';
            cursor.style.height = '10px';
            cursorFollower.style.width = '40px';
            cursorFollower.style.height = '40px';
        });
    });
});

// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const hamburger = document.querySelector('.hamburger');
    
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
    
    // Close navigation when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.menu-toggle') && !e.target.closest('.nav-links')) {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
});

// Header Scroll Effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            // Close mobile menu if open
            const navLinks = document.querySelector('.nav-links');
            const hamburger = document.querySelector('.hamburger');
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
            
            // Scroll to target
            window.scrollTo({
                top: targetElement.offsetTop - 100,
                behavior: 'smooth'
            });
            
            // Update active link
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.classList.remove('active');
            });
            this.classList.add('active');
        }
    });
});

// Active Navigation Highlighting
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 150) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Faculty Slider Animation with GSAP
document.addEventListener('DOMContentLoaded', () => {
    if (window.innerWidth > 768) {
        const facultyCards = document.querySelectorAll('.faculty-card');
        
        gsap.set(facultyCards, { opacity: 0, y: 50 });
        
        gsap.to(facultyCards, {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
                trigger: '.faculty-slider',
                start: 'top 80%',
            }
        });
    }
});

// Counter Animation for Stats
document.addEventListener('DOMContentLoaded', () => {
    const stats = document.querySelector('.stats');
    const counters = document.querySelectorAll('.counter');
    
    let started = false;
    
    window.addEventListener('scroll', () => {
        if (stats.getBoundingClientRect().top < window.innerHeight && !started) {
            counters.forEach(counter => {
                const target = counter.innerText;
                const countUp = () => {
                    const value = +counter.innerText.replace(/\+/g, '').replace(/,/g, '');
                    const data = +target.replace(/\+/g, '').replace(/,/g, '');
                    const increment = data / 50;
                    
                    if (value < data) {
                        counter.innerText = Math.ceil(value + increment);
                        setTimeout(countUp, 30);
                    } else {
                        counter.innerText = target;
                    }
                };
                
                countUp();
            });
            
            started = true;
        }
    });
});

// Events Hover Effect
document.addEventListener('DOMContentLoaded', () => {
    const eventCards = document.querySelectorAll('.event-card');
    
    eventCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card.querySelector('.event-date'), {
                backgroundColor: '#e67e22',
                duration: 0.3
            });
        });
        
        card.addEventListener('mouseleave', () => {
            gsap.to(card.querySelector('.event-date'), {
                backgroundColor: '#2c3e50',
                duration: 0.3
            });
        });
    });
});

// Program Cards Staggered Animation
document.addEventListener('DOMContentLoaded', () => {
    const programCards = document.querySelectorAll('.program-card');
    
    gsap.registerPlugin(ScrollTrigger);
    
    gsap.from(programCards, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
            trigger: '.programs-grid',
            start: 'top 80%',
        }
    });
});

// Form Input Animation
document.addEventListener('DOMContentLoaded', () => {
    const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
    
    formInputs.forEach(input => {
        // Set label position if input has value
        if (input.value) {
            input.nextElementSibling.classList.add('active');
        }
        
        input.addEventListener('focus', () => {
            input.nextElementSibling.classList.add('active');
        });
        
        input.addEventListener('blur', () => {
            if (!input.value) {
                input.nextElementSibling.classList.remove('active');
            }
        });
    });
    
    // Form submission prevention (for demo)
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Form validation
            let valid = true;
            const inputs = contactForm.querySelectorAll('input, textarea');
            
            inputs.forEach(input => {
                if (input.hasAttribute('required') && !input.value) {
                    valid = false;
                    input.classList.add('error');
                } else {
                    input.classList.remove('error');
                }
            });
            
            if (valid) {
                // Simulate form submission
                const submitBtn = contactForm.querySelector('button');
                const originalText = submitBtn.innerText;
                
                submitBtn.disabled = true;
                submitBtn.innerText = 'Sending...';
                
                setTimeout(() => {
                    submitBtn.innerText = 'Message Sent!';
                    
                    // Reset form
                    setTimeout(() => {
                        contactForm.reset();
                        submitBtn.innerText = originalText;
                        submitBtn.disabled = false;
                        
                        // Reset labels
                        contactForm.querySelectorAll('.form-group label').forEach(label => {
                            label.classList.remove('active');
                        });
                    }, 2000);
                }, 1500);
            }
        });
    }
});

// Newsletter Form
document.addEventListener('DOMContentLoaded', () => {
    const newsletterForm = document.querySelector('.footer-subscribe');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const input = newsletterForm.querySelector('input');
            const button = newsletterForm.querySelector('button');
            
            if (input.value) {
                const originalHtml = button.innerHTML;
                button.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i>';
                button.disabled = true;
                
                setTimeout(() => {
                    button.innerHTML = '<i class="fas fa-check"></i>';
                    
                    setTimeout(() => {
                        input.value = '';
                        button.innerHTML = originalHtml;
                        button.disabled = false;
                    }, 2000);
                }, 1500);
            }
        });
    }
});

// Testimonial Cards Animation
document.addEventListener('DOMContentLoaded', () => {
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    
    testimonialCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                y: -10,
                boxShadow: '0 15px 30px rgba(0, 0, 0, 0.2)',
                duration: 0.3
            });
            
            gsap.to(card.querySelector('.quote-icon'), {
                scale: 1.2,
                color: 'rgba(230, 126, 34, 0.4)',
                duration: 0.3
            });
        });
        
        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                y: 0,
                boxShadow: '0 5px 20px rgba(0, 0, 0, 0.15)',
                duration: 0.3
            });
            
            gsap.to(card.querySelector('.quote-icon'), {
                scale: 1,
                color: 'rgba(230, 126, 34, 0.2)',
                duration: 0.3
            });
        });
    });
});

// Image Parallax Effect
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('.about-image img, .hero-image img');
    
    window.addEventListener('scroll', () => {
        images.forEach(image => {
            const imagePosition = image.getBoundingClientRect().top;
            const scrollPosition = window.pageYOffset;
            const windowHeight = window.innerHeight;
            
            if (imagePosition < windowHeight) {
                const parallaxValue = (imagePosition - windowHeight) * 0.1;
                image.style.transform = `translateY(${parallaxValue}px) scale(1.05)`;
            }
        });
    });
});

// Page Preloader
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.classList.add('preloader-finish');
        
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }
});

// 3D Tilt Effect on Program Cards
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.program-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const cardRect = card.getBoundingClientRect();
            const cardCenterX = cardRect.left + cardRect.width / 2;
            const cardCenterY = cardRect.top + cardRect.height / 2;
            
            const x = e.clientX - cardCenterX;
            const y = e.clientY - cardCenterY;
            
            const rotateX = y / -10;
            const rotateY = x / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });
});