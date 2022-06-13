document.getElementById('container');
document.querySelector('#container');
document.querySelectorAll('.second');
document.querySelector('ol .third');
document.querySelector('#container').innerText = 'Hello!';
document.querySelector('div.footer').classList.add('main');
document.querySelector('div.footer').classList.remove('main');
const fourthLi = document.createElement('li');
fourthLi.innerText = "four";
document.querySelector('ul').append(fourthLi);
for (let li of document.querySelectorAll('ol li')) {
  li.style.backgroundColor = 'green';
}
document.querySelector('div.footer').remove();
