import './styles.css';
import dishes from './menu.json';
import foodCardTpl from './templates/food-cards.hbs';

const refs = {
   bodyEl: document.querySelector('body'),
   themeSwitcher: document.querySelector('#theme-switch-toggle'),
   menuEl: document.querySelector('.js-menu')
}

const Theme = {
  LIGHT: 'light-theme',
  DARK: 'dark-theme',
};

const STORAGE_KEY = 'theme'

function createDishesMarkup(dishes) {
    return dishes.map(foodCardTpl).join('');
};

refs.menuEl.insertAdjacentHTML('beforeend', createDishesMarkup(dishes));

refs.themeSwitcher.addEventListener('change', switchTheme);

function switchTheme(e) {
  if (e.target.checked) {
    changeTheme(Theme.LIGHT, Theme.DARK)
  } else {
    changeTheme(Theme.DARK, Theme.LIGHT)
  }
}

function changeTheme(oldTheme, newTheme) {
  refs.bodyEl.classList.remove(oldTheme)
  refs.bodyEl.classList.add(newTheme)
  localStorage.setItem(STORAGE_KEY, newTheme)
}

const savedTheme = localStorage.getItem(STORAGE_KEY)

refs.themeSwitcher.checked = savedTheme === Theme.DARK

if (savedTheme) {
  refs.bodyEl.classList.add(savedTheme)
} else {
  refs.bodyEl.classList.add(Theme.LIGHT)
}
