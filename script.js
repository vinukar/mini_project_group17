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
        { id: 'h25', name: 'Chilaw District General Hospital' },
        { id: 'h26', name: 'Teaching Hospital - Ragama (North Colombo)' },
        { id: 'h27', name: 'General Hospital - Kalutara' },
        { id: 'h28', name: 'General Hospital - Matara' },
        { id: 'h29', name: 'General Hospital - Nuwara Eliya' },
        { id: 'h30', name: 'General Hospital - Kegalle' },
        { id: 'h31', name: 'General Hospital - Vavuniya' },
        { id: 'h32', name: 'General Hospital - Mannar' },
        { id: 'h33', name: 'General Hospital - Mullaitivu' },
        { id: 'h34', name: 'General Hospital - Kilinochchi' },
        { id: 'h35', name: 'General Hospital - Trincomalee' },
        { id: 'h36', name: 'District General Hospital - Moneragala' },
        { id: 'h37', name: 'Base Hospital - Panadura' },
        { id: 'h38', name: 'Base Hospital - Horana' },
        { id: 'h39', name: 'Base Hospital - Mulleriyawa' },
        { id: 'h40', name: 'Base Hospital - Avissawella' },
        { id: 'h41', name: 'Base Hospital - Point Pedro' },
        { id: 'h42', name: 'Base Hospital - Kayts' },
        { id: 'h43', name: 'Base Hospital - Nikaweratiya' },
        { id: 'h44', name: 'Base Hospital - Kuliyapitiya' },
        { id: 'h45', name: 'Base Hospital - Balapitiya' },
        { id: 'h46', name: 'Base Hospital - Tangalle' },
        { id: 'h47', name: 'Base Hospital - Embilipitiya' },
        { id: 'h48', name: 'Base Hospital - Karawanella' },
        { id: 'h49', name: 'Base Hospital - Mahiyanganaya' },
        { id: 'h50', name: 'Base Hospital - Welikanda' },
        { id: 'h51', name: 'General Hospital - Chilaw' },
        { id: 'h52', name: 'General Hospital - Matale' },
        { id: 'h33', name: 'General Hospital - Polonnaruwa' },
        { id: 'h54', name: 'General Hospital - Ampara' },
        { id: 'h55', name: 'General Hospital - Hambantota' },
        { id: 'h56', name: 'Base Hospital - Dikoya' },
        { id: 'h57', name: 'Base Hospital - Gampola' },
        { id: 'h58', name: 'Base Hospital - Kantale' },
        { id: 'h59', name: 'Base Hospital - Medirigiriya' },
        { id: 'h60', name: 'Base Hospital - Rikillagaskada' }
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

    const baseTimeSlots = [
        "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", 
        "11:00 AM", "11:30 AM", "01:00 PM", "01:30 PM", 
        "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM", "04:00 PM"
    ];

    // DOM Elements
    const occupationSelect = document.getElementById('occupationSelect');
    const hospitalSelect = document.getElementById('hospitalSelect');
    const hospitalSearch = document.getElementById('hospitalSearch');
    const reportTypeCheckboxes = document.getElementById('reportTypeCheckboxes');
    const selectedReportsInput = document.getElementById('selectedReports');
    const appointmentDate = document.getElementById('appointmentDate');
    const timeSlotsContainer = document.getElementById('timeSlots');
    const selectedTimeSlotInput = document.getElementById('selectedTimeSlot');
    const livePriceDisplay = document.getElementById('livePrice');
    const bookingForm = document.getElementById('booking-form');
    const patientIdInput = document.getElementById('patientId');
    const patientNameInput = document.getElementById('patientName');
    
    // Modal Elements
    const modal = document.getElementById('successModal');
    const closeBtn = document.querySelector('.close-btn');
    const modalCloseBtn = document.getElementById('modalCloseBtn');
    
    // Recent Booking Card Elements
    const recentBookingCard = document.getElementById('recentBookingCard');
    const hospitalSelectWrapper = document.getElementById('hospitalSelectWrapper');
    const hospitalDropdown = document.getElementById('hospitalDropdown');

    // Initialize the app
    function init() {
        if (hospitalSelect) populateHospitals();
        if (reportTypeCheckboxes) populateReportTypes();
        if (appointmentDate) setMinDate();
        loadRecentBooking();
        
        // Event Listeners
        if (patientIdInput) {
            patientIdInput.addEventListener('input', function() {
                this.value = this.value.toUpperCase().replace(/[^0-9VX]/g, '');
            });
        }
        if (patientNameInput) {
            patientNameInput.addEventListener('input', function() {
                this.value = this.value.replace(/[0-9]/g, '');
            });
        }

        // Searchable Select Logic
        if (hospitalSearch && hospitalSelectWrapper) {
            hospitalSearch.addEventListener('focus', () => {
                hospitalSelectWrapper.classList.add('active');
                populateHospitals(hospitalSearch.value);
            });

            hospitalSearch.addEventListener('input', (e) => {
                populateHospitals(e.target.value);
            });

            // Close dropdown when clicking outside
            document.addEventListener('click', (e) => {
                if (!hospitalSelectWrapper.contains(e.target)) {
                    hospitalSelectWrapper.classList.remove('active');
                }
            });
        }

        if (occupationSelect) occupationSelect.addEventListener('change', updateSelectedReports);
        if (hospitalSelect) hospitalSelect.addEventListener('change', generateTimeSlots);
        if (appointmentDate) appointmentDate.addEventListener('change', generateTimeSlots);
        if (bookingForm) bookingForm.addEventListener('submit', handleBookingSubmit);
        
        // Modal events
        if (closeBtn) closeBtn.addEventListener('click', closeModal);
        if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
        window.addEventListener('click', (e) => {
            if (modal && e.target === modal) closeModal();
        });
    }

    function populateHospitals(filter = '') {
        if (!hospitalDropdown || !hospitalSelect) return;
        
        const searchTerm = filter.toLowerCase();
        hospitalDropdown.innerHTML = '';
        
        const filtered = hospitals.filter(hosp => 
            hosp.name.toLowerCase().includes(searchTerm)
        );

        if (filtered.length === 0) {
            hospitalDropdown.innerHTML = '<div class="no-results">No hospitals found</div>';
            return;
        }

        filtered.forEach(hosp => {
            const div = document.createElement('div');
            div.className = 'dropdown-option';
            if (hosp.id === hospitalSelect.value) div.classList.add('selected');
            div.textContent = hosp.name;
            
            div.addEventListener('click', () => {
                hospitalSearch.value = hosp.name;
                hospitalSelect.value = hosp.id;
                
                // Trigger change event for time slots
                hospitalSelect.dispatchEvent(new Event('change'));
                
                hospitalSelectWrapper.classList.remove('active');
                
                // Update selected class
                document.querySelectorAll('.dropdown-option').forEach(opt => opt.classList.remove('selected'));
                div.classList.add('selected');
            });
            
            hospitalDropdown.appendChild(div);
        });

        // Also update standard select for compatibility (optional but good for form validation)
        const currentSelection = hospitalSelect.value;
        hospitalSelect.innerHTML = '<option value="" disabled selected>Choose a hospital...</option>';
        hospitals.forEach(hosp => {
            const option = document.createElement('option');
            option.value = hosp.id;
            option.textContent = hosp.name;
            if (hosp.id === currentSelection) option.selected = true;
            hospitalSelect.appendChild(option);
        });
    }

    function populateReportTypes() {
        if (!reportTypeCheckboxes) return;
        reportTypeCheckboxes.innerHTML = '';
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
        if (!reportTypeCheckboxes || !selectedReportsInput || !livePriceDisplay) return;

        const selected = Array.from(reportTypeCheckboxes.querySelectorAll('input:checked'))
                              .map(cb => cb.value);
        selectedReportsInput.value = selected.join(',');
        
        // Calculate live price
        let total = 0;
        const selectedReportsData = reportTypes.filter(r => selected.includes(r.id));
        total = selectedReportsData.reduce((sum, r) => sum + r.price, 0);
        
        // Apply discount
        const occupation = occupationSelect.value;
        if (occupation === 'university' || occupation === 'school') {
            total = total * 0.5; // 50% discount
        }
        
        livePriceDisplay.textContent = `LKR ${total.toFixed(2)}`;
        
        generateTimeSlots(); // Selected reports change the time slots available
    }

    // Set minimum date to today
    function setMinDate() {
        if (!appointmentDate) return;
        const today = new Date();
        const yyyy = today.getFullYear();
        let mm = today.getMonth() + 1; // Months start at 0
        let dd = today.getDate();

        if (dd < 10) dd = '0' + dd;
        if (mm < 10) mm = '0' + mm;

        const formattedToday = yyyy + '-' + mm + '-' + dd;
        appointmentDate.setAttribute('min', formattedToday);
    }

    // Generate time slots based on hospital, date and report selection
    function generateTimeSlots() {
        if (!hospitalSelect || !appointmentDate || !selectedReportsInput || !timeSlotsContainer) return;

        const hospitalId = hospitalSelect.value;
        const date = appointmentDate.value;
        const reports = selectedReportsInput.value;
        
        if (selectedTimeSlotInput) selectedTimeSlotInput.value = ''; // Reset selection

        if (!hospitalId || !date || !reports) {
            timeSlotsContainer.innerHTML = '<p class="placeholder-text">Please select a hospital, date, and at least one report first.</p>';
            return;
        }

        timeSlotsContainer.innerHTML = ''; // Clear container
        
        // Simple mock: disable some random slots based on string hash of hospital, date, and reports to make it look realistic but deterministic
        const seed = hospitalId + date + reports;
        let hash = 0;
        for (let i = 0; i < seed.length; i++) {
            hash = ((hash << 5) - hash) + seed.charCodeAt(i);
            hash |= 0;
        }

        baseTimeSlots.forEach((slot, index) => {
            const slotElement = document.createElement('div');
            slotElement.className = 'time-slot';
            slotElement.textContent = slot;
            
            // Randomly make some slots unavailable (mock logic)
            // Use bitwise logic with hash to ensure consistent "unavailable" slots across re-renders
            const isUnavailable = (Math.abs(hash * (index + 1)) % 10) > 6; 
            
            if (isUnavailable) {
                slotElement.classList.add('unavailable');
            } else {
                slotElement.addEventListener('click', () => selectTimeSlot(slotElement, slot));
            }
            
            timeSlotsContainer.appendChild(slotElement);
        });
    }

    function selectTimeSlot(element, time) {
        // Remove 'selected' from all
        const allSlots = document.querySelectorAll('.time-slot');
        allSlots.forEach(slot => slot.classList.remove('selected'));
        
        // Add to clicked
        element.classList.add('selected');
        
        // Update hidden input
        if (selectedTimeSlotInput) selectedTimeSlotInput.value = time;
    }

    function handleBookingSubmit(e) {
        e.preventDefault();
        
        const patientName = document.getElementById('patientName').value.trim();
        const patientId = document.getElementById('patientId').value.trim();
        const hospitalId = hospitalSelect.value;
        const selectedReportIds = selectedReportsInput.value;
        const reportReason = document.getElementById('reportReason').value.trim();
        const date = appointmentDate.value;
        const time = selectedTimeSlotInput.value;
        
        if (!hospitalId) {
            alert('Please select a hospital.');
            return;
        }

        if (!selectedReportIds) {
            alert('Please select at least one report type.');
            return;
        }
        
        if (!time) {
            alert('Please select an available time slot.');
            return;
        }
        
        const selectedHospital = hospitals.find(h => h.id === hospitalId);
        
        // Map the IDs to names and prices for the payment gateway
        const selectedIdsArray = selectedReportIds.split(',');
        const selectedReportsData = reportTypes.filter(r => selectedIdsArray.includes(r.id));
        const reportNames = selectedReportsData.map(r => r.name).join(', ');
        
        let totalPrice = selectedReportsData.reduce((sum, r) => sum + r.price, 0);
        const occupation = occupationSelect.value;
        const isStudent = (occupation === 'university' || occupation === 'school');
        
        if (isStudent) {
            totalPrice = totalPrice * 0.5;
        }
        
        // Generate a 4-digit token
        const tokenNumber = Math.floor(1000 + Math.random() * 9000);

        // Use a consistent fake 'request ID' mimicking the date
        const requestData = {
            id: Date.now().toString(),
            token: tokenNumber,
            patientName: patientName,
            patientId: patientId,
            hospitalName: selectedHospital.name,
            reportName: reportNames, // display all names
            totalPrice: totalPrice, // save total price
            date: date,
            time: time,
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
        if (!recentBookingCard) return;
        recentBookingCard.style.display = 'block';
        
        if (document.getElementById('dispName')) document.getElementById('dispName').textContent = data.patientName;
        if (document.getElementById('dispToken')) document.getElementById('dispToken').textContent = data.token;
        if (document.getElementById('dispId')) document.getElementById('dispId').textContent = data.patientId;
        if (document.getElementById('dispHospital')) document.getElementById('dispHospital').textContent = data.hospitalName;
        if (document.getElementById('dispReport')) document.getElementById('dispReport').textContent = data.reportName;
        
        // Format date nicely
        const parts = data.date.split('-');
        const fixedDateObj = new Date(parts[0], parts[1] - 1, parts[2]);

        const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
        if (document.getElementById('dispDate')) document.getElementById('dispDate').textContent = fixedDateObj.toLocaleDateString('en-US', options);
        if (document.getElementById('dispTime')) document.getElementById('dispTime').textContent = data.time;
        
        if (document.getElementById('dispReason')) document.getElementById('dispReason').textContent = data.reportReason;
    }

    function showModal(data) {
        if (!modal) return;
        if (document.getElementById('modalToken')) document.getElementById('modalToken').textContent = data.token;
        if (document.getElementById('modalName')) document.getElementById('modalName').textContent = data.patientName;
        if (document.getElementById('modalId')) document.getElementById('modalId').textContent = data.patientId;
        if (document.getElementById('modalHospital')) document.getElementById('modalHospital').textContent = data.hospitalName;
        if (document.getElementById('modalReport')) document.getElementById('modalReport').textContent = data.reportName;
        
        // Format date nicely
        const parts = data.date.split('-');
        const fixedDateObj = new Date(parts[0], parts[1] - 1, parts[2]);

        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        if (document.getElementById('modalDate')) document.getElementById('modalDate').textContent = fixedDateObj.toLocaleDateString('en-US', options);
        if (document.getElementById('modalTime')) document.getElementById('modalTime').textContent = data.time;
        
        if (document.getElementById('modalReason')) document.getElementById('modalReason').textContent = data.reportReason;
        
        modal.style.display = 'flex';
        // Add slight delay for animation
        setTimeout(() => {
            modal.classList.add('show');
        }, 10);
    }

    function closeModal() {
        if (!modal) return;
        modal.classList.remove('show');
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300); // match transition duration
    }

    // Run init
    init();
});
