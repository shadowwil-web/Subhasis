// File: /genbridge-website/genbridge-website/public/js/main.js

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    document.querySelector('.mobile-menu-btn').addEventListener('click', function() {
        document.getElementById('navLinks').classList.toggle('active');
    });

    // Modal handling
    function openModal(type = 'apply', plan = '') {
        const modalBackdrop = document.getElementById('modalBackdrop');
        const title = document.getElementById('modalTitle');
        const sub = document.getElementById('modalSub');
        const planInput = document.getElementById('selectedPlan');
        
        modalBackdrop.style.display = 'flex';
        modalBackdrop.setAttribute('aria-hidden', 'false');
        title.textContent = type === 'find' ? 'Request a Mentor' : 'Apply / Choose Plan';
        sub.textContent = type === 'find' ? 'We will match you with the best Gen Z mentor based on your topic.' : 'Fill details to apply or enroll.';
        planInput.value = plan || '';
        document.getElementById('name').focus();
    }

    function closeModal() {
        const modalBackdrop = document.getElementById('modalBackdrop');
        modalBackdrop.style.display = 'none';
        modalBackdrop.setAttribute('aria-hidden', 'true');
        document.getElementById('applyForm').reset();
    }

    // Form submission handling
    document.getElementById('applyForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const form = e.target;
        const payload = {
            name: form.name.value.trim(),
            email: form.email.value.trim(),
            phone: form.phone.value.trim(),
            course: form.course.value,
            plan: form.plan.value || form.plan.value === '' ? form.plan.value : document.getElementById('selectedPlan').value,
            billing: form.billing.value || 'monthly',
            addons: Array.from(form.querySelectorAll('input[name="addons"]:checked')).map(n => n.value)
        };

        // Basic validation
        if (!payload.name || !payload.email || !payload.phone || !payload.course) {
            alert('Please complete required fields');
            return false;
        }
        console.log('Application payload', payload);

        // Simulate submission
        closeModal();
        showToast('Application submitted — we will contact you via email.');
        return false;
    });

    function showToast(text = 'Saved') {
        const toast = document.getElementById('toast');
        toast.textContent = text;
        toast.style.display = 'block';
        setTimeout(() => toast.style.opacity = 1, 10);
        setTimeout(() => {
            toast.style.opacity = 0;
            setTimeout(() => toast.style.display = 'none', 300);
        }, 3000);
    }

    // Simple option selection for demo
    document.querySelectorAll('#step1 .option-card').forEach(card => {
        card.addEventListener('click', function() {
            document.querySelectorAll('#step1 .option-card').forEach(c => c.classList.remove('selected'));
            this.classList.add('selected');
            openModal('find');
            setTimeout(() => { document.getElementById('course').value = this.textContent; }, 120);
        });
    });

    // Accessibility: close modal on ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal();
        }
    });

    // Close modal when clicking backdrop
    document.getElementById('modalBackdrop').addEventListener('click', function(e) {
        if (e.target === this) closeModal();
    });
});