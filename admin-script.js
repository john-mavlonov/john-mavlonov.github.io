// Admin Panel Script

// Initialize admin panel
document.addEventListener('DOMContentLoaded', () => {
    loadAdminData();
    setupMenuListeners();
    setupFormListeners();
    updateTime();
    setInterval(updateTime, 60000);
});

// Menu Navigation
function setupMenuListeners() {
    const menuItems = document.querySelectorAll('.menu-item');
    
    menuItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            
            const section = item.dataset.section;
            
            // Remove active class from all items and sections
            menuItems.forEach(m => m.classList.remove('active'));
            document.querySelectorAll('.admin-section, .dashboard-section').forEach(s => s.classList.remove('active'));
            
            // Add active class to current item and section
            item.classList.add('active');
            const sectionElement = document.getElementById(section);
            if (sectionElement) {
                sectionElement.classList.add('active');
            }
        });
    });
}

// Update current time
function updateTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
    });
    document.getElementById('currentTime').textContent = timeString;
}

// Load admin data from localStorage
function loadAdminData() {
    const data = JSON.parse(localStorage.getItem('adminData')) || getDefaultData();
    
    // Load profile data
    document.getElementById('fullName').value = data.profile?.fullName || 'John Mavlonov';
    document.getElementById('profTitle').value = data.profile?.title || 'Premium Pizza Chef';
    document.getElementById('profileEmail').value = data.profile?.email || 'john@mavlonov.com';
    document.getElementById('profilePhone').value = data.profile?.phone || '+1 (234) 567-890';
    document.getElementById('profileLocation').value = data.profile?.location || 'Italy, Europe';
    document.getElementById('yearsExp').value = data.profile?.experience || '4+ Years';
    document.getElementById('bio').value = data.profile?.bio || '';
    
    // Load contact data
    document.getElementById('contactEmail').value = data.contact?.email || 'john@mavlonov.com';
    document.getElementById('contactPhone').value = data.contact?.phone || '+1 (234) 567-890';
    document.getElementById('contactLocation').value = data.contact?.location || 'Italy, Europe';
    
    // Load messages count
    const messages = data.messages || [];
    document.getElementById('messagesCount').textContent = messages.length;
    
    // Load portfolio items
    loadPortfolioItems(data.portfolio || []);
    
    // Load skills
    loadSkills(data.skills || []);
    
    // Load timeline
    loadTimeline(data.timeline || []);
    
    // Generate stats
    generateStats(data);
}

// Get default data
function getDefaultData() {
    return {
        profile: {
            fullName: 'John Mavlonov',
            title: 'Premium Pizza Chef',
            email: 'john@mavlonov.com',
            phone: '+1 (234) 567-890',
            location: 'Italy, Europe',
            experience: '4+ Years',
            bio: ''
        },
        contact: {
            email: 'john@mavlonov.com',
            phone: '+1 (234) 567-890',
            location: 'Italy, Europe'
        },
        portfolio: [
            { name: 'Margherita', category: 'Traditional', description: 'Classic Italian with fresh basil' },
            { name: 'Pepperoni Perfetto', category: 'Traditional', description: 'Premium Italian pepperoni' },
            { name: 'Truffle Elegance', category: 'Gourmet', description: 'Black truffle and goat cheese' }
        ],
        skills: [
            { name: 'Pizzaiolo Mastery', level: 95, description: 'Traditional and contemporary pizza preparation' },
            { name: 'Sous Chef Leadership', level: 88, description: 'Kitchen management and team coordination' },
            { name: 'Ingredient Sourcing', level: 92, description: 'Premium ingredient selection' }
        ],
        timeline: [
            { year: 2020, title: 'Beginning the Journey', description: 'Started professional pizza-making career' },
            { year: 2024, title: 'Innovation & Leadership', description: 'Leading kitchen operations' }
        ],
        messages: []
    };
}

// Generate statistics
function generateStats(data) {
    // Views count
    const views = Math.floor(Math.random() * 5000) + 1000;
    document.getElementById('viewsCount').textContent = views.toLocaleString();
    
    // Portfolio count
    document.getElementById('portfolioCount').textContent = (data.portfolio || []).length;
}

// Load portfolio items
function loadPortfolioItems(items) {
    const list = document.getElementById('portfolioList');
    list.innerHTML = '';
    
    items.forEach(item => {
        const div = document.createElement('div');
        div.className = 'portfolio-item';
        div.innerHTML = `
            <div>
                <div class="portfolio-item-header">
                    <h3>${item.name}</h3>
                    <span class="category-badge">${item.category}</span>
                </div>
                <p>${item.description}</p>
            </div>
            <div class="item-actions">
                <button class="btn-small btn-edit">Edit</button>
                <button class="btn-small btn-delete">Delete</button>
            </div>
        `;
        
        div.querySelector('.btn-delete').addEventListener('click', () => {
            deletePortfolioItem(item.name);
        });
        
        list.appendChild(div);
    });
}

// Delete portfolio item
function deletePortfolioItem(name) {
    const data = JSON.parse(localStorage.getItem('adminData')) || getDefaultData();
    data.portfolio = data.portfolio.filter(item => item.name !== name);
    localStorage.setItem('adminData', JSON.stringify(data));
    loadAdminData();
}

// Load skills
function loadSkills(skills) {
    const list = document.getElementById('skillsList');
    list.innerHTML = '';
    
    skills.forEach(skill => {
        const div = document.createElement('div');
        div.className = 'skill-item';
        div.innerHTML = `
            <div class="skill-info">
                <h4>${skill.name}</h4>
                <p>${skill.description}</p>
            </div>
            <div class="skill-level-display">${skill.level}%</div>
            <button class="btn-small btn-delete">Remove</button>
        `;
        
        div.querySelector('.btn-delete').addEventListener('click', () => {
            deleteSkill(skill.name);
        });
        
        list.appendChild(div);
    });
}

