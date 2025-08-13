// Admin Panel JavaScript Functionality

// Initialize admin panel when DOM is loaded
document.addEventListener("DOMContentLoaded", function() {
    try {
        initializeAdminPanel();
        loadDashboardData();
        setupEventListeners();
    } catch (error) {
        console.error("Error initializing admin panel:", error);
    }
});

// Initialize admin panel
function initializeAdminPanel() {
    // Show dashboard by default
    showSection('dashboard');
    
    // Load initial data
    loadUsers();
    loadGames();
    loadPrizes();
    loadTransactions();
}

// Setup event listeners
function setupEventListeners() {
    // Menu navigation
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const section = this.getAttribute('data-section');
            showSection(section);
            
            // Update active menu item
            menuItems.forEach(mi => mi.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Search functionality
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            filterUsers(this.value);
        });
    }
    
    // Filter functionality
    const filterSelects = document.querySelectorAll('.filter-select');
    filterSelects.forEach(select => {
        select.addEventListener('change', function() {
            applyFilters();
        });
    });
}

// Show specific section
function showSection(sectionId) {
    // Hide all sections
    const sections = document.querySelectorAll('.admin-section');
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    // Show selected section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
    }
}

// Dashboard Functions
function loadDashboardData() {
    // Simulate loading dashboard statistics
    const stats = {
        totalUsers: 1247,
        activeGames: 8,
        todayRevenue: 15420.00,
        prizesDelivered: 342
    };
    
    updateDashboardStats(stats);
    loadRecentActivity();
}

function updateDashboardStats(stats) {
    // Update stat numbers (this would normally come from an API)
    const statNumbers = document.querySelectorAll('.stat-number');
    if (statNumbers.length >= 4) {
        statNumbers[0].textContent = stats.totalUsers.toLocaleString();
        statNumbers[1].textContent = stats.activeGames;
        statNumbers[2].textContent = `R$ ${stats.todayRevenue.toLocaleString('pt-BR', {minimumFractionDigits: 2})}`;
        statNumbers[3].textContent = stats.prizesDelivered;
    }
}

function loadRecentActivity() {
    // This would normally load from an API
    const activities = [
        { time: '10:30', text: 'Usuário João S. ganhou R$ 100,00 no Raspa Fácil' },
        { time: '10:15', text: 'Nova conta criada: Maria P.' },
        { time: '09:45', text: 'Saque processado: R$ 500,00 para Carlos M.' },
        { time: '09:30', text: 'Usuário Ana L. ganhou iPhone 15 no PremiaRaspa' },
        { time: '09:15', text: 'Depósito realizado: R$ 200,00 por Pedro K.' }
    ];
    
    const activityList = document.querySelector('.activity-list');
    if (activityList) {
        activityList.innerHTML = activities.map(activity => `
            <div class="activity-item">
                <span class="activity-time">${activity.time}</span>
                <span class="activity-text">${activity.text}</span>
            </div>
        `).join('');
    }
}

// User Management Functions
function loadUsers() {
    // Simulate loading users from database
    const users = [
        { id: 1, name: 'João Silva', email: 'joao@email.com', balance: 150.00, status: 'active', created: '15/01/2025' },
        { id: 2, name: 'Maria Santos', email: 'maria@email.com', balance: 0.00, status: 'demo', created: '14/01/2025' },
        { id: 3, name: 'Pedro Costa', email: 'pedro@email.com', balance: 75.50, status: 'active', created: '13/01/2025' },
        { id: 4, name: 'Ana Oliveira', email: 'ana@email.com', balance: 0.00, status: 'blocked', created: '12/01/2025' },
        { id: 5, name: 'Carlos Mendes', email: 'carlos@email.com', balance: 200.00, status: 'active', created: '11/01/2025' }
    ];
    
    updateUsersTable(users);
}

function updateUsersTable(users) {
    const tbody = document.getElementById('usersTableBody');
    if (!tbody) return;
    
    tbody.innerHTML = users.map(user => `
        <tr>
            <td>${String(user.id).padStart(3, '0')}</td>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>R$ ${user.balance.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</td>
            <td><span class="status ${user.status}">${getStatusText(user.status)}</span></td>
            <td>${user.created}</td>
            <td>
                <button class="btn-edit" onclick="editUser(${user.id})">Editar</button>
                <button class="btn-block" onclick="blockUser(${user.id})">${user.status === 'blocked' ? 'Desbloquear' : 'Bloquear'}</button>
            </td>
        </tr>
    `).join('');
}

function getStatusText(status) {
    const statusMap = {
        'active': 'Ativo',
        'inactive': 'Inativo',
        'demo': 'Demo',
        'blocked': 'Bloqueado'
    };
    return statusMap[status] || status;
}

function filterUsers(searchTerm) {
    // This would normally filter on the server side
    console.log('Filtering users by:', searchTerm);
    // Implement client-side filtering for demo purposes
}

function applyFilters() {
    // Apply selected filters
    console.log('Applying filters...');
}

// Demo Account Functions
function setDemoBalance() {
    const userSelect = document.getElementById('demoUserSelect');
    const balanceInput = document.getElementById('demoBalance');
    
    if (!userSelect.value) {
        alert('Por favor, selecione um usuário demo.');
        return;
    }
    
    if (!balanceInput.value || balanceInput.value < 0) {
        alert('Por favor, insira um valor válido.');
        return;
    }
    
    const userId = userSelect.value;
    const balance = parseFloat(balanceInput.value);
    
    // Simulate API call
    console.log(`Setting demo balance for user ${userId}: R$ ${balance}`);
    
    // Show success message
    showNotification('Saldo demo definido com sucesso!', 'success');
    
    // Clear form
    balanceInput.value = '';
}

function saveDemoSettings() {
    const settings = {
        allowWithdraw: document.getElementById('allowWithdraw').checked,
        allowDeposit: document.getElementById('allowDeposit').checked,
        showRealPrizes: document.getElementById('showRealPrizes').checked,
        dailyLimit: document.getElementById('dailyLimit').value
    };
    
    // Simulate API call
    console.log('Saving demo settings:', settings);
    
    showNotification('Configurações salvas com sucesso!', 'success');
}

// User Management Functions
function editUser(userId) {
    console.log('Editing user:', userId);
    // This would open an edit modal with user data
    showNotification('Funcionalidade de edição em desenvolvimento', 'info');
}

function blockUser(userId) {
    if (confirm('Tem certeza que deseja bloquear/desbloquear este usuário?')) {
        console.log('Blocking/unblocking user:', userId);
        showNotification('Status do usuário alterado com sucesso!', 'success');
        // Reload users table
        loadUsers();
    }
}

// Game Management Functions
function loadGames() {
    // Games are already loaded in HTML, this would normally load from API
    console.log('Games loaded');
}

function editGame(gameId) {
    console.log('Editing game:', gameId);
    showNotification('Funcionalidade de edição de jogos em desenvolvimento', 'info');
}

function toggleGame(gameId) {
    if (confirm('Tem certeza que deseja ativar/desativar este jogo?')) {
        console.log('Toggling game:', gameId);
        showNotification('Status do jogo alterado com sucesso!', 'success');
    }
}

// Prize Management Functions
function loadPrizes() {
    // Prizes are already loaded in HTML
    console.log('Prizes loaded');
}

function editPrize(prizeId) {
    console.log('Editing prize:', prizeId);
    showNotification('Funcionalidade de edição de prêmios em desenvolvimento', 'info');
}

function deletePrize(prizeId) {
    if (confirm('Tem certeza que deseja remover este prêmio?')) {
        console.log('Deleting prize:', prizeId);
        showNotification('Prêmio removido com sucesso!', 'success');
    }
}

// Transaction Management Functions
function loadTransactions() {
    // Transactions are already loaded in HTML
    console.log('Transactions loaded');
}

function approveTransaction(transactionId) {
    if (confirm('Tem certeza que deseja aprovar esta transação?')) {
        console.log('Approving transaction:', transactionId);
        showNotification('Transação aprovada com sucesso!', 'success');
    }
}

function rejectTransaction(transactionId) {
    if (confirm('Tem certeza que deseja rejeitar esta transação?')) {
        console.log('Rejecting transaction:', transactionId);
        showNotification('Transação rejeitada!', 'warning');
    }
}

// Settings Functions
function showSettingsTab(tabName) {
    // Hide all settings content
    const contents = document.querySelectorAll('.settings-content');
    contents.forEach(content => {
        content.classList.remove('active');
    });
    
    // Show selected content
    const targetContent = document.getElementById(`${tabName}-settings`);
    if (targetContent) {
        targetContent.classList.add('active');
    }
    
    // Update active tab button
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(btn => {
        btn.classList.remove('active');
    });
    
    event.target.classList.add('active');
}

function saveSettings() {
    // Collect all settings
    const settings = {
        siteName: document.querySelector('#general-settings input[type="text"]').value,
        commissionRate: document.querySelector('#general-settings input[type="number"]').value,
        allowRegistrations: document.querySelector('#general-settings input[type="checkbox"]').checked,
        dailyLimit: document.querySelector('#games-settings input[type="number"]').value,
        winProbability: document.querySelector('#games-settings input[type="number"]:nth-of-type(2)').value,
        minWithdraw: document.querySelector('#payments-settings input[type="number"]').value,
        withdrawFee: document.querySelector('#payments-settings input[type="number"]:nth-of-type(2)').value
    };
    
    console.log('Saving settings:', settings);
    showNotification('Configurações salvas com sucesso!', 'success');
}

// Modal Functions
function openCreateUserModal() {
    const modal = document.getElementById('createUserModal');
    if (modal) {
        modal.style.display = 'block';
    }
}

function openCreateDemoModal() {
    // This would open a modal for creating demo accounts
    showNotification('Modal de criação de conta demo em desenvolvimento', 'info');
}

function openCreateGameModal() {
    showNotification('Modal de criação de jogo em desenvolvimento', 'info');
}

function openCreatePrizeModal() {
    showNotification('Modal de criação de prêmio em desenvolvimento', 'info');
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
    }
}

function createUser() {
    const form = document.getElementById('createUserForm');
    const formData = new FormData(form);
    
    const userData = {
        name: formData.get('name'),
        email: formData.get('email'),
        password: formData.get('password'),
        accountType: formData.get('accountType'),
        balance: parseFloat(formData.get('balance')) || 0
    };
    
    // Validate required fields
    if (!userData.name || !userData.email || !userData.password) {
        alert('Por favor, preencha todos os campos obrigatórios.');
        return;
    }
    
    // Simulate API call
    console.log('Creating user:', userData);
    
    showNotification('Usuário criado com sucesso!', 'success');
    closeModal('createUserModal');
    
    // Reset form
    form.reset();
    
    // Reload users table
    loadUsers();
}

// Utility Functions
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
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

// Add CSS for notification animation
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    .notification button {
        background: none;
        border: none;
        color: white;
        font-size: 18px;
        cursor: pointer;
        padding: 0;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
`;
document.head.appendChild(style);

// Close modals when clicking outside
window.addEventListener('click', function(event) {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});

// Handle escape key to close modals
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            if (modal.style.display === 'block') {
                modal.style.display = 'none';
            }
        });
    }
});

// RTP Settings Functions
function saveGameRTP(gameId) {
    console.log('Saving RTP for game:', gameId);
    
    // Get RTP values for the specific game
    const rtpInput = document.getElementById(`rtp-${gameId}`);
    const rtpValue = rtpInput ? rtpInput.value : 0;
    
    // Simulate API call
    const rtpData = {
        gameId: gameId,
        generalRTP: parseFloat(rtpValue),
        prizeRTPs: getPrizeRTPs(gameId)
    };
    
    console.log('RTP Data:', rtpData);
    showNotification(`RTP do jogo ${gameId} salvo com sucesso!`, 'success');
    
    // Update RTP indicator
    const indicator = document.getElementById(`indicator-${gameId}`);
    if (indicator) {
        indicator.textContent = `${rtpValue}%`;
    }
    
    // Update overall RTP summary
    updateRTPSummary();
}

function getPrizeRTPs(gameId) {
    // Get all prize RTP inputs for the specific game
    const gameCard = document.querySelector(`#rtp-${gameId}`).closest('.rtp-game-card');
    const prizeInputs = gameCard.querySelectorAll('.prize-rtp-input');
    const prizeNames = gameCard.querySelectorAll('.prize-name');
    
    const prizeRTPs = {};
    prizeInputs.forEach((input, index) => {
        const prizeName = prizeNames[index].textContent;
        prizeRTPs[prizeName] = parseFloat(input.value) || 0;
    });
    
    return prizeRTPs;
}

function saveAllRTPSettings() {
    const games = ['raspa-facil', 'raspe-ganhe', 'premia-raspa', 'raspa-sorte'];
    
    games.forEach(gameId => {
        saveGameRTP(gameId);
    });
    
    showNotification('Todas as configurações de RTP foram salvas!', 'success');
}

