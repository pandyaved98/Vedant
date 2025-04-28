// Navigation
const navSlide = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');
    
    burger.addEventListener('click', () => {
        // Toggle Nav
        nav.classList.toggle('active');
        
        // Animate Links
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });
        
        // Burger Animation
        burger.classList.toggle('active');
    });
    
    // Close menu when clicking outside or on a link
    document.addEventListener('click', (e) => {
        if (!nav.contains(e.target) && !burger.contains(e.target) && nav.classList.contains('active')) {
            nav.classList.remove('active');
            burger.classList.remove('active');
            navLinks.forEach(link => {
                link.style.animation = '';
            });
        }
    });
    
    // Close menu when clicking on a nav link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
            burger.classList.remove('active');
            navLinks.forEach(link => {
                link.style.animation = '';
            });
        });
    });
}

// Scroll Navigation
const scrollNav = () => {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', () => {
        // Add background to navbar on scroll
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Highlight active nav link based on scroll position
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= (sectionTop - 100)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });
}

// Typewriter Effect
const typeWriter = () => {
    const texts = [
        'AI Researcher',
        'ML & NLP Enthusiast',
        'GenAI Specialist',
        'Quantum Computing Explorer'
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;
    
    const type = () => {
        const currentText = texts[textIndex];
        const typewriterElement = document.getElementById('typewriter-text');
        
        if (isDeleting) {
            // Remove a character
            typewriterElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50;
        } else {
            // Add a character
            typewriterElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 100;
        }
        
        // If word is complete
        if (!isDeleting && charIndex === currentText.length) {
            // Pause at end
            isDeleting = true;
            typeSpeed = 1000;
        } else if (isDeleting && charIndex === 0) {
            // Move to next word
            isDeleting = false;
            textIndex++;
            
            // Reset to first word if reached the end
            if (textIndex >= texts.length) {
                textIndex = 0;
            }
        }
        
        setTimeout(type, typeSpeed);
    }
    
    type();
}

// Animate Skill Bars
const animateSkillBars = () => {
    const skillLevels = document.querySelectorAll('.skill-level');
    
    const animateOnScroll = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const level = entry.target.getAttribute('data-level');
                entry.target.querySelector('.skill-fill').style.width = `${level}%`;
                observer.unobserve(entry.target);
            }
        });
    };
    
    const observer = new IntersectionObserver(animateOnScroll, {
        threshold: 0.5
    });
    
    skillLevels.forEach(skill => {
        observer.observe(skill);
    });
}

// Project Filtering
const filterProjects = () => {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projects = document.querySelectorAll('.project-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            btn.classList.add('active');
            
            const filter = btn.getAttribute('data-filter');
            
            // Filter projects
            projects.forEach(project => {
                const categories = project.getAttribute('data-category');
                
                if (filter === 'all' || categories.includes(filter)) {
                    project.style.display = 'block';
                } else {
                    project.style.display = 'none';
                }
            });
        });
    });
}

// Form Submission
const handleFormSubmit = () => {
    const form = document.getElementById('contact-form');
    
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // For now, just log the data
            console.log({ name, email, subject, message });
            
            // You would typically send this to your backend or email service
            // For this demo, just reset the form and show success
            form.reset();
            alert('Message sent successfully!');
        });
    }
}

// Animate elements on scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.skill-card, .service-card, .project-card, .stat-card');
    
    const fadeInObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                fadeInObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    elements.forEach(element => {
        fadeInObserver.observe(element);
    });
}

// Handle profile image loading
const handleProfileImage = () => {
    const profileImage = document.querySelector('.profile-image');
    const placeholder = document.querySelector('.profile-image-placeholder');
    
    if (profileImage) {
        profileImage.addEventListener('error', () => {
            profileImage.style.display = 'none';
            if (placeholder) {
                placeholder.style.display = 'flex';
            }
        });
        
        profileImage.addEventListener('load', () => {
            profileImage.style.display = 'block';
            if (placeholder) {
                placeholder.style.display = 'none';
            }
        });
    }
}

// GitHub Projects Loader
const loadGitHubProjects = () => {
    const username = 'pandyaved98'; // Updated GitHub username
    const projectsGrid = document.getElementById('projects-grid');
    const projectFilters = document.getElementById('project-filters');
    
    if (!projectsGrid || !projectFilters) return;
    
    // Function to categorize repos based on topics, languages, and name
    const categorizeRepo = (repo) => {
        const categories = new Set(['all']);
        const nameAndDesc = (repo.name + ' ' + (repo.description || '')).toLowerCase();
        
        // Check for AI/ML category
        const aiKeywords = ['ai', 'ml', 'machine learning', 'deep learning', 'neural', 
                           'model', 'prediction', 'classification', 'clustering', 'regression',
                           'tensorflow', 'pytorch', 'keras', 'scikit'];
        
        if (aiKeywords.some(keyword => nameAndDesc.includes(keyword))) {
            categories.add('ai/ml');
        }
        
        // Check for NLP category
        const nlpKeywords = ['nlp', 'language processing', 'text', 'sentiment', 'token', 
                            'word embedding', 'bert', 'gpt', 'transformer', 'language model'];
        
        let isNLP = false;
        if (nlpKeywords.some(keyword => nameAndDesc.includes(keyword))) {
            categories.add('nlp');
            isNLP = true;
        }
        
        // Check for Computer Vision category
        const cvKeywords = ['vision', 'image', 'video', 'object detection', 'recognition',
                          'segmentation', 'cnn', 'convolutional', 'yolo', 'opencv'];
        
        if (cvKeywords.some(keyword => nameAndDesc.includes(keyword))) {
            categories.add('computer vision');
        }
        
        // Check for GenAI category
        const genaiKeywords = ['genai', 'generative', 'gan', 'llm', 'gpt', 'diffusion',
                             'stable diffusion', 'midjourney', 'dalle', 'synthesis'];
        
        let isGenAI = false;
        if (genaiKeywords.some(keyword => nameAndDesc.includes(keyword))) {
            categories.add('genai');
            isGenAI = true;
        }
        
        // Check for Research category
        const researchKeywords = ['research', 'paper', 'publication', 'study', 'analysis',
                                'experiment', 'novel', 'framework', 'algorithm', 'thesis'];
        
        // Add to research if it's either explicitly research OR if it's GenAI/NLP
        if (researchKeywords.some(keyword => nameAndDesc.includes(keyword)) || isGenAI || isNLP) {
            categories.add('research');
        }
        
        // Use GitHub topics as additional signals
        if (repo.topics && repo.topics.length) {
            const topicMap = {
                'machine-learning': 'ai/ml',
                'artificial-intelligence': 'ai/ml',
                'deep-learning': 'ai/ml',
                'neural-networks': 'ai/ml',
                'nlp': 'nlp',
                'natural-language-processing': 'nlp',
                'computer-vision': 'computer vision',
                'image-processing': 'computer vision',
                'generative-ai': 'genai',
                'generative': 'genai',
                'llm': 'genai',
                'research': 'research',
                'paper': 'research'
            };
            
            repo.topics.forEach(topic => {
                const lowerTopic = topic.toLowerCase();
                if (topicMap[lowerTopic]) {
                    categories.add(topicMap[lowerTopic]);
                    
                    // If NLP or GenAI topic is detected, also add to research
                    if (lowerTopic === 'nlp' || lowerTopic === 'natural-language-processing' || 
                        lowerTopic === 'generative-ai' || lowerTopic === 'generative' || 
                        lowerTopic === 'llm') {
                        categories.add('research');
                    }
                }
            });
        }
        
        return Array.from(categories);
    };
    
    // Function to get language color
    const getLanguageColor = (language) => {
        const colors = {
            'python': '#3572A5',
            'javascript': '#F7DF1E',
            'typescript': '#2B7489',
            'html': '#E34C26',
            'css': '#563D7C',
            'java': '#B07219',
            'c++': '#F34B7D',
            'c#': '#178600',
            'go': '#00ADD8',
            'rust': '#DEA584',
            'php': '#4F5D95',
            'ruby': '#701516',
            'swift': '#FFAC45',
            'kotlin': '#F18E33',
            'r': '#198CE7',
            'jupyter notebook': '#DA5B0B',
        };
        
        return colors[language.toLowerCase()] || '#8E8E8E';
    };
    
    // Function to format date
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const diff = Math.floor((now - date) / (1000 * 60 * 60 * 24));
        
        if (diff === 0) {
            return 'Today';
        } else if (diff === 1) {
            return 'Yesterday';
        } else if (diff < 30) {
            return `${diff} days ago`;
        } else if (diff < 365) {
            const months = Math.floor(diff / 30);
            return `${months} ${months === 1 ? 'month' : 'months'} ago`;
        } else {
            const years = Math.floor(diff / 365);
            return `${years} ${years === 1 ? 'year' : 'years'} ago`;
        }
    };

    // Function to create project card
    const createProjectCard = (repo, categories) => {
        const card = document.createElement('div');
        card.className = 'project-card';
        
        // Always include 'all' category if not present
        if (!categories.includes('all')) {
            categories.push('all');
        }
        
        card.dataset.category = categories.join(' ');
        
        // Determine appropriate icon based on repo name or language
        let iconClass = 'fas fa-code';
        if (repo.language) {
            const lang = repo.language.toLowerCase();
            if (lang === 'python') iconClass = 'fab fa-python';
            else if (lang === 'javascript' || lang === 'typescript') iconClass = 'fab fa-js';
            else if (lang === 'html' || lang === 'css') iconClass = 'fab fa-html5';
            else if (lang === 'java') iconClass = 'fab fa-java';
            else if (lang.includes('c++') || lang.includes('c#')) iconClass = 'fas fa-code';
            else if (lang === 'php') iconClass = 'fab fa-php';
            else if (lang === 'r') iconClass = 'fas fa-chart-line';
        }
        
        // If repo name contains AI/ML keywords, use AI icon
        const nameAndDesc = (repo.name + ' ' + (repo.description || '')).toLowerCase();
        if (nameAndDesc.includes('ai') || nameAndDesc.includes('ml') || 
            nameAndDesc.includes('model') || nameAndDesc.includes('learning')) {
            iconClass = 'fas fa-brain';
        } else if (nameAndDesc.includes('nlp') || nameAndDesc.includes('language') || 
                   nameAndDesc.includes('text')) {
            iconClass = 'fas fa-comment-dots';
        } else if (nameAndDesc.includes('vision') || nameAndDesc.includes('image')) {
            iconClass = 'fas fa-eye';
        } else if (nameAndDesc.includes('data') || nameAndDesc.includes('analytics')) {
            iconClass = 'fas fa-database';
        } else if (nameAndDesc.includes('web') || nameAndDesc.includes('app')) {
            iconClass = 'fas fa-globe';
        } else if (nameAndDesc.includes('cloud') || nameAndDesc.includes('aws') || 
                  nameAndDesc.includes('azure') || nameAndDesc.includes('gcp')) {
            iconClass = 'fas fa-cloud';
        }
        
        // Check if repo has a social preview image
        const repoImage = `https://opengraph.githubassets.com/1/${username}/${repo.name}`;
        
        card.innerHTML = `
            <div class="project-image ${repoImage ? '' : 'no-image'}">
                ${repoImage ? 
                    `<img src="${repoImage}" alt="${repo.name}" onerror="this.style.display='none'; this.parentElement.innerHTML='<i class=\\'${iconClass}\\'></i>'; this.parentElement.classList.add('no-image');">` : 
                    `<i class="${iconClass}"></i>`
                }
            </div>
            <div class="project-content">
                <h3>${repo.name}</h3>
                <p>${repo.description || 'A repository by ' + username}</p>
                <div class="project-details">
                    <div class="project-language">
                        ${repo.language ? `
                            <span class="language-color" style="background-color: ${getLanguageColor(repo.language)}"></span>
                            ${repo.language}
                        ` : 'No language data'}
                    </div>
                    <div class="project-meta">
                        <span><i class="fas fa-star"></i>${repo.stargazers_count || 0}</span>
                        <span><i class="fas fa-code-branch"></i>${repo.forks_count || 0}</span>
                        <span><i class="fas fa-eye"></i>${repo.watchers_count || 0}</span>
                    </div>
                </div>
                <p class="project-updated">Updated: ${formatDate(repo.updated_at || new Date())}</p>
                <div class="project-tags">
                    ${categories.filter(cat => cat !== 'all').map(category => 
                        `<span>${category}</span>`
                    ).join('')}
                </div>
                <div class="project-links">
                    <a href="${repo.html_url}" target="_blank" class="btn small-btn">GitHub</a>
                    ${repo.homepage ? `<a href="${repo.homepage}" target="_blank" class="btn small-btn">Demo</a>` : ''}
                </div>
            </div>
        `;
        
        return card;
    };
    
    // Fetch GitHub repositories
    fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`GitHub API request failed with status ${response.status}`);
            }
            return response.json();
        })
        .then(repos => {
            // Clear loading indicator
            projectsGrid.innerHTML = '';
            
            if (!repos || repos.length === 0) {
                projectsGrid.innerHTML = '<div class="error-message"><i class="fas fa-info-circle"></i><p>No repositories found for this GitHub account.</p></div>';
                return;
            }
            
            // Get top repos (not forks, have descriptions, sorted by stars)
            const topRepos = repos
                .filter(repo => !repo.fork)
                .sort((a, b) => b.stargazers_count - a.stargazers_count)
                .slice(0, 12); // Show top 12 repos instead of 10
            
            if (topRepos.length === 0) {
                projectsGrid.innerHTML = '<div class="error-message"><i class="fas fa-info-circle"></i><p>No non-fork repositories found with descriptions.</p></div>';
                return;
            }
            
            // Create and append project cards
            topRepos.forEach(repo => {
                const categories = categorizeRepo(repo);
                const card = createProjectCard(repo, categories);
                projectsGrid.appendChild(card);
            });
            
            // Create fixed filter buttons instead of dynamic ones
            projectFilters.innerHTML = '';
            const fixedCategories = ['all', 'ai/ml', 'genai', 'computer vision', 'nlp', 'research'];
            
            fixedCategories.forEach(category => {
                const button = document.createElement('button');
                button.className = category === 'all' ? 'filter-btn active' : 'filter-btn';
                button.dataset.filter = category;
                button.textContent = category === 'all' ? 'All' : 
                                    category === 'ai/ml' ? 'AI/ML' : 
                                    category === 'genai' ? 'GenAI' :
                                    category === 'nlp' ? 'NLP' :
                                    category.charAt(0).toUpperCase() + category.slice(1);
                projectFilters.appendChild(button);
            });
            
            // Initialize filtering
            filterProjects();
        })
        .catch(error => {
            console.error('Error fetching GitHub repos:', error);
            projectsGrid.innerHTML = `
                <div class="error-message">
                    <i class="fas fa-exclamation-circle"></i>
                    <p>Failed to load GitHub repositories. Please try again later.</p>
                </div>
            `;
        });
};

