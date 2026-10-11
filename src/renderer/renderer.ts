import './styles.css';

const navButtons = document.querySelectorAll<HTMLButtonElement>('.nav-btn');
const views = document.querySelectorAll<HTMLElement>('.view');

navButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
        const target = btn.dataset.view!;
        navButtons.forEach((b) => b.classList.toggle('active', b === btn));
        views.forEach((v) => v.classList.toggle('active', v.id === `view-${target}`));
    });
});