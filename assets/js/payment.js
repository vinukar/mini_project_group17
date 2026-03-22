document.addEventListener('DOMContentLoaded', () => {
    const paymentForm = document.getElementById('payment-form');
    const paymentModal = document.getElementById('paymentModal');
    const modalCloseBtn = document.getElementById('modalCloseBtn');
    
    // Load data from localStorage
    const savedData = localStorage.getItem('vitacare_latest_booking');
    if (!savedData) {
        // No request submitted, return to home
        window.location.href = '../index.html';
        return;
    }
    
    const requestData = JSON.parse(savedData);
    
    // Check if already paid
    if (requestData.status === 'Paid') {
        window.location.href = '../index.html';
        return;
    }
    
    // Display summary
    document.getElementById('sum-patient').textContent = requestData.patientName;
    document.getElementById('sum-hospital').textContent = requestData.hospitalName;
    document.getElementById('sum-report').textContent = requestData.reportName;
    document.getElementById('sum-reserved-date').textContent = requestData.date;
    document.getElementById('sum-reserved-time').textContent = requestData.time;
    
    // Display total price pulled from the form selection (includes user discounts)
    document.getElementById('sum-price').textContent = `LKR ${requestData.totalPrice.toFixed(2)}`;
    
    // Display discount if available
    if (requestData.originalPrice > requestData.totalPrice) {
        document.getElementById('discount-section').style.display = 'block';
        document.getElementById('sum-original-price').textContent = `LKR ${requestData.originalPrice.toFixed(2)}`;
        document.getElementById('sum-discount-amount').textContent = `- LKR ${(requestData.originalPrice - requestData.totalPrice).toFixed(2)}`;
    }
    
    // Add input formatting for realistic UX
    document.getElementById('cardName').addEventListener('input', function(e) {
        e.target.value = e.target.value.replace(/[0-9]/g, '');
    });

    document.getElementById('cardNumber').addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, ''); // keep only digits
        let formatted = value.replace(/(.{4})/g, '$1 ').trim();
        e.target.value = formatted;
    });
    
    document.getElementById('expiry').addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        let formattedValue = '';

        if (value.length > 0) {
            let month = value.substring(0, 2);
            let year = value.substring(2, 4);
            
            if (month.length === 1 && parseInt(month) > 1) {
                formattedValue = '0' + month;
            } else {
                formattedValue = month;
            }

            if (value.length >= 2) {
                if (parseInt(month) > 12) {
                    formattedValue = '12';
                } else if (month === '00') {
                    formattedValue = '01';
                }
                
                if (year.length > 0) {
                    formattedValue += '/' + year;
                } else if (e.inputType !== 'deleteContentBackward') {
                    formattedValue += '/';
                }
            }
        }
        
        e.target.value = formattedValue;
        this.setCustomValidity('');
    });
    
    document.getElementById('cvv').addEventListener('input', function(e) {
        e.target.value = e.target.value.replace(/\D/g, '');
    });
    
    // Handle submitting the payment
    paymentForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Validate expiry date
        const expiryInput = document.getElementById('expiry');
        const expiryValue = expiryInput.value;
        const expiryParts = expiryValue.split('/');
        
        if (expiryParts.length !== 2 || expiryParts[0].length !== 2 || expiryParts[1].length !== 2) {
            expiryInput.setCustomValidity('Please enter a valid expiry date in MM/YY format');
            expiryInput.reportValidity();
            return;
        }

        const monthNum = parseInt(expiryParts[0], 10);
        const yearNum = parseInt(expiryParts[1], 10);

        if (isNaN(monthNum) || monthNum < 1 || monthNum > 12) {
            expiryInput.setCustomValidity('Month must be between 01 and 12');
            expiryInput.reportValidity();
            return;
        }

        if (isNaN(yearNum) || yearNum < 26) {
            expiryInput.setCustomValidity('Year must be 26 or above');
            expiryInput.reportValidity();
            return;
        }

        expiryInput.setCustomValidity('');
        
        // Simulate secure network processing
        const btn = document.getElementById('payBtn');
        btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Processing Securely...';
        btn.disabled = true;
        
        // Wait 1.5 seconds to feel realistic, then update status and show modal
        setTimeout(() => {
            // Populate Modal Data
            const now = new Date();
            const paidDateTime = now.toLocaleDateString() + ' ' + now.toLocaleTimeString();

            // Update status in storage
            requestData.status = 'Paid';
            localStorage.setItem('vitacare_latest_booking', JSON.stringify(requestData));
            
            // Store in global booked slots list to disable it for others
            const bookedSlotsStr = localStorage.getItem('vitacare_booked_slots') || '[]';
            const bookedSlots = JSON.parse(bookedSlotsStr);
            bookedSlots.push({
                hospital: requestData.hospitalName,
                date: requestData.date,
                time: requestData.time
            });
            localStorage.setItem('vitacare_booked_slots', JSON.stringify(bookedSlots));
 
            // Store in full history for the Log page
            const historyStr = localStorage.getItem('vitacare_history') || '[]';
            const history = JSON.parse(historyStr);
            history.unshift({
                ...requestData,
                paidTime: paidDateTime
            });
            localStorage.setItem('vitacare_history', JSON.stringify(history));
            
            // Show Success Modal
            paymentModal.style.display = 'flex';
            
            document.getElementById('modalToken').textContent = requestData.token;
            document.getElementById('modalName').textContent = requestData.patientName;
            document.getElementById('modalId').textContent = requestData.patientId;
            document.getElementById('modalHospital').textContent = requestData.hospitalName;
            document.getElementById('modalReport').textContent = requestData.reportName;
            document.getElementById('modalReservedDate').textContent = requestData.date;
            document.getElementById('modalReservedTime').textContent = requestData.time;
            document.getElementById('modalPaidTime').textContent = paidDateTime;
            document.getElementById('modalPrice').textContent = `LKR ${requestData.totalPrice.toFixed(2)}`;
            
            // Handle discount info in modal
            if (requestData.originalPrice > requestData.totalPrice) {
                document.getElementById('modal-discount-info').style.display = 'block';
                document.getElementById('modalOriginalPrice').textContent = `LKR ${requestData.originalPrice.toFixed(2)}`;
                document.getElementById('modalDiscountAmount').textContent = `- LKR ${(requestData.originalPrice - requestData.totalPrice).toFixed(2)}`;
            } else {
                document.getElementById('modal-discount-info').style.display = 'none';
            }
            
            // Slight delay for animation parsing
            setTimeout(() => {
                paymentModal.classList.add('show');
            }, 10);
            
            // Reset button
            btn.innerHTML = 'Pay Now <i class="fa-solid fa-lock"></i>';
            btn.disabled = false;
        }, 1500); 
    });
    
    // Handle Print
    const printBtn = document.getElementById('printBtn');
    if(printBtn) {
        printBtn.addEventListener('click', () => {
            window.print();
        });
    }
    
    // Handle modal close
    modalCloseBtn.addEventListener('click', () => {
        window.location.href = 'profile.html#reservation-history';
    });
});