// Delete skill
function deleteSkill(name) {
    const data = JSON.parse(localStorage.getItem('adminData')) || getDefaultData();
    data.skills = data.skills.filter(skill => skill.name !== name);
    localStorage.setItem('adminData', JSON.stringify(data));
    loadAdminData();
}

// Load timeline
function loadTimeline(timeline) {
    const list = document.getElementById('timelineList').querySelector('.timeline-events');
    list.innerHTML = '';
    
    // Sort by year descending
    timeline.sort((a, b) => b.year - a.year);
    
    timeline.forEach(event => {
        const div = document.createElement('div');
        div.className = 'timeline-event';
        div.innerHTML = `
            <span class="event-year">${event.year}</span>
            <h4>${event.title}</h4>
            <p>${event.description}</p>
            <button class="btn-small btn-delete">Remove</button>
        `;
        
        div.querySelector('.btn-delete').addEventListener('click', () => {
            deleteTimelineEvent(event.year, event.title);
        });
        
        list.appendChild(div);
    });
}

// Delete timeline event
function deleteTimelineEvent(year, title) {
    const data = JSON.parse(localStorage.getItem('adminData')) || getDefaultData();
    data.timeline = data.timeline.filter(event => !(event.year === year && event.title === title));
    localStorage.setItem('adminData', JSON.stringify(data));
    loadAdminData();
}

// Setup form listeners
function setupFormListeners() {
    // Profile form
    document.getElementById('profileForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const data = JSON.parse(localStorage.getItem('adminData')) || getDefaultData();
        
        data.profile = {
            fullName: document.getElementById('fullName').value,
            title: document.getElementById('profTitle').value,
            email: document.getElementById('profileEmail').value,
            phone: document.getElementById('profilePhone').value,
            location: document.getElementById('profileLocation').value,
            experience: document.getElementById('yearsExp').value,
            bio: document.getElementById('bio').value
        };
        
        localStorage.setItem('adminData', JSON.stringify(data));
        showNotification('Profile saved successfully!');
    });
    
    // Contact form
    document.getElementById('contactForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const data = JSON.parse(localStorage.getItem('adminData')) || getDefaultData();
        
        data.contact = {
            email: document.getElementById('contactEmail').value,
            phone: document.getElementById('contactPhone').value,
            location: document.getElementById('contactLocation').value
        };
        
        localStorage.setItem('adminData', JSON.stringify(data));
        showNotification('Contact info saved successfully!');
    });
    
    // Portfolio form
    document.getElementById('portfolioForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const data = JSON.parse(localStorage.getItem('adminData')) || getDefaultData();
        
        const newItem = {
            name: document.getElementById('itemName').value,
            category: document.getElementById('itemCategory').value,
            description: document.getElementById('itemDescription').value
        };
        
        data.portfolio.push(newItem);
        localStorage.setItem('adminData', JSON.stringify(data));
        
        closePortfolioModal();
        loadPortfolioItems(data.portfolio);
        showNotification('Portfolio item added successfully!');
    });
    
    // Skill form
    document.getElementById('skillForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const data = JSON.parse(localStorage.getItem('adminData')) || getDefaultData();
        
        const newSkill = {
            name: document.getElementById('skillName').value,
            level: parseInt(document.getElementById('skillLevel').value),
            description: document.getElementById('skillDesc').value
        };
        
        data.skills.push(newSkill);
        localStorage.setItem('adminData', JSON.stringify(data));
        
        document.getElementById('skillForm').reset();
        loadSkills(data.skills);
        showNotification('Skill added successfully!');
    });
    
    // Timeline form
    document.getElementById('timelineForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const data = JSON.parse(localStorage.getItem('adminData')) || getDefaultData();
        
        const newEvent = {
            year: parseInt(document.getElementById('timelineYear').value),
            title: document.getElementById('timelineTitle').value,
            description: document.getElementById('timelineDesc').value
        };
        
        data.timeline.push(newEvent);
        localStorage.setItem('adminData', JSON.stringify(data));
        
        document.getElementById('timelineForm').reset();
        loadTimeline(data.timeline);
        showNotification('Timeline event added successfully!');
    });
    
    // Add portfolio button
    document.getElementById('addPortfolioBtn').addEventListener('click', () => {
        openPortfolioModal();
    });
}

// Portfolio modal
function openPortfolioModal() {
    document.getElementById('portfolioModal').style.display = 'flex';
}

function closePortfolioModal() {
    document.getElementById('portfolioModal').style.display = 'none';
    document.getElementById('portfolioForm').reset();
}

window.closePortfolioModal = closePortfolioModal;

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    const modal = document.getElementById('portfolioModal');
    if (e.target === modal) {
        closePortfolioModal();
    }
});

// Notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #D4AF37 0%, #E8C547 100%);
        color: #222;
        padding: 16px 24px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(212, 175, 55, 0.3);
        font-weight: 600;
        z-index: 2000;
        animation: slideInRight 0.3s ease-out;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideInRight 0.3s ease-out reverse';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Add animation for notification
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);

// Export data
function exportData() {
    const data = JSON.parse(localStorage.getItem('adminData')) || getDefaultData();
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'portfolio-data.json';
    a.click();
}

// Import data
function importData(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const data = JSON.parse(e.target.result);
            localStorage.setItem('adminData', JSON.stringify(data));
            loadAdminData();
            showNotification('Data imported successfully!');
        } catch (error) {
            showNotification('Error importing data');
        }
    };
    reader.readAsText(file);
}

// Make functions available globally
window.exportData = exportData;
window.importData = importData;
