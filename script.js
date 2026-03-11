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
        { id: 'r1', name: 'Full Blood Count (FBC)' },
        { id: 'r2', name: 'Lipid Profile' },
        { id: 'r3', name: 'Liver Function Test (LFT)' },
        { id: 'r4', name: 'Thyroid Function Test' },
        { id: 'r5', name: 'X-Ray (Chest)' },
        { id: 'r6', name: 'MRI Scan' },
        { id: 'r7', name: 'CT Scan' },
        { id: 'r8', name: 'Urine Analysis' }
    ];

    // DOM Elements
    const hospitalSelect = document.getElementById('hospitalSelect');
    const reportTypeSelect = document.getElementById('reportTypeSelect');
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
            const option = document.createElement('option');
            option.value = report.id;
            option.textContent = report.name;
            reportTypeSelect.appendChild(option);
        });
    }

    function handleBookingSubmit(e) {
        e.preventDefault();
        
        const patientName = document.getElementById('patientName').value.trim();
        const patientId = document.getElementById('patientId').value.trim();
        const hospitalId = hospitalSelect.value;
        const reportTypeId = reportTypeSelect.value;
        const reportReason = document.getElementById('reportReason').value.trim();
        
        if (!hospitalId) {
            alert('Please select a hospital.');
            return;
        }

        if (!reportTypeId) {
            alert('Please select a report type.');
            return;
        }
        
        const selectedHospital = hospitals.find(h => h.id === hospitalId);
        const selectedReport = reportTypes.find(r => r.id === reportTypeId);
        
        // Use a consistent fake 'request ID' mimicking the date
        const requestData = {
            id: Date.now().toString(),
            patientName: patientName,
            patientId: patientId,
            hospitalName: selectedHospital.name,
            reportName: selectedReport.name,
            reportReason: reportReason,
            status: 'Submitted'
        };
        
        // Save to LocalStorage
        saveBooking(requestData);
        
        // Update Recent Booking UI
        displayRecentBooking(requestData);
        
        // Show Modal
        showModal(requestData);
        
        // Reset Form
        bookingForm.reset();
        timeSlotsContainer.innerHTML = '<p class="placeholder-text">Please select a doctor and date first.</p>';
        selectedTimeSlotInput.value = '';
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
                // Simple validation to ensure it's slightly recent (optional)
                displayRecentBooking(data);
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
