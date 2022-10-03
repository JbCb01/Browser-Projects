document.querySelector('#show-arrow').onclick = (e) => {
  // change direction of animation
  let arrows = document.querySelector('#show-arrow').children;
  for (const element of arrows) {
    element.classList.toggle('arrowSliding');
    element.classList.toggle('arrowSliding-out');
    element.children[0].classList.toggle('arrow');
    element.children[0].classList.toggle('arrow-out');
  }
  // change width of menu
  let menu = document.querySelector('#sticky-menu');
  if(!menu.classList.length) menu.classList.add('menu-out');
  if(!menu.classList.replace('menu-out','menu-in')){
    menu.classList.replace('menu-in','menu-out');
  }   
}