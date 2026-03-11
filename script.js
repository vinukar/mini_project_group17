document.addEventListener('DOMContentLoaded', () => {
    // Mock Data
    const hospitals = [
        { id: 'h1', name: 'National Hospital of Sri Lanka (NHSL), Colombo' },
        { id: 'h2', name: 'Lady Ridgeway Hospital for Children, Colombo' },
        { id: 'h3', name: 'Castle Street Hospital for Women' },
        { id: 'h4', name: 'De Soysa Hospital for Women' },
        { id: 'h5', name: 'National Cancer Institute (Apeksha Hospital), Maharagama' },
        { id: 'h6', name: 'Eye Hospital, Colombo' },
        { id: 'h7', name: 'Teaching Hospital Colombo South (Kalubowila)' },
        { id: 'h8', name: 'Infectious Disease Hospital (IDH), Angoda' },
        { id: 'h9', name: 'National Hospital (Teaching), Kandy' },
        { id: 'h10', name: 'Sirimavo Bandaranaike Specialized Children Hospital, Peradeniya' },
        { id: 'h11', name: 'General Hospital (Teaching), Peradeniya' },
        { id: 'h12', name: 'Teaching Hospital Karapitiya, Galle' },
        { id: 'h13', name: 'Anuradhapura Teaching Hospital' },
        { id: 'h14', name: 'Jaffna Teaching Hospital' },
        { id: 'h15', name: 'Batticaloa Teaching Hospital' },
        { id: 'h16', name: 'Teaching Hospital - Kurunegala' },
        { id: 'h17', name: 'Ratnapura Teaching Hospital' },
        { id: 'h18', name: 'Provincial General Hospital, Badulla' },
        { id: 'h19', name: 'District General Hospital, Gampaha' },
        { id: 'h20', name: 'District General Hospital, Negombo' },
        { id: 'h21', name: 'District General Hospital, Polonnaruwa' },
        { id: 'h22', name: 'District General Hospital, Matale' },
        { id: 'h23', name: 'Ampara General Hospital' },
        { id: 'h24', name: 'Hambantota District General Hospital' },
        { id: 'h25', name: 'Chilaw District General Hospital' }
    ];

    const reportTypes = [
        { id: 'r1', name: 'Full Blood Count (FBC)', price: 1500 },
        { id: 'r2', name: 'Lipid Profile', price: 3000 },
        { id: 'r3', name: 'Liver Function Test (LFT)', price: 2800 },
        { id: 'r4', name: 'Thyroid Function Test', price: 2800 },
        { id: 'r5', name: 'X-Ray (Chest)', price: 2500 },
        { id: 'r6', name: 'MRI Scan', price: 8500 },
        { id: 'r7', name: 'CT Scan', price: 6500 },
        { id: 'r8', name: 'Urine Analysis', price: 1200 }
    ];

    // DOM Elements
    const hospitalSelect = document.getElementById('hospitalSelect');
    const reportTypeCheckboxes = document.getElementById('reportTypeCheckboxes');
    const selectedReportsInput = document.getElementById('selectedReports');
    const bookingForm = document.getElementById('booking-form');
    
    // Modal Elements
    const modal = document.getElementById('successModal');
    const closeBtn = document.querySelector('.close-btn');
    const modalCloseBtn = document.getElementById('modalCloseBtn');
    
    // Recent Booking Card Elements
    const recentBookingCard = document.getElementById('recentBookingCard');

    // Initialize the app
    function init() {
        populateHospitals();
        populateReportTypes();
        loadRecentBooking();
        
        // Event Listeners
        bookingForm.addEventListener('submit', handleBookingSubmit);
        
        // Modal events
        closeBtn.addEventListener('click', closeModal);
        modalCloseBtn.addEventListener('click', closeModal);
        window.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
    }

    function populateHospitals() {
        hospitals.forEach(hosp => {
            const option = document.createElement('option');
            option.value = hosp.id;
            option.textContent = hosp.name;
            hospitalSelect.appendChild(option);
        });
    }

    function populateReportTypes() {
        reportTypes.forEach(report => {
            const label = document.createElement('label');
            label.className = 'checkbox-label';
            
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.value = report.id;
            checkbox.dataset.name = report.name;
            checkbox.dataset.price = report.price;
            checkbox.addEventListener('change', updateSelectedReports);
            
            label.appendChild(checkbox);
            label.appendChild(document.createTextNode(` ${report.name}`));
            reportTypeCheckboxes.appendChild(label);
        });
    }

    function updateSelectedReports() {
        const selected = Array.from(reportTypeCheckboxes.querySelectorAll('input:checked'))
                              .map(cb => cb.value);
        selectedReportsInput.value = selected.join(',');
    }

    function handleBookingSubmit(e) {
        e.preventDefault();
        
        const patientName = document.getElementById('patientName').value.trim();
        const patientId = document.getElementById('patientId').value.trim();
        const hospitalId = hospitalSelect.value;
        const selectedReportIds = selectedReportsInput.value;
        const reportReason = document.getElementById('reportReason').value.trim();
        
        if (!hospitalId) {
            alert('Please select a hospital.');
            return;
        }

        if (!selectedReportIds) {
            alert('Please select at least one report type.');
            return;
        }
        
        const selectedHospital = hospitals.find(h => h.id === hospitalId);
        
        // Map the IDs to names and prices for the payment gateway
        const selectedIdsArray = selectedReportIds.split(',');
        const selectedReportsData = reportTypes.filter(r => selectedIdsArray.includes(r.id));
        const reportNames = selectedReportsData.map(r => r.name).join(', ');
        const totalPrice = selectedReportsData.reduce((sum, r) => sum + r.price, 0);
        
        // Use a consistent fake 'request ID' mimicking the date
        const requestData = {
            id: Date.now().toString(),
            patientName: patientName,
            patientId: patientId,
            hospitalName: selectedHospital.name,
            reportName: reportNames, // display all names
            totalPrice: totalPrice, // save total price
            reportReason: reportReason,
            status: 'Submitted'
        };
        
        // Save to LocalStorage
        saveBooking(requestData);
        
        // Redirect to payment page
        window.location.href = 'payment.html';
    }

    function saveBooking(data) {
        // We only save the single latest booking for simplicity in this demo
        localStorage.setItem('vitacare_latest_booking', JSON.stringify(data));
    }

    function loadRecentBooking() {
        const savedData = localStorage.getItem('vitacare_latest_booking');
        if (savedData) {
            try {
                const data = JSON.parse(savedData);
                if (data.status === 'Paid') {
                    displayRecentBooking(data);
                }
            } catch (e) {
                console.error('Error parsing booking data', e);
            }
        }
    }

    function displayRecentBooking(data) {
        recentBookingCard.style.display = 'block';
        
        document.getElementById('dispName').textContent = data.patientName;
        document.getElementById('dispId').textContent = data.patientId;
        document.getElementById('dispHospital').textContent = data.hospitalName;
        document.getElementById('dispReport').textContent = data.reportName;
        document.getElementById('dispReason').textContent = data.reportReason;
    }

    function showModal(data) {
        document.getElementById('modalName').textContent = data.patientName;
        document.getElementById('modalId').textContent = data.patientId;
        document.getElementById('modalHospital').textContent = data.hospitalName;
        document.getElementById('modalReport').textContent = data.reportName;
        document.getElementById('modalReason').textContent = data.reportReason;
        
        modal.style.display = 'flex';
        // Add slight delay for animation
        setTimeout(() => {
            modal.classList.add('show');
        }, 10);
    }

    function closeModal() {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300); // match transition duration
    }

    // Run init
    init();
});