function updateRTPSummary() {
    // Calculate overall RTP based on all games
    const rtpInputs = document.querySelectorAll('.rtp-input');
    let totalRTP = 0;
    let gameCount = 0;
    
    rtpInputs.forEach(input => {
        if (input.value) {
            totalRTP += parseFloat(input.value);
            gameCount++;
        }
    });
    
    const averageRTP = gameCount > 0 ? (totalRTP / gameCount).toFixed(1) : 0;
    
    // Update summary display
    const overallRTPElement = document.getElementById('overall-rtp');
    if (overallRTPElement) {
        overallRTPElement.textContent = `${averageRTP}%`;
    }
    
    // Calculate estimated revenue and prizes (simplified calculation)
    const estimatedRevenue = 45000; // Base revenue
    const rtpMultiplier = averageRTP / 100;
    const estimatedPrizes = Math.round(estimatedRevenue * rtpMultiplier);
    
    const revenueElement = document.getElementById('estimated-revenue');
    const prizesElement = document.getElementById('estimated-prizes');
    
    if (revenueElement) {
        revenueElement.textContent = `R$ ${estimatedRevenue.toLocaleString('pt-BR', {minimumFractionDigits: 2})}`;
    }
    
    if (prizesElement) {
        prizesElement.textContent = `R$ ${estimatedPrizes.toLocaleString('pt-BR', {minimumFractionDigits: 2})}`;
    }
}

// Payment API Functions
function showAPITab(tabName) {
    // Hide all API config contents
    const contents = document.querySelectorAll('.api-config-content');
    contents.forEach(content => {
        content.classList.remove('active');
    });
    
    // Show selected content
    const targetContent = document.getElementById(`${tabName}-config`);
    if (targetContent) {
        targetContent.classList.add('active');
    }
    
    // Update active tab button
    const tabButtons = document.querySelectorAll('.api-tab-btn');
    tabButtons.forEach(btn => {
        btn.classList.remove('active');
    });
    
    event.target.classList.add('active');
}

function testConnection(apiProvider) {
    console.log('Testing connection for:', apiProvider);
    
    // Simulate API connection test
    showNotification('Testando conexão...', 'info');
    
    setTimeout(() => {
        const isConnected = Math.random() > 0.3; // 70% success rate for demo
        
        if (isConnected) {
            showNotification(`Conexão com ${apiProvider} estabelecida com sucesso!`, 'success');
            updateConnectionStatus(apiProvider, 'connected');
        } else {
            showNotification(`Falha na conexão com ${apiProvider}. Verifique as credenciais.`, 'error');
            updateConnectionStatus(apiProvider, 'disconnected');
        }
    }, 2000);
}

function updateConnectionStatus(apiProvider, status) {
    const statusElement = document.getElementById(`${apiProvider}-status`);
    if (statusElement) {
        statusElement.classList.remove('pix-status', 'disconnected');
        statusElement.textContent = status === 'connected' ? 'Conectado' : 'Desconectado';
        statusElement.classList.add(status === 'connected' ? 'pix-status' : 'disconnected');
    }
}

function saveAPIConfig(apiProvider) {
    console.log('Saving API config for:', apiProvider);
    
    // Get configuration data based on provider
    const configData = getAPIConfigData(apiProvider);
    
    // Simulate API call to save configuration
    console.log('Config data:', configData);
    
    showNotification(`Configuração do ${apiProvider} salva com sucesso!`, 'success');
}

