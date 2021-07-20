
 


// ---------- EVENT LISTENERS ----------

// toggle burger
document.querySelector('#btn-x').addEventListener('click', () => {
  document.querySelector('.mobile-nav').classList.remove('open');
  document.querySelector('.nav').classList.remove('open');
})

document.querySelector('#btn-burger').addEventListener('click', () => {
  document.querySelector('.mobile-nav').classList.add('open');
  document.querySelector('.nav').classList.add('open');
})



 