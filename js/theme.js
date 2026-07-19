const toggleBtn = document.getElementById('theme-toggle');
const body = document.body;

const savedTheme = localStorage.getItem('theme');

if (savedTheme) {
  body.classList.add(savedTheme);
} else {
  // Default is dark, so no class needed or add dark explicitly
  // body.classList.add('dark');
}

updateToggleIcon();

toggleBtn.addEventListener('click', () => {
  if (body.classList.contains('light')) {
    body.classList.remove('light');
    localStorage.setItem('theme', 'dark');
  } else {
    body.classList.add('light');
    localStorage.setItem('theme', 'light');
  }
  updateToggleIcon();
});

function updateToggleIcon() {
  if (body.classList.contains('light')) {
    toggleBtn.textContent = '☀️';
  } else {
    toggleBtn.textContent = '🌙';
  }
}
