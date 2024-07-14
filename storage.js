function getDataStorage() {
  const data = JSON.parse(localStorage.getItem('contactData'));
  return data;
}
function getDataLabel() {
  const data = JSON.parse(localStorage.getItem('labelContact'));
  return data;
}
function getSearchData() {
  const data = JSON.parse(localStorage.getItem('searchData'));
  return data;
}
function getDataById(id) {
  const data = JSON.parse(localStorage.getItem('contactData'));
  const filterData = data.find((item) => item.id === id);
  console.log(filterData, 'fild');
  return filterData;
}
function addDataStorage(key, data) {
  console.log(data, 'data add');
  localStorage.setItem(key, JSON.stringify(data));
}

function addSearchData(data) {
  localStorage.setItem('searchContact', JSON.stringify(data));
}

function editDataStorage() {}
function dataToTrash(data, id) {
  console.log(`to trash`);
  const item = data.find((item) => item.id === id);
  if (item) {
    item.deletedAt = today;
    addDataStorage('contactData', data);
    console.log(item, data, 'item');
  } else {
    console.log(`Item with id ${id} not found`);
  }
}
function deleteStorageData(key) {
  localStorage.removeItem(key);
}

function deleteData(data, id) {
  console.log(id, typeof id, 'id data');
  // const trashData = contactData('trash');
  console.log(localContactData, 'local delete');
  const updateData = data.filter((item) => item.id !== id);
  console.log(updateData, 'delete');
  addDataStorage('contactData', updateData);
  console.log(data, 'delete update');
}

function addDataLabel(data) {
  localStorage.setItem('labelContact', JSON.stringify(data));
}
