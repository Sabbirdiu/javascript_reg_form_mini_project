function Registration(title, author, isbn , email) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
  this.email = email;
}
function UI() {}
UI.prototype.addRegList = function(reg){
  const list = document.getElementById('reg-list');
  const row = document.createElement('tr');
  row.innerHTML = `
    <td>${reg.title}</td>
    <td>${reg.author}</td>
    <td>${reg.isbn}</td>
    <td>${reg.email}</td>
    <td><a href="#" class="delete">X<a></td>
  `;

  list.appendChild(row);
}
UI.prototype.showAlert = function(message, className) {
  const div = document.createElement('div');
  div.className = `alert ${className}`;
  div.appendChild(document.createTextNode(message));
  const container = document.querySelector('.container');
  const form = document.querySelector('#form');
  container.insertBefore(div, form);
  setTimeout(function(){
    document.querySelector('.alert').remove();
  }, 3000);
}
UI.prototype.deleteBook = function(target){
  if(target.className === 'delete') {
    target.parentElement.parentElement.remove();
  }
}
UI.prototype.clearFields = function() {
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
  document.getElementById('isbn').value = '';
  document.getElementById('email').value = '';

}
document.getElementById('form').addEventListener('submit', function(e){
  const title = document.getElementById('title').value,
        author = document.getElementById('author').value,
        isbn = document.getElementById('isbn').value,
        email = document.getElementById('email').value
  const reg = new Registration(title, author, isbn , email);
  const ui = new UI();
  if(title === '' || author === '' || isbn === '' || email === '') {
    ui.showAlert('Please fill in all fields', 'error');
  } else {
    ui.addRegList(reg);
    ui.showAlert('Book Added!', 'success');
    ui.clearFields();
  }
  e.preventDefault();
});
document.getElementById('reg-list').addEventListener('click', function(e){
  const ui = new UI();
  ui.deleteBook(e.target);
  ui.showAlert('Book Removed!', 'success');
  e.preventDefault();
});
