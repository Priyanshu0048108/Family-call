document.getElementById('addBtn').addEventListener('click', addContact);

function addContact() {
  const name = document.getElementById('name').value.trim();
  const relation = document.getElementById('relation').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const time = document.getElementById('time').value;

  if (name && relation && phone && time) {
    const list = document.getElementById('contactList');

    const div = document.createElement('div');
    div.className = 'card';
    div.innerHTML = `
      <strong>${name} (${relation})</strong><br/>
      📞 ${phone}<br/>
      🕒 ${time}
    `;
    list.appendChild(div);

    saveToLocal({ name, relation, phone, time });
    clearInputs();
  }
}

function clearInputs() {
  document.getElementById('name').value = '';
  document.getElementById('relation').value = '';
  document.getElementById('phone').value = '';
  document.getElementById('time').value = '';
}

// LocalStorage persistence
function saveToLocal(contact) {
  const data = JSON.parse(localStorage.getItem('contacts') || '[]');
  data.push(contact);
  localStorage.setItem('contacts', JSON.stringify(data));
}

function loadFromLocal() {
  const data = JSON.parse(localStorage.getItem('contacts') || '[]');
  data.forEach(c => {
    const list = document.getElementById('contactList');
    const div = document.createElement('div');
    div.className = 'card';
    div.innerHTML = `
      <strong>${c.name} (${c.relation})</strong><br/>
      📞 ${c.phone}<br/>
      🕒 ${c.time}
    `;
    list.appendChild(div);
  });
}

// Load saved contacts on page load
loadFromLocal();