// Create AI/ML background icons with truly random movement and no overlap
const createHeroBackground = () => {
    const heroBackground = document.querySelector('.hero-background');
    if (!heroBackground) return;
    
    // Clear any existing icons
    heroBackground.innerHTML = '';
    
    // AI/ML related icons
    const icons = [
        'fa-brain', 'fa-robot', 'fa-microchip', 'fa-network-wired', 
        'fa-project-diagram', 'fa-code', 'fa-database', 'fa-chart-line',
        'fa-cogs', 'fa-laptop-code', 'fa-server', 'fa-cloud', 
        'fa-atom', 'fa-microscope', 'fa-layer-group', 'fa-dna'
    ];
    
    // Create a separate stylesheet for our animations
    const styleSheet = document.createElement('style');
    document.head.appendChild(styleSheet);
    
    // Number of icons to create
    const numIcons = 20;
    
    // Create icons with completely random start positions and paths
    for (let i = 0; i < numIcons; i++) {
        const icon = document.createElement('i');
        const randomIcon = icons[Math.floor(Math.random() * icons.length)];
        
        icon.className = `fas ${randomIcon} ai-icon`;
        
        // Random starting position
        const startX = Math.random() * 100;
        const startY = Math.random() * 100;
        
        icon.style.left = `${startX}%`;
        icon.style.top = `${startY}%`;
        
        // Random size
        const size = 2 + Math.random() * 3;
        icon.style.fontSize = `${size}rem`;
        
        // Generate unique animation name
        const animName = `move-${i}`;
        
        // Create a path across the canvas with 4-5 points
        const points = 4 + Math.floor(Math.random() * 2);
        let keyframeCSS = `@keyframes ${animName} {\n`;
        
        // Create a series of points that actually traverse across the canvas
        for (let p = 0; p <= points; p++) {
            const percent = (p / points) * 100;
            
            // For actual movement, use percent-based positions (0-100%) rather than pixel-based transforms
            const posX = Math.random() * 100; // random position across width
            const posY = Math.random() * 100; // random position across height
            
            // Ensure it's different from the starting position
            // and add rotation for visual interest
            const rotation = Math.random() * 360;
            const scale = 0.7 + Math.random() * 0.6;
            
            keyframeCSS += `  ${percent}% { left: ${posX}%; top: ${posY}%; transform: rotate(${rotation}deg) scale(${scale}); }\n`;
        }
        
        keyframeCSS += `}\n`;
        
        styleSheet.sheet.insertRule(keyframeCSS, styleSheet.sheet.cssRules.length);
        
        const duration = 40 + Math.random() * 40; 
        const delay = Math.random() * 10;
        
        const timingFunction = Math.random() > 0.5 ? 'linear' : 'ease-in-out';
        
        icon.style.animation = `${animName} ${duration}s ${timingFunction} ${delay}s infinite`;
        
        heroBackground.appendChild(icon);
    }
};

