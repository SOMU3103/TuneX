// ===== MOBILE MENU FUNCTIONALITY =====
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    mobileMenu.classList.toggle('active');
}

function closeMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    mobileMenu.classList.remove('active');
}

// Close mobile menu when clicking outside
document.addEventListener('click', function(event) {
    const mobileMenu = document.getElementById('mobileMenu');
    const menuBtn = document.querySelector('.mobile-menu-btn');
    
    if (mobileMenu && menuBtn && !mobileMenu.contains(event.target) && !menuBtn.contains(event.target)) {
        mobileMenu.classList.remove('active');
    }
});

// ===== SMOOTH SCROLLING FOR NAVIGATION =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== SCROLL ANIMATION OBSERVER =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.scroll-animate').forEach(el => {
    observer.observe(el);
});

// ===== DOWNLOAD FUNCTIONALITY WITH ACTUAL FILE DOWNLOAD =====
function downloadVersion(version, button) {
    const overlay = document.getElementById('downloadOverlay');
    const progressModal = document.getElementById('downloadProgress');
    const percentText = document.getElementById('downloadPercent');
    const downloadText = document.querySelector('.download-text');
    
    // File URLs - UPDATE THESE WITH YOUR ACTUAL FILE PATHS
    const fileUrls = {
        'v1': 'main/TuneX_v1.zip', // Path to your v1.0 file
        'v2': 'main/TuneX_v2.zip', // Path to your v2.1 file
        'v3': 'main/TunexYT.zip'  // Path to your v3.0 file
    };
    
    const versionNames = {
        'v1': 'Version 1.0',
        'v2': 'Version 2.1',
        'v3': 'Version 3.0'
    };

    // Add downloading class to button
    button.classList.add('downloading');
    const originalText = button.querySelector('.btn-text').textContent;
    button.querySelector('.btn-text').textContent = 'Downloading...';
    
    // Show progress modal
    overlay.classList.add('active');
    progressModal.classList.add('active');
    
    // Simulate download progress
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress > 100) progress = 100;
        
        percentText.textContent = Math.floor(progress) + '%';
        
        if (progress >= 100) {
            clearInterval(interval);
            
            // Change text to complete
            downloadText.textContent = 'Complete!';
            
            // Hide after 1.5 seconds
            setTimeout(() => {
                overlay.classList.remove('active');
                progressModal.classList.remove('active');
                
                // Reset for next download
                setTimeout(() => {
                    percentText.textContent = '0%';
                    downloadText.textContent = 'Downloading...';
                    button.classList.remove('downloading');
                    button.querySelector('.btn-text').textContent = originalText;
                }, 300);
                
                // ACTUAL FILE DOWNLOAD
                const downloadUrl = fileUrls[version];
                const fileName = downloadUrl.split('/').pop();
                
                // Create temporary link for download
                const link = document.createElement('a');
                link.href = downloadUrl;
                link.download = fileName;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                
                // Show success message
                alert('TuneX ' + versionNames[version] + ' download complete!\n\nYour download should start automatically.');
            }, 1500);
        }
    }, 200);
}

// ===== INTERACTIVE MOUSE EFFECT =====
document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.background = `radial-gradient(circle at ${mouseX * 100}% ${mouseY * 100}%, rgba(76, 201, 240, 0.15) 0%, rgba(10, 10, 20, 0.8) 70%)`;
    }
});

// ===== AUTOMATICALLY DISPLAY CURRENT YEAR =====
document.addEventListener('DOMContentLoaded', function() {
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
});