// Admin Authentication System
let loginAttempts = 3;
let isBlocked = false;
let blockEndTime = null;

// Valid admin credentials (in production, this would be server-side)
const validCredentials = {
    'admin': {
        password: 'admin123',
        securityCode: '123456',
        role: 'super_admin'
    },
    'moderador': {
        password: 'mod123',
        securityCode: '654321',
        role: 'moderator'
    },
    'suporte': {
        password: 'suporte123',
        securityCode: '111222',
        role: 'support'
    }
};

// Initialize authentication system
document.addEventListener("DOMContentLoaded", function() {
    try {
        initializeAuth();
        setupAuthEventListeners();
        checkExistingSession();
        checkBlockStatus();
    } catch (error) {
        console.error("Error initializing admin auth:", error);
    }
});

function initializeAuth() {
    updateAttemptsDisplay();
    
    // Add real-time validation
    const inputs = document.querySelectorAll('.admin-input');
    inputs.forEach(input => {
        input.addEventListener('input', validateInput);
        input.addEventListener('blur', validateInput);
    });
}

function setupAuthEventListeners() {
    const loginForm = document.getElementById('adminLoginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleAdminLogin);
    }
    
    // Prevent form submission on Enter if blocked
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && isBlocked) {
            e.preventDefault();
            showNotification('Acesso bloqueado. Tente novamente mais tarde.', 'error');
        }
    });
}

function handleAdminLogin(event) {
    event.preventDefault();
    
    if (isBlocked) {
        showNotification('Acesso bloqueado. Tente novamente mais tarde.', 'error');
        return;
    }
    
    const formData = new FormData(event.target);
    const credentials = {
        username: formData.get('username').toLowerCase().trim(),
        password: formData.get('password'),
        securityCode: formData.get('securityCode'),
        remember: formData.get('rememberAdmin') === 'on'
    };
    
    // Validate credentials
    if (validateCredentials(credentials)) {
        performLogin(credentials);
    } else {
        handleFailedLogin();
    }
}

function validateCredentials(credentials) {
    const { username, password, securityCode } = credentials;
    
    // Check if user exists
    if (!validCredentials[username]) {
        return false;
    }
    
    const validUser = validCredentials[username];
    
    // Validate password and security code
    return validUser.password === password && validUser.securityCode === securityCode;
}

function performLogin(credentials) {
    showLoadingOverlay(true);
    
    // Simulate server authentication delay
    setTimeout(() => {
        const userRole = validCredentials[credentials.username].role;
        
        // Create session
        const sessionData = {
            username: credentials.username,
            role: userRole,
            loginTime: new Date().toISOString(),
            expiresAt: credentials.remember 
                ? new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // 24 hours
                : new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString()  // 2 hours
        };
        
        // Store session
        localStorage.setItem('adminSession', JSON.stringify(sessionData));
        
        // Log successful login
        logLoginAttempt(credentials.username, true, userRole);
        
        showLoadingOverlay(false);
        showNotification('Login realizado com sucesso! Redirecionando...', 'success');
        
        // Reset attempts
        loginAttempts = 3;
        localStorage.removeItem('loginAttempts');
        localStorage.removeItem('blockEndTime');
        
        // Redirect to admin panel
        setTimeout(() => {
            window.location.href = 'admin.html';
        }, 1500);
        
    }, 2000);
}

function handleFailedLogin() {
    loginAttempts--;
    localStorage.setItem('loginAttempts', loginAttempts.toString());
    
    updateAttemptsDisplay();
    
    // Log failed attempt
    const username = document.getElementById('adminUsername').value;
    logLoginAttempt(username, false);
    
    if (loginAttempts <= 0) {
        blockAccess();
    } else {
        showNotification(`Credenciais inválidas. ${loginAttempts} tentativa(s) restante(s).`, 'error');
        
        // Clear form
        document.getElementById('adminPassword').value = '';
        document.getElementById('adminCode').value = '';
        
        // Shake animation
        const loginCard = document.querySelector('.admin-login-card');
        loginCard.classList.add('shake');
        setTimeout(() => {
            loginCard.classList.remove('shake');
        }, 500);
    }
}

function blockAccess() {
    isBlocked = true;
    blockEndTime = new Date(Date.now() + 30 * 60 * 1000); // 30 minutes
    localStorage.setItem('blockEndTime', blockEndTime.toISOString());
    
    // Disable form
    const form = document.getElementById('adminLoginForm');
    const inputs = form.querySelectorAll('input, button');
    inputs.forEach(input => {
        input.disabled = true;
    });
    
    showNotification('Acesso bloqueado por 30 minutos devido a múltiplas tentativas incorretas.', 'error');
    
    // Start countdown
    startBlockCountdown();
}

function startBlockCountdown() {
    const countdownInterval = setInterval(() => {
        const now = new Date();
        const timeLeft = blockEndTime - now;
        
        if (timeLeft <= 0) {
            // Unblock access
            isBlocked = false;
            loginAttempts = 3;
            localStorage.removeItem('blockEndTime');
            localStorage.removeItem('loginAttempts');
            
            // Re-enable form
            const form = document.getElementById('adminLoginForm');
            const inputs = form.querySelectorAll('input, button');
            inputs.forEach(input => {
                input.disabled = false;
            });
            
            updateAttemptsDisplay();
            showNotification('Acesso liberado. Você pode tentar fazer login novamente.', 'success');
            clearInterval(countdownInterval);
        } else {
            // Update countdown display
            const minutes = Math.floor(timeLeft / (1000 * 60));
            const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
            
            const attemptsElement = document.getElementById('loginAttempts');
            attemptsElement.innerHTML = `Bloqueado por: ${minutes}:${seconds.toString().padStart(2, '0')}`;
        }
    }, 1000);
}

function checkBlockStatus() {
    const storedBlockTime = localStorage.getItem('blockEndTime');
    const storedAttempts = localStorage.getItem('loginAttempts');
    
    if (storedBlockTime) {
        blockEndTime = new Date(storedBlockTime);
        const now = new Date();
        
        if (blockEndTime > now) {
            isBlocked = true;
            startBlockCountdown();
            
            // Disable form
            const form = document.getElementById('adminLoginForm');
            const inputs = form.querySelectorAll('input, button');
            inputs.forEach(input => {
                input.disabled = true;
            });
        } else {
            // Block expired
            localStorage.removeItem('blockEndTime');
            localStorage.removeItem('loginAttempts');
        }
    }
    
    if (storedAttempts && !isBlocked) {
        loginAttempts = parseInt(storedAttempts);
        updateAttemptsDisplay();
    }
}

function checkExistingSession() {
    const sessionData = localStorage.getItem('adminSession');
    
    if (sessionData) {
        try {
            const session = JSON.parse(sessionData);
            const now = new Date();
            const expiresAt = new Date(session.expiresAt);
            
            if (expiresAt > now) {
                // Valid session exists, redirect to admin panel
                showNotification('Sessão ativa encontrada. Redirecionando...', 'info');
                setTimeout(() => {
                    window.location.href = 'admin.html';
                }, 1000);
                return;
            } else {
                // Session expired
                localStorage.removeItem('adminSession');
            }
        } catch (error) {
            // Invalid session data
            localStorage.removeItem('adminSession');
        }
    }
}

function updateAttemptsDisplay() {
    const attemptsElement = document.getElementById('attemptsCount');
    if (attemptsElement) {
        attemptsElement.textContent = loginAttempts;
        
        // Color coding
        const loginAttemptsDiv = document.getElementById('loginAttempts');
        if (loginAttempts <= 1) {
            loginAttemptsDiv.style.color = '#e74c3c';
        } else if (loginAttempts <= 2) {
            loginAttemptsDiv.style.color = '#f39c12';
        } else {
            loginAttemptsDiv.style.color = '#27ae60';
        }
    }
}

function validateInput(event) {
    const input = event.target;
    const value = input.value.trim();
    
    // Remove previous validation classes
    input.classList.remove('valid', 'invalid');
    
    // Validate based on input type
    let isValid = false;
    
    switch (input.id) {
        case 'adminUsername':
            isValid = value.length >= 3 && /^[a-zA-Z0-9_]+$/.test(value);
            break;
        case 'adminPassword':
            isValid = value.length >= 6;
            break;
        case 'adminCode':
            isValid = /^\d{6}$/.test(value);
            break;
    }
    
    // Add validation class
    if (value.length > 0) {
        input.classList.add(isValid ? 'valid' : 'invalid');
    }
}

function logLoginAttempt(username, success, role = null) {
    const logEntry = {
        timestamp: new Date().toISOString(),
        username: username,
        success: success,
        role: role,
        ip: 'localhost', // In production, get real IP
        userAgent: navigator.userAgent
    };
    
    // Store in localStorage (in production, send to server)
    const logs = JSON.parse(localStorage.getItem('adminLoginLogs') || '[]');
    logs.unshift(logEntry);
    
    // Keep only last 50 logs
    if (logs.length > 50) {
        logs.splice(50);
    }
    
    localStorage.setItem('adminLoginLogs', JSON.stringify(logs));
    
    console.log('Login attempt logged:', logEntry);
}

function showLoadingOverlay(show) {
    const overlay = document.getElementById('loadingOverlay');
    if (overlay) {
        overlay.style.display = show ? 'flex' : 'none';
    }
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `admin-notification notification-${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button onclick="this.parentElement.remove()">&times;</button>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: ${getNotificationColor(type)};
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.2);
        z-index: 1001;
        display: flex;
        align-items: center;
        gap: 15px;
        max-width: 400px;
        animation: slideIn 0.3s ease;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

function getNotificationColor(type) {
    const colors = {
        'success': '#27ae60',
        'error': '#e74c3c',
        'warning': '#f39c12',
        'info': '#3498db'
    };
    return colors[type] || colors.info;
}

// Export functions for testing
window.adminAuth = {
    validateCredentials,
    handleAdminLogin,
    checkExistingSession,
    logLoginAttempt
};