function getAPIConfigData(apiProvider) {
    const configData = { provider: apiProvider };
    
    switch (apiProvider) {
        case 'pix':
            configData.pixKey = document.getElementById('pix-key')?.value;
            configData.keyType = document.getElementById('pix-key-type')?.value;
            configData.beneficiary = document.getElementById('pix-beneficiary')?.value;
            configData.bank = document.getElementById('pix-bank')?.value;
            configData.autoConfirm = document.getElementById('pix-auto-confirm')?.checked;
            break;
            
        case 'mercadopago':
            configData.accessToken = document.getElementById('mp-access-token')?.value;
            configData.publicKey = document.getElementById('mp-public-key')?.value;
            configData.sandboxToken = document.getElementById('mp-sandbox-token')?.value;
            configData.webhookUrl = document.getElementById('mp-webhook')?.value;
            configData.sandboxMode = document.getElementById('mp-sandbox-mode')?.checked;
            break;
            
        case 'pagseguro':
            configData.token = document.getElementById('ps-token')?.value;
            configData.email = document.getElementById('ps-email')?.value;
            configData.sandboxToken = document.getElementById('ps-sandbox-token')?.value;
            configData.notificationUrl = document.getElementById('ps-notification')?.value;
            configData.sandboxMode = document.getElementById('ps-sandbox-mode')?.checked;
            break;
            
        case 'paypal':
            configData.clientId = document.getElementById('paypal-client-id')?.value;
            configData.clientSecret = document.getElementById('paypal-client-secret')?.value;
            configData.sandboxId = document.getElementById('paypal-sandbox-id')?.value;
            configData.sandboxSecret = document.getElementById('paypal-sandbox-secret')?.value;
            configData.sandboxMode = document.getElementById('paypal-sandbox-mode')?.checked;
            break;
            
        case 'stripe':
            configData.secretKey = document.getElementById('stripe-secret-key')?.value;
            configData.publicKey = document.getElementById('stripe-public-key')?.value;
            configData.testSecret = document.getElementById('stripe-test-secret')?.value;
            configData.testPublic = document.getElementById('stripe-test-public')?.value;
            configData.webhookSecret = document.getElementById('stripe-webhook-secret')?.value;
            configData.webhookUrl = document.getElementById('stripe-webhook-url')?.value;
            configData.testMode = document.getElementById('stripe-test-mode')?.checked;
            break;
    }
    
    return configData;
}

function testAllConnections() {
    const providers = ['pix', 'mercadopago', 'pagseguro', 'paypal', 'stripe'];
    
    showNotification('Testando todas as conexões...', 'info');
    
    providers.forEach((provider, index) => {
        setTimeout(() => {
            testConnection(provider);
        }, index * 1000); // Stagger the tests
    });
}

function savePaymentSettings() {
    const settings = {
        minDeposit: document.getElementById('min-deposit')?.value,
        maxDeposit: document.getElementById('max-deposit')?.value,
        processingFee: document.getElementById('processing-fee')?.value,
        paymentTimeout: document.getElementById('payment-timeout')?.value,
        methods: {
            pix: document.getElementById('method-pix')?.checked,
            credit: document.getElementById('method-credit')?.checked,
            debit: document.getElementById('method-debit')?.checked,
            boleto: document.getElementById('method-boleto')?.checked
        }
    };
    
    console.log('Saving payment settings:', settings);
    showNotification('Configurações de pagamento salvas com sucesso!', 'success');
}

function clearLogs() {
    if (confirm('Tem certeza que deseja limpar todos os logs?')) {
        const logsContainer = document.querySelector('.logs-container');
        if (logsContainer) {
            logsContainer.innerHTML = '<div class="log-entry"><span class="log-message">Logs limpos pelo administrador</span></div>';
        }
        showNotification('Logs limpos com sucesso!', 'success');
    }
}

// Initialize RTP input listeners
function initializeRTPListeners() {
    const rtpInputs = document.querySelectorAll('.rtp-input');
    rtpInputs.forEach(input => {
        input.addEventListener('input', function() {
            const gameId = this.id.replace('rtp-', '');
            const indicator = document.getElementById(`indicator-${gameId}`);
            if (indicator) {
                indicator.textContent = `${this.value}%`;
            }
            updateRTPSummary();
        });
    });
    
    // Initialize prize RTP inputs
    const prizeRTPInputs = document.querySelectorAll('.prize-rtp-input');
    prizeRTPInputs.forEach(input => {
        input.addEventListener('input', function() {
            updateRTPSummary();
        });
    });
}

// Add to initialization
document.addEventListener("DOMContentLoaded", function() {
    try {
        initializeAdminPanel();
        loadDashboardData();
        setupEventListeners();
        initializeRTPListeners();
    } catch (error) {
        console.error("Error initializing admin panel:", error);
    }
});

// Export functions for global access
window.adminFunctions = {
    showSection,
    setDemoBalance,
    saveDemoSettings,
    editUser,
    blockUser,
    editGame,
    toggleGame,
    editPrize,
    deletePrize,
    approveTransaction,
    rejectTransaction,
    showSettingsTab,
    saveSettings,
    openCreateUserModal,
    openCreateDemoModal,
    openCreateGameModal,
    openCreatePrizeModal,
    closeModal,
    createUser,
    // RTP Functions
    saveGameRTP,
    saveAllRTPSettings,
    updateRTPSummary,
    // Payment API Functions
    showAPITab,
    testConnection,
    saveAPIConfig,
    testAllConnections,
    savePaymentSettings,
    clearLogs
};
