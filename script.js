document.addEventListener('DOMContentLoaded', () => {
    // Mock Data
    const doctors = [
        { id: 1, name: "Dr. Sarah Jenkins", specialty: "Cardiology" },
        { id: 2, name: "Dr. Michael Chen", specialty: "Dermatology" },
        { id: 3, name: "Dr. Emily Stone", specialty: "Pediatrics" },
        { id: 4, name: "Dr. James Wilson", specialty: "General Practice" },
        { id: 5, name: "Dr. Olivia Bennett", specialty: "Neurology" }
    ];

    const baseTimeSlots = [
        "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", 
        "11:00 AM", "11:30 AM", "01:00 PM", "01:30 PM", 
        "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM", "04:00 PM"
    ];

    // DOM Elements
    const doctorSelect = document.getElementById('doctorSelect');
    const appointmentDate = document.getElementById('appointmentDate');
    const timeSlotsContainer = document.getElementById('timeSlots');
    const selectedTimeSlotInput = document.getElementById('selectedTimeSlot');
    const bookingForm = document.getElementById('booking-form');
    
    // Modal Elements
    const modal = document.getElementById('successModal');
    const closeBtn = document.querySelector('.close-btn');
    const modalCloseBtn = document.getElementById('modalCloseBtn');
    
    // Recent Booking Card Elements
    const recentBookingCard = document.getElementById('recentBookingCard');

    // Initialize the app
    function init() {
        populateDoctors();
        setMinDate();
        loadRecentBooking();
        
        // Event Listeners
        doctorSelect.addEventListener('change', generateTimeSlots);
        appointmentDate.addEventListener('change', generateTimeSlots);
        bookingForm.addEventListener('submit', handleBookingSubmit);
        
        // Modal events
        closeBtn.addEventListener('click', closeModal);
        modalCloseBtn.addEventListener('click', closeModal);
        window.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
    }

    // Populate the dropdown
    function populateDoctors() {
        doctors.forEach(doc => {
            const option = document.createElement('option');
            option.value = doc.id;
            option.textContent = `${doc.name} - ${doc.specialty}`;
            doctorSelect.appendChild(option);
        });
    }

    // Set minimum date to today
    function setMinDate() {
        const today = new Date();
        const yyyy = today.getFullYear();
        let mm = today.getMonth() + 1; // Months start at 0
        let dd = today.getDate();

        if (dd < 10) dd = '0' + dd;
        if (mm < 10) mm = '0' + mm;

        const formattedToday = yyyy + '-' + mm + '-' + dd;
        appointmentDate.setAttribute('min', formattedToday);
    }

    // Generate time slots based on doctor and date selection
    function generateTimeSlots() {
        const doctorId = doctorSelect.value;
        const date = appointmentDate.value;
        
        selectedTimeSlotInput.value = ''; // Reset selection

        if (!doctorId || !date) {
            timeSlotsContainer.innerHTML = '<p class="placeholder-text">Please select a doctor and date first.</p>';
            return;
        }

        timeSlotsContainer.innerHTML = ''; // Clear container
        
        // Simple mock: disable some random slots based on string hash to make it look realistic but deterministic
        const seed = doctorId + date;
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
            // Use bitwise logic with hash to ensure consistent "unavailable" slots across re-renders for same day/doc
            const isUnavailable = (Math.abs(hash * (index + 1)) % 10) > 7; 
            
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
        selectedTimeSlotInput.value = time;
    }

    function handleBookingSubmit(e) {
        e.preventDefault();
        
        const patientName = document.getElementById('patientName').value.trim();
        const doctorId = doctorSelect.value;
        const date = appointmentDate.value;
        const time = selectedTimeSlotInput.value;
        
        if (!time) {
            alert('Please select an available time slot.');
            return;
        }
        
        const selectedDoctor = doctors.find(d => d.id == doctorId);
        
        const appointmentData = {
            id: Date.now().toString(),
            patientName: patientName,
            doctorName: selectedDoctor.name,
            specialty: selectedDoctor.specialty,
            date: date,
            time: time,
            status: 'Confirmed'
        };
        
        // Save to LocalStorage
        saveBooking(appointmentData);
        
        // Update Recent Booking UI
        displayRecentBooking(appointmentData);
        
        // Show Modal
        showModal(appointmentData);
        
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
        document.getElementById('dispDoctor').textContent = data.doctorName;
        
        // Format date nicely
        const dateObj = new Date(data.date);
        // adjust for timezone issues by splitting date
        const parts = data.date.split('-');
        const fixedDateObj = new Date(parts[0], parts[1] - 1, parts[2]);

        const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
        document.getElementById('dispDate').textContent = fixedDateObj.toLocaleDateString('en-US', options);
        
        document.getElementById('dispTime').textContent = data.time;
    }

    function showModal(data) {
        document.getElementById('modalName').textContent = data.patientName;
        document.getElementById('modalDoctor').textContent = data.doctorName;
        
        // Format date nicely
        const parts = data.date.split('-');
        const fixedDateObj = new Date(parts[0], parts[1] - 1, parts[2]);

        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        document.getElementById('modalDate').textContent = fixedDateObj.toLocaleDateString('en-US', options);
        
        document.getElementById('modalTime').textContent = data.time;
        
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
