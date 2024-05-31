'use strict';

// Function to toggle element class
const toggleElementClass = (elem, className) =>
    elem.classList.toggle(className);

const sidebar = document.querySelector('[data-sidebar]');
const sidebarBtn = document.querySelector('[data-sidebar-btn]');
const select = document.querySelector('[data-select]');
const selectItems = document.querySelectorAll('[data-select-item]');
const selectValue = document.querySelector('[data-select-value]');
const filterBtn = document.querySelectorAll('[data-filter-btn]');
const form = document.querySelector('[data-form]');
const formInputs = document.querySelectorAll('[data-form-input]');
const formBtn = document.querySelector('[data-form-btn]');
const navigationLinks = document.querySelectorAll('[data-nav-link]');
const pages = document.querySelectorAll('[data-page]');

// Initialize filterItems
const filterItems = document.querySelectorAll('[data-filter-item]');

// Function to filter items based on selected value
const filterFunc = (selectedValue) => {
    filterItems.forEach((item) => {
        const category = item.dataset.category;
        const isActive = selectedValue === 'all' || selectedValue === category;
        item.classList.toggle('active', isActive);
    });
};

// Event listeners
sidebarBtn.addEventListener('click', () =>
    toggleElementClass(sidebar, 'active')
);

select.addEventListener('click', () => toggleElementClass(select, 'active'));

selectItems.forEach((item) => {
    item.addEventListener('click', () => {
        const selectedValue = item.innerText.toLowerCase();
        selectValue.innerText = item.innerText;
        toggleElementClass(select, 'active');
        filterFunc(selectedValue);
    });
});

filterBtn.forEach((btn) => {
    btn.addEventListener('click', () => {
        const selectedValue = btn.innerText.toLowerCase();
        selectValue.innerText = btn.innerText;
        filterFunc(selectedValue);
        filterBtn.forEach((button) =>
            button.classList.toggle('active', button === btn)
        );
    });
});

formInputs.forEach((input) => {
    input.addEventListener('input', () => {
        formBtn.disabled = !form.checkValidity();
    });
});

navigationLinks.forEach((link, index) => {
    link.addEventListener('click', () => {
        const clickedLinkText = link.innerHTML.toLowerCase();
        pages.forEach((page, pageIndex) => {
            const pageName = page.dataset.page;
            const isActive = pageName === clickedLinkText;
            page.classList.toggle('active', isActive);
            navigationLinks[pageIndex].classList.toggle('active', isActive);
        });
        window.scrollTo(0, 0);
    });
});

const inputForm = document.querySelector('form');
const fullname = document.getElementById('fullname');
const email = document.getElementById('email');
const message = document.getElementById('message');

const sendEmail = function () {
    const bodyMessage = `Fullname: ${fullname.value} <br> Email: ${email.value} <br> Message: ${message.value}`;

    Email.send({
        Host: 'smtp.elasticemail.com',
        Username: 'mojsoski93@gmail.com',
        Password: '57EFE8188FA3A0CCB3CC58698D467960CEEA',
        To: 'mojsoski93@gmail.com',
        From: 'mojsoski93@gmail.com',
        Subject: 'Portfolio Contact Form',
        Body: bodyMessage,
    }).then((message) => {
        if (message === 'OK') {
            Swal.fire({
                color: '#fff',
                background: '#383838',
                showConfirmButton: false,
                timer: 1500,
                title: 'Success!',
                text: 'Message sent successfully!',
                icon: 'success',
            });
            inputForm.reset();
        }
    });
};

form.addEventListener('submit', (e) => {
    e.preventDefault();
    sendEmail();
});