// Theme toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    const themeToggleBtn = document.querySelector('.theme-toggle');
    
    // Check if user has a saved preference
    const savedTheme = localStorage.getItem('theme');
    
    // If no saved preference, check system preference
    if (!savedTheme) {
        // Check if system prefers dark mode
        const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
        document.documentElement.setAttribute('data-theme', prefersDarkMode ? 'dark' : 'light');
    } else {
        // Use the saved preference
        document.documentElement.setAttribute('data-theme', savedTheme);
    }
    
    // Update icons to match current theme
    updateThemeToggleIcons();
    
    // Add click event listener to the theme toggle button
    themeToggleBtn.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        // Set the new theme
        document.documentElement.setAttribute('data-theme', newTheme);
        
        // Save to localStorage
        localStorage.setItem('theme', newTheme);
        
        // Update the icons
        updateThemeToggleIcons();
    });
    
    // Function to update the theme toggle icons based on current theme
    function updateThemeToggleIcons() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const sunIcon = themeToggleBtn.querySelector('.fa-sun');
        const moonIcon = themeToggleBtn.querySelector('.fa-moon');
        
        if (currentTheme === 'dark') {
            moonIcon.style.opacity = '1';
            sunIcon.style.opacity = '0';
        } else {
            moonIcon.style.opacity = '0';
            sunIcon.style.opacity = '1';
        }
    }
    
    // Also listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        // Only apply if user hasn't set a preference
        if (!localStorage.getItem('theme')) {
            const newTheme = e.matches ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', newTheme);
            updateThemeToggleIcons();
        }
    });
});

const backToTopHandler = () => {
    const backToTopBtn = document.getElementById('back-to-top');
    
    if (!backToTopBtn) return;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    backToTopBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
};

const handleSecuredLinks = () => {
    const securedLinks = document.querySelectorAll('.secured-link');
    
    securedLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const target = link.getAttribute('data-target');
            
            const urls = {
                twitter: 'https://www.twitter.com/MrVedPandya1',
                youtube: 'https://www.youtube.com/@vedantamitpandya?sub_confirmation=1',
                linkedin: 'https://linkedin.com/in/vedant-pandya-662122135',
                github: 'https://github.com/pandyaved98',
                kaggle: 'https://kaggle.com/vedantpandya',
                mail: 'mailto:contact@pandyaved1999@gmail.com'
            };
            
            if (urls[target]) {
                window.open(urls[target], '_blank');
            }
        });
    });
};

// Set dark theme as default
document.addEventListener('DOMContentLoaded', function() {
    // Check for saved theme preference or use dark theme as default
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
    }
    
    // Show theme change arrow indicator (only on first visit)
    if (!localStorage.getItem('arrowShown')) {
        const themeArrow = document.createElement('div');
        themeArrow.className = 'theme-arrow';
        themeArrow.innerHTML = '<i class="fas fa-long-arrow-alt-right"></i>';
        document.body.appendChild(themeArrow);
        
        // Hide the arrow after 5 seconds
        setTimeout(() => {
            themeArrow.classList.add('fade-out');
            setTimeout(() => {
                themeArrow.remove();
            }, 1000);
        }, 5000);
        
        localStorage.setItem('arrowShown', 'true');
    }
    
    // Rest of your initialization code...
});

document.addEventListener('DOMContentLoaded', () => {
    navSlide();
    scrollNav();
    typeWriter();
    animateSkillBars();
    filterProjects();
    handleFormSubmit();
    animateOnScroll();
    handleProfileImage();
    loadGitHubProjects();
    createHeroBackground();
    backToTopHandler();
    handleSecuredLinks();
}); 