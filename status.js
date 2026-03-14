document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('click', () => {
    alert('You clicked: ' + card.querySelector('h2').innerText);
    // Here you could open a modal with details
  });
});