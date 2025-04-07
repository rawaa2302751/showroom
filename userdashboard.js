// Tab Switching Logic
document.addEventListener("DOMContentLoaded", () => {
    const menuItems = document.querySelectorAll('.nav-menu li');
    const sections = document.querySelectorAll('.dashboard-section');

    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            // Remove active from all
            menuItems.forEach(i => i.classList.remove('active'));
            sections.forEach(section => section.classList.remove('active'));

            // Set active on selected
            item.classList.add('active');
            const target = item.getAttribute('data-tab');
            if (target) {
                const targetSection = document.getElementById(target);
                if (targetSection) {
                    targetSection.classList.add('active');
                }
            }
        });
    });
});

// Toggle Edit Mode for Profile Section
function toggleEditMode() {
    const inputs = document.querySelectorAll('#profile-section input, #profile-section select');
    inputs.forEach(input => {
        input.disabled = !input.disabled;
    });
}
