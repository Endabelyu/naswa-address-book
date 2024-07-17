const formElement = document.getElementById('contact-form');
const inputSearch = document.getElementById('search-input');
let selectedLabels = [];
if (getSearchData) {
  deleteStorageData('searchData');
}
console.log(inputSearch);
const localContactData = getDataStorage();
const pathname = window.location.pathname;
const search = window.location.search;
const url = new URLSearchParams(search);
const today = new Date().toISOString().substring(0, 10);
const defaultContacts = [
  {
    id: 1,
    firstName: 'John',
    middleName: 'Michael',
    lastName: 'Doe',
    company: 'Acme Corp',
    jobTitle: 'Engineer',
    email: 'john.doe@example.com',
    phone: '123-456-7890',
    streetAddress: '123 Main St',
    streetAddress2: 'Apt 4B',
    city: 'Metropolis',
    province: 'CA',
    postalCode: '12345',
    label: [1, 2],
    notes: 'Met at conference.',
    deletedAt: null,
    createdAt: today,
  },
  {
    id: 2,
    firstName: 'Jane',
    middleName: 'Marie',
    lastName: 'Smith',
    company: 'Globex Inc',
    jobTitle: 'Manager',
    email: 'jane.smith@example.com',
    phone: '987-654-3210',
    streetAddress: '456 Elm St',
    streetAddress2: 'Suite 500',
    city: 'Smallville',
    province: 'TX',
    postalCode: '67890',
    label: [2],
    notes: 'Works in marketing.',
    deletedAt: null,
    createdAt: today,
  },
];

const defaultLabel = [
  { id: 1, value: 'Home' },
  { id: 2, value: 'Work' },
];
if (pathname.includes('contact')) {
  if (pathname.includes('create-contact')) {
    selectedLabels = [];
  }
  selectCheckbox();
}
function getLabelValue(id) {
  const label = defaultLabel.find((item) => item.id === id);
  return label ? label.value : '';
}
if (!localContactData) {
  addDataStorage('contactData', defaultContacts);
  addDataLabel(defaultLabel);
}

function selectCheckbox() {
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  console.log(checkboxes, 'boxes');
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener('change', function () {
      if (this.checked) {
        selectedLabels.push(Number(this.value)); // Add value to array when checked
      } else {
        const index = selectedLabels.indexOf(Number(this.value));
        if (index !== -1) {
          selectedLabels.splice(index, 1); // Remove value from array when unchecked
        }
      }

      console.log(selectedLabels); // Log the array (you can replace this with your logic to use the array)
    });
  });
}
function addNewContact(event) {
  event.preventDefault();

  const formContactData = new FormData(formElement);
  const newId = localContactData.length ? localContactData.length + 1 : 1;
  const newContact = {
    id: newId,
    firstName: formContactData.get('firstName'),
    middleName: formContactData.get('middleName'),
    lastName: formContactData.get('lastName'),
    company: formContactData.get('company'),
    jobTitle: formContactData.get('jobTitle'),
    email: formContactData.get('email'),
    phone: formContactData.get('phone'),
    streetAddress: formContactData.get('streetAddress'),
    streetAddress2: formContactData.get('streetAddress2'),
    city: formContactData.get('city'),
    province: formContactData.get('province'),
    postalCode: formContactData.get('postalCode'),
    // label: formContactData.get('label'),
    label: selectedLabels,
    notes: formContactData.get('notes'),
    deletedAt: null,
    createdAt: today,
  };
  const updateDataContact = [...localContactData, newContact];
  addDataStorage('contactData', updateDataContact);
  formElement.reset();
  window.location.replace(window.location.origin);
}

console.log(formElement, 'form');
if (formElement) {
  const inputs = formElement.querySelectorAll(
    'input[type="text"],input[type="email"], textarea',
  );
  console.log(inputs);
  // this event listener to make style when value inside input or text area empty or deleted
  inputs.forEach((input) => {
    const labelId = input.id + 'Label';
    const label = document.getElementById(labelId);
    if (input.value) {
      label.classList.remove('top-4', 'text-gray-400', 'left-3');
      label.classList.add('-top-4', 'text-sm', 'text-slate-500');
    }
    // console.log(input.value, 'values');
    // const labelId = input.id + 'Label';
    // const label = document.getElementById(labelId);
    input.addEventListener('blur', function () {
      if (input.value) {
        label.classList.remove('top-4', 'text-gray-400', 'left-3');
        label.classList.add('-top-4', 'text-sm', 'text-slate-500');
      } else {
        label.classList.add('top-4', 'text-gray-400', 'left-3');
      }
    });
  });
  // this event listener to make style when value inside input or text area empty or deleted

  formElement.addEventListener('submit', addNewContact);
}

function searchContact() {
  const localContactData = getDataStorage();
  const searchValue = inputSearch.value.toLowerCase();

  if (searchValue) {
    console.log(searchValue.length, 'leng');
    const searchData = localContactData.filter((contact) => {
      return (
        contact.firstName.toLowerCase().includes(searchValue) ||
        contact.middleName.toLowerCase().includes(searchValue) ||
        contact.lastName.toLowerCase().includes(searchValue) ||
        contact.phone.toLowerCase().includes(searchValue)
      );
    });

    addDataStorage('searchData', searchData);
    renderTable();
  } else {
    console.log('deletesearch');
    deleteStorageData('searchData');
    renderTable();
  }
}
if (!pathname.includes('contact')) {
  inputSearch.addEventListener('input', searchContact);
}

if (!search.includes('id') && !pathname.includes('create')) {
  window.addEventListener('DOMContentLoaded', renderTable);
} else if (search.includes('id')) {
  window.addEventListener('DOMContentLoaded', renderEditForm);
  window.addEventListener('DOMContentLoaded', selectCheckbox);
  window.addEventListener('DOMContentLoaded', checkCheckboxes(selectCheckbox));
} else if (pathname.includes('contact')) {
  window.addEventListener('DOMContentLoaded', renderCountSideBar);
}
window.addEventListener('DOMContentLoaded', adjustURL);

// first task

// contact.forEach((contact) => {
//   console.log(
//     `${contact['Full Name']} ${contact['Phone']}) ${contact['Email']}`,
//   );
// });
