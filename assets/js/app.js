// Nav toggle on mobile

const navToggle = document.getElementById('navToggle');
const body = document.body;
const nav = document.getElementById('nav');

navToggle.addEventListener('click', function (event) {
    event.preventDefault();

    body.classList.toggle('show-nav');
    this.classList.toggle('active');
    nav.classList.toggle('show');
});

window.addEventListener('resize', function () {
    body.classList.remove('show-nav');
    navToggle.classList.remove('active');
    nav.classList.remove('show');
});

// Header class on scroll

const intro = document.getElementById('intro');
const header = document.getElementById('header');
let introHeight = intro.offsetHeight;
let headerHeight = header.offsetHeight;
let scrollY = window.scrollY;

headerScroll();

window.addEventListener('scroll', function () {
    headerScroll();
});

window.addEventListener('resize', function () {
    headerScroll();
});

function headerScroll() {
    introHeight = intro.offsetHeight;
    headerHeight = header.offsetHeight;

    const scrollY = this.scrollY;

    if (scrollY >= introHeight - headerHeight) {
        header.classList.add('header--dark');
    } else {
        header.classList.remove('header--dark');
    }
}

// Smooth scroll to sections

document.querySelectorAll('[data-scroll]').forEach(item => {
    item.addEventListener('click', function (event) {
        event.preventDefault();

        const scrollElementId = this.dataset.scroll;
        const scrollElement = document.getElementById(scrollElementId);

        body.classList.remove('show-nav');
        navToggle.classList.remove('active');
        nav.classList.remove('show');

        scrollElement.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
        });
    });
});

// Scrollspy

const windowHeight = window.innerHeight;

scrollspy(scrollY);

window.addEventListener('scroll', function () {
    scrollY = this.scrollY;
    scrollspy(scrollY);
});

function scrollspy(scrollY) {
    document.querySelectorAll('[data-scrollspy]').forEach(item => {
        const sectionId = item.dataset.scrollspy;

        let sectionOffset = item.offsetTop;
        sectionOffset = sectionOffset - windowHeight * 0.33333;

        if (scrollY >= sectionOffset) {
            document.querySelectorAll('#nav [data-scroll]').forEach(item => {
                item.classList.remove('active');
            });
            document
                .querySelectorAll(`#nav [data-scroll="${sectionId}"]`)
                .forEach(item => {
                    item.classList.add('active');
                });
        }

        if (scrollY === 0) {
            document.querySelectorAll('#nav [data-scroll]').forEach(item => {
                item.classList.remove('active');
            });
        }
    });
}

// Modal

const modalBtn = document.querySelectorAll('[data-modal]');
const modalClose = document.querySelectorAll('.modal__close');
const modal = document.querySelectorAll('.modal');

modalBtn.forEach(item => {
    item.addEventListener('click', function (event) {
        const $this = event.currentTarget;
        const modalId = $this.getAttribute('data-modal');
        const modal = document.getElementById(modalId);
        const modalContent = modal.querySelector('.modal__content');

        modalContent.addEventListener('click', function (event) {
            event.stopPropagation();
        });

        modal.classList.add('show');
        body.classList.add('no-scroll');

        setTimeout(function () {
            modalContent.style.transform = 'none';
            modalContent.style.opacity = '1';
        }, 1);
    });
});

modalClose.forEach(item => {
    item.addEventListener('click', function (event) {
        const currentModal = event.currentTarget.closest('.modal');
        closeModal(currentModal);
    });
});

modal.forEach(item => {
    item.addEventListener('click', function (event) {
        const currentModal = event.currentTarget;
        closeModal(currentModal);
    });
});

function closeModal(currentModal) {
    const modalContent = currentModal.querySelector('.modal__content');
    modalContent.removeAttribute('style');

    setTimeout(function () {
        currentModal.classList.remove('show');
        body.classList.remove('no-scroll');
    }, 200);
}
