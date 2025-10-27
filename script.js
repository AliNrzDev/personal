
// Default configuration
const defaultConfig = {
    full_name: "علی نوروزی",
    job_title: "طراح وبسایت",
    email: "aliwp.nrz@email.com",
    phone: "+98 914 *** **67",
    location: "تبریز، ایران",
    summary_text: "مهندس نرم‌افزار با بیش از 5 سال تجربه در توسعه وب و طراحی سایت‌های واکنش‌گرا. تخصص در HTML، CSS، JavaScript و WordPress با تجربه موفق در پیاده‌سازی پروژه‌های پیچیده و مدیریت تیم‌های توسعه. علاقه‌مند به یادگیری تکنولوژی‌های جدید و ارائه راه‌حل‌های خلاقانه.",
    company_name: "شرکت  سهند گستر",
    current_position: "توسعه‌دهنده  فرانت‌اند"
};

// Animation on scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('visible');
        }
    });
}

// Skill bar animation
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach((bar, index) => {
        setTimeout(() => {
            const width = bar.style.width;
            bar.style.width = '0%';
            setTimeout(() => {
                bar.style.width = width;
            }, 100);
        }, index * 200);
    });
}

// Initialize animations
window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', () => {
    animateOnScroll();
    setTimeout(animateSkillBars, 500);
});

// Tab functionality
function showTab(event, tabName) {
    // Hide all tab contents
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(content => {
        content.classList.remove('active');
    });

    // Remove active class from all tabs
    const tabs = document.querySelectorAll('.nav-tab');
    tabs.forEach(tab => {
        tab.classList.remove('active');
    });

    // Show selected tab content
    const target = document.getElementById(tabName);
    if (target) {
        target.classList.add('active');
    }

    // Add active class to clicked tab
    if (event && event.currentTarget) {
        event.currentTarget.classList.add('active');
    }

    // Re-trigger animations for the new tab
    setTimeout(() => {
        animateOnScroll();
    }, 100);
}

// Contact form handler
function handleContactForm(event) {
    event.preventDefault();
    
    const name = document.getElementById('contact-name').value;
    const email = document.getElementById('contact-email').value;
    const subject = document.getElementById('contact-subject').value;
    const message = document.getElementById('contact-message').value;

    // You can send the data to your backend here if needed.
    // For now: show success message
    const submitBtn = event.target.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'پیام ارسال شد ✓';
    submitBtn.style.background = '#27ae60';
    
    setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.style.background = '';
        event.target.reset();
    }, 3000);
}

// Element SDK implementation
async function onConfigChange(config) {
    document.getElementById('fullName').textContent = config.full_name || defaultConfig.full_name;
    document.getElementById('jobTitle').textContent = config.job_title || defaultConfig.job_title;
    document.getElementById('email').textContent = config.email || defaultConfig.email;
    document.getElementById('phone').textContent = config.phone || defaultConfig.phone;
    document.getElementById('location').textContent = config.location || defaultConfig.location;
    document.getElementById('summaryText').textContent = config.summary_text || defaultConfig.summary_text;
    document.getElementById('companyName').textContent = config.company_name || defaultConfig.company_name;
    document.getElementById('currentPosition').textContent = config.current_position || defaultConfig.current_position;
    
    // Update contact page info
    document.getElementById('contact-email-display').textContent = config.email || defaultConfig.email;
    document.getElementById('contact-phone-display').textContent = config.phone || defaultConfig.phone;
    document.getElementById('contact-location-display').textContent = config.location || defaultConfig.location;
}

function mapToCapabilities(config) {
    return {
        recolorables: [],
        borderables: [],
        fontEditable: undefined,
        fontSizeable: undefined
    };
}

function mapToEditPanelValues(config) {
    return new Map([
        ["full_name", config.full_name || defaultConfig.full_name],
        ["job_title", config.job_title || defaultConfig.job_title],
        ["email", config.email || defaultConfig.email],
        ["phone", config.phone || defaultConfig.phone],
        ["location", config.location || defaultConfig.location],
        ["summary_text", config.summary_text || defaultConfig.summary_text],
        ["company_name", config.company_name || defaultConfig.company_name],
        ["current_position", config.current_position || defaultConfig.current_position]
    ]);
}

// Initialize Element SDK
window.addEventListener('DOMContentLoaded', () => {
    if (window.elementSdk) {
        window.elementSdk.init({
            defaultConfig,
            onConfigChange,
            mapToCapabilities,
            mapToEditPanelValues
        });
    }
});

