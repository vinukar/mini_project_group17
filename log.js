document.addEventListener('DOMContentLoaded', () => {
    const historyListContainer = document.getElementById('history-list');
    
    // Load history from localStorage
    const historyStr = localStorage.getItem('vitacare_history') || '[]';
    const history = JSON.parse(historyStr);
    
    if (history.length > 0) {
        // Clear empty state
        historyListContainer.innerHTML = '';
        
        history.forEach(item => {
            const card = document.createElement('div');
            card.className = 'history-card glass-panel';
            
            card.innerHTML = `
                <div class="history-main">
                    <h3>${item.hospitalName}</h3>
                    <div class="history-details">
                        <div class="detail-item">
                            <i class="fa-solid fa-user"></i>
                            <span>Patient: <strong>${item.patientName}</strong></span>
                        </div>
                        <div class="detail-item">
                            <i class="fa-solid fa-id-card"></i>
                            <span>ID: <strong>${item.patientId}</strong></span>
                        </div>
                        <div class="detail-item">
                            <i class="fa-solid fa-file-medical"></i>
                            <span>Reports: <strong>${item.reportName}</strong></span>
                        </div>
                        <div class="detail-item">
                            <i class="fa-solid fa-calendar-check"></i>
                            <span>Reserved: <strong>${item.date} at ${item.time}</strong></span>
                        </div>
                        <div class="detail-item">
                            <i class="fa-solid fa-credit-card"></i>
                            <span>Paid On: <strong>${item.paidTime}</strong></span>
                        </div>
                    </div>
                </div>
                <div class="history-badge">
                    <div class="token-badge">TOKEN #${item.token}</div>
                    <div class="price-badge">LKR ${item.totalPrice.toFixed(2)}</div>
                    <div style="color: var(--success); font-weight: 600; font-size: 0.8rem; text-transform: uppercase;">
                        <i class="fa-solid fa-circle-check"></i> Validated
                    </div>
                </div>
            `;
            
            historyListContainer.appendChild(card);
        });
    }
});