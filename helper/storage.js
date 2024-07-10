function getDataStorage(key) {
  const data = localStorage.getItem(key);
  return data;
}
function addDataStorage(data) {
  localStorage.setItem('contactData', JSON.stringify(data));
}
function editDataStorage() {}
function deleteDataStorage() {}
function deleteStorage(key) {
  localStorage.removeItem(key);
}

function console() {
  console.log('test');
}
export default {
  getDataStorage,
  addDataStorage,
  editDataStorage,
  deleteDataStorage,
  deleteStorage,
  console,
};
