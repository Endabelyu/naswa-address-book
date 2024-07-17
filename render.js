function renderTable() {
  const currentData = getSearchData() || getDataStorage();
  const localContactData = currentData;
  const labelId = Number(url.get('label'));
  console.log(localContactData, 'render');
  const container = document.getElementById('container-contact-data');
  if (localContactData && localContactData.length >= 0) {
    container.innerHTML = '';
  }
  const appendCell = (row, text) => {
    const td = document.createElement('td');
    td.textContent = text;
    row.appendChild(td);
  };

  const renderContact =
    pathname === '/'
      ? contactData(localContactData, '/')
      : pathname === '/naswa-address-book/'
      ? contactData(localContactData, '/')
      : pathname.includes('trash')
      ? contactData(localContactData, 'trash')
      : contactData(localContactData, 'label', labelId);

  console.log(renderContact, 'render');
  renderContact.forEach((item) => {
    const tr = document.createElement('tr');
    const tdAction = document.createElement('td');

    // Full Name (First, Middle, Last)
    const fullName = `${item.firstName} ${item.middleName} ${item.lastName}`;
    appendCell(tr, fullName);
    // Phone Number
    appendCell(tr, item.phone);
    // Email
    appendCell(tr, item.email);
    // Label
    appendCell(tr, item.label.map((item) => getLabelValue(item)).join(', '));
    // Action (Example: Edit button)
    tdAction.classList = 'flex justify-center gap-2 p-2';
    const editButton = document.createElement('a');
    if (pathname === '/' || pathname === '/naswa-address-book/') {
      editButton.href = `/contact/?id=${item.id}`;
      editButton.innerHTML = `<svg
        xmlns='http://www.w3.org/2000/svg'
        x='0px'
        y='0px'
        
        viewBox='0 0 24 24'
        class='w-5'
      >
        <path d='M14.5 5.5L3 17 3 21 7 21 18.5 9.5zM21.2 2.8c-1.1-1.1-2.9-1.1-4 0L16 4l4 4 1.2-1.2C22.3 5.7 22.3 3.9 21.2 2.8z'></path>
      </svg>`;
    }

    const deleteButton = document.createElement('button');

    deleteButton.addEventListener('click', function () {
      if (!pathname.includes('trash')) {
        dataToTrash(localContactData, item.id);
      } else if (pathname.includes('trash')) {
        console.log('trash in');
        deleteData(localContactData, item.id);
      }
      renderTable();
    });
    deleteButton.addEventListener('touchstart', function () {
      if (pathname == '/' || pathname === '/naswa-address-book/') {
        dataToTrash(localContactData, item.id);
      } else if (pathname.includes('trash')) {
        deleteData(localContactData, item.id);
      }
      renderTable();
    });
    deleteButton.classList = 'w-4';
    deleteButton.innerHTML = `<svg viewBox="0 0 24 24" fill="none"
        class='w-5' xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M10 11V17" stroke="#ff0000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M14 11V17" stroke="#ff0000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M4 7H20" stroke="#ff0000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M6 7H12H18V18C18 19.6569 16.6569 21 15 21H9C7.34315 21 6 19.6569 6 18V7Z" stroke="#ff0000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke="#ff0000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>`;

    tdAction.appendChild(editButton);
    tdAction.appendChild(deleteButton);
    tr.appendChild(tdAction);

    container.appendChild(tr);
  });

  renderLabelSidebar();
  renderCountDataContact(localContactData);
  renderCountTrash(localContactData);
  renderCountLabel(localContactData);
  renderTitleLabel(labelId);

  if (pathname.includes('create')) {
    renderLabelForm();
  }
}
function renderEditForm() {
  const localContactData = getDataStorage();
  const containerForm = document.querySelector('.container-data-edit');
  const dataId = Number(url.get('id'));
  const dataWithId = getDataById(dataId);
  selectedLabels = dataWithId.label;
  const formEdit = `<form id="contact-form-edit" >
            <div class="container-button  flex flex-col justify-between  rounded-md py-4 ">
              <ul class="flex justify-between">
                <li class="self-center">
              <a href="/" class="bg-primary text-slate-100 rounded-xl py-2 px-4">Cancel</a>
      
                </li>
                <li class="flex gap-4">
                  <!-- <button>favourite</button> -->
                  <button class="bg-primary text-slate-100 rounded-xl py-2 px-4">Save</button>
      
                </li>
            
              </div>
            <div class="overflow-y-auto h-[80dvh]  pt-10 flex flex-col gap-4">
            <div class="container-checkbox-label justify-center relative flex flex-col gap-4">
                <h3 class="text-center text-2xl">Select Label Contact</h3>
                <div class="flex gap-8 justify-center">

                <div class="relative">
                  <input type="checkbox" id="home" name="home" class='peer absolute z-10 w-8 h-8 -top-1 right-4 hidden' checked='${false}'value='1'>
                  <label for="home"id='homeLabel' class=" bg-white p-1 rounded shadow-md cursor-pointer">Home</label><br>
                </div>
                <div class="relative">
                  <input type="checkbox" id="work" name="work" class='peer absolute z-10 w-8 h-8 -top-1 right-4 hidden' checked='${false}'  value='2'>
                  <label for="work" id='workLabel' class=" bg-white p-1 rounded shadow-md cursor-pointer">Work</label><br>
                </div>
              </div>

              </div>  
            <div class="container-name flex gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="person" class="w-8 self-start mt-2"><g><path d="M12 11a4 4 0 1 0-4-4 4 4 0 0 0 4 4zm6 10a1 1 0 0 0 1-1 7 7 0 0 0-14 0 1 1 0 0 0 1 1z" ></path></g></svg>

            <div class="container-input flex flex-col gap-2 w-10/12">              
              <div class="relative py-3 bg-transparent">
              <input type="text" id="firstName" name='firstName' placeholder="" class=" peer block w-full appearance-none  rounded-md py-2 px-2 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent" value="${
                dataWithId.firstName
              }" required>
              <label for="firstName" id='firstNameLabel' class="absolute   transition-all duration-200  top-4 left-3 text-gray-400 peer-focus:-top-4 peer-focus:left-0 peer-focus:text-sm peer-focus:text-blue-600 ">First Name</label>
              </div>
            <div class="relative py-3 bg-transparent">
              <input type="text" id="middleName" name='middleName' placeholder=" " class=" peer block w-full appearance-none  rounded-md py-2 px-2 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent" value="${
                dataWithId.middleName
              }" required>
              <label for="middleName" id='middleNameLabel' class="absolute   transition-all duration-200  top-4 left-3 text-gray-400 peer-focus:-top-4 peer-focus:left-0 peer-focus:text-sm peer-focus:text-blue-600 ">Middle Name</label>
          </div>
            <div class="relative py-3 bg-transparent">
              <input type="text" id="lastName" name='lastName' placeholder=" " class=" peer block w-full appearance-none  rounded-md py-2 px-2 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent" value="${
                dataWithId.lastName
              }" required>
              <label for="lastName" id='lastNameLabel' class="absolute   transition-all duration-200  top-4 left-3 text-gray-400 peer-focus:-top-4 peer-focus:left-0 peer-focus:text-sm peer-focus:text-blue-600 ">Last Name</label>
          </div>
            
            
          </div>
            </div>
            <div class="container-company flex gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-8 self-start mt-3" viewBox="0 0 32 32" id="building"><path d="M20 4h2v2h-2zm4 0h2v2h-2zm-4 4h2v2h-2zm4 0h2v2h-2zm-4 4h2v2h-2zm4 0h2v2h-2zm-4 4h2v2h-2zm4 0h2v2h-2zm-4 4h2v2h-2zm4 0h2v2h-2zm4-20H18a2 2 0 0 0-2 2v6H6a2 2 0 0 0-2 2v20a2 2 0 0 0 2 2h22a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM12 30h-2v-4h2v4zm2 0v-6H8v6H6V10h10v20h-2zm10 0h-2v-4h2v4zm4 0h-2v-6h-6v6h-2V2h10v28zM8 12h2v2H8zm4 0h2v2h-2zm-4 4h2v2H8zm4 0h2v2h-2zm-4 4h2v2H8zm4 0h2v2h-2z"></path></svg> 
             
                <div class="container-input flex flex-col gap-2 w-10/12">

                
                <div class="relative py-3 bg-transparent">
                  <input type="text" id="company" name="company" placeholder=" " class=" peer block w-full appearance-none  rounded-md py-2 px-2 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent" value="${
                    dataWithId.company
                  }" required>
                  <label for="Company" id='companyLabel' class="absolute   transition-all duration-200  top-4 left-3 text-gray-400 peer-focus:-top-4 peer-focus:left-0 peer-focus:text-sm peer-focus:text-blue-600 ">Company</label>
              </div>
              <div class="relative py-3 bg-transparent">
                  <input type="text" id="jobTitle" name="jobTitle" placeholder=" " class=" peer block w-full appearance-none  rounded-md py-2 px-2 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent" value="${
                    dataWithId.jobTitle
                  }" required>
                  <label for="jobTitle"  id='jobTitleLabel' class="absolute   transition-all duration-200  top-4 left-3 text-gray-400 peer-focus:-top-4 peer-focus:left-0 peer-focus:text-sm peer-focus:text-blue-600 ">Job Title</label>
              </div>
              </div>
            </div>
            <div class="container-email flex gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" id="email" class="w-8 self-start mt-3"><path fill="#222" d="M53.42 53.32H10.58a8.51 8.51 0 0 1-8.5-8.5V19.18a8.51 8.51 0 0 1 8.5-8.5h42.84a8.51 8.51 0 0 1 8.5 8.5v25.64a8.51 8.51 0 0 1-8.5 8.5ZM10.58 13.68a5.5 5.5 0 0 0-5.5 5.5v25.64a5.5 5.5 0 0 0 5.5 5.5h42.84a5.5 5.5 0 0 0 5.5-5.5V19.18a5.5 5.5 0 0 0-5.5-5.5Z"></path><path fill="#222" d="M32 38.08a8.51 8.51 0 0 1-5.13-1.71L3.52 18.71a1.5 1.5 0 1 1 1.81-2.39L28.68 34a5.55 5.55 0 0 0 6.64 0l23.35-17.68a1.5 1.5 0 1 1 1.81 2.39L37.13 36.37A8.51 8.51 0 0 1 32 38.08Z"></path><path fill="#222" d="M4.17 49.14a1.5 1.5 0 0 1-1-2.62l18.4-16.41a1.5 1.5 0 0 1 2 2.24L5.17 48.76a1.46 1.46 0 0 1-1 .38zm55.66 0a1.46 1.46 0 0 1-1-.38l-18.4-16.41a1.5 1.5 0 1 1 2-2.24l18.39 16.41a1.5 1.5 0 0 1-1 2.62z"></path></svg>
                <div class="container-input flex flex-col gap-2 w-10/12">

                
                <div class="relative py-3 bg-transparent">
                  <input type="email" id="email" name="email" placeholder=" " class=" peer block w-full appearance-none  rounded-md py-2 px-2 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent" value="${
                    dataWithId.email
                  }" required>
                  <label for="email"  id='emailLabel' class="absolute transition-all duration-200  top-4 left-3 text-gray-400 peer-focus:-top-4 peer-focus:left-0 peer-focus:text-sm peer-focus:text-blue-600 ">Email</label>
              </div>
              </div>
            </div>
            <div class="container-phone flex gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"  class='w-8 self-start mt-3' id="phone"><path d="M27.308,20.649l-2.2-2.2a3.521,3.521,0,0,0-4.938-.021,2.152,2.152,0,0,1-2.729.267A15.026,15.026,0,0,1,13.3,14.562a2.181,2.181,0,0,1,.284-2.739A3.521,3.521,0,0,0,13.553,6.9l-2.2-2.2a3.514,3.514,0,0,0-4.961,0l-.633.634c-3.3,3.3-3.053,10.238,3.813,17.1,4.14,4.141,8.307,5.875,11.686,5.875a7.5,7.5,0,0,0,5.418-2.061l.634-.634A3.513,3.513,0,0,0,27.308,20.649ZM25.894,24.2l-.634.634c-2.6,2.6-8.339,2.125-14.276-3.813S4.571,9.34,7.171,6.74L7.8,6.107a1.511,1.511,0,0,1,2.133,0l2.2,2.2a1.511,1.511,0,0,1,.021,2.11,4.181,4.181,0,0,0-.531,5.239,17.01,17.01,0,0,0,4.713,4.706,4.179,4.179,0,0,0,5.231-.517,1.512,1.512,0,0,1,2.118.013l2.2,2.2A1.51,1.51,0,0,1,25.894,24.2Z"></path></svg>
                <div class="container-input flex flex-col gap-2 w-10/12">

                
                <div class="relative py-3 bg-transparent">
                  <input type="text" id="phone" name='phone' placeholder=" " class=" peer block w-full appearance-none  rounded-md py-2 px-2 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent" value="${
                    dataWithId.phone
                  }" required>
                  <label for="phone" id="phoneLabel" class="absolute   transition-all duration-200  top-4 left-3 text-gray-400 peer-focus:-top-4 peer-focus:left-0 peer-focus:text-sm peer-focus:text-blue-600  ">Phone</label>
              </div>
              </div>
            </div>
            <div class="container-address flex gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" class='w-8 self-start mt-3' id="address"><path d="M17.378,30.847,31.205,52.581a.942.942,0,0,0,1.59,0L46.621,30.847a.86.86,0,0,0,.047-.084,18.058,18.058,0,0,0,3.561-10.792,18.229,18.229,0,1,0-36.458,0,18.053,18.053,0,0,0,3.558,10.787A.864.864,0,0,0,17.378,30.847ZM32,3.625A16.364,16.364,0,0,1,48.345,19.971a16.188,16.188,0,0,1-3.29,9.8.893.893,0,0,0-.117.208L32,50.321,19.067,29.992a.934.934,0,0,0-.122-.217,16.188,16.188,0,0,1-3.29-9.8A16.364,16.364,0,0,1,32,3.625Z"></path><path d="M40.756 50.939a.942.942 0 0 0-.154 1.878c5.906.485 9.432 1.806 9.432 3.532 0 1.279-6.366 3.767-18.034 3.767s-18.034-2.488-18.034-3.767c0-.822.9-2.812 9.281-3.52a.942.942 0 0 0-.159-1.877c-7.406.626-11.006 2.392-11.006 5.4C12.082 60.232 22.407 62 32 62s19.918-1.768 19.918-5.651C51.918 53.326 48.267 51.556 40.756 50.939zM21.9 23.116h2.5v7.935a.941.941 0 0 0 .942.941H38.657a.941.941 0 0 0 .942-.941V23.116h2.5a2.193 2.193 0 0 0 2.109-1.38 1.831 1.831 0 0 0-.622-2.07l-10.1-8.191a2.436 2.436 0 0 0-2.974 0l-10.1 8.19a1.83 1.83 0 0 0-.622 2.069A2.194 2.194 0 0 0 21.9 23.116zm11.734 6.993h-2.9a.917.917 0 0 0 .185-.531V26.265a1.268 1.268 0 1 1 2.535 0v3.313A.917.917 0 0 0 33.632 30.109zM31.7 12.938a.546.546 0 0 1 .6 0l10.1 8.19.033-.023c-.01.025-.1.126-.334.126H38.657a.942.942 0 0 0-.942.942v7.935H35.146a.923.923 0 0 0 .184-.531V26.265a3.151 3.151 0 1 0-6.3 0v3.313a.917.917 0 0 0 .185.531H26.285V22.174a.941.941 0 0 0-.941-.942H21.9c-.233 0-.325-.1-.3-.1z"></path></svg>
                <div class="container-input flex flex-col gap-2 w-10/12">

                
                <div class="relative py-3 bg-transparent">
                  <input type="text" id="streetAddress" name='streetAddress' placeholder=" " class=" peer block w-full appearance-none  rounded-md py-2 px-2 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent" value="${
                    dataWithId.streetAddress
                  }" required>
                  <label for="streetAddress" id="streetAddressLabel" class="absolute   transition-all duration-200  top-4 left-3 text-gray-400 peer-focus:-top-4 peer-focus:left-0 peer-focus:text-sm peer-focus:text-blue-600 ">Street Address</label>
              </div>
                <div class="relative py-3 bg-transparent">
                  <input type="text" id="streetAddress2" name='streetAddress2' placeholder=" " class=" peer block w-full appearance-none  rounded-md py-2 px-2 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent" value="${
                    dataWithId.streetAddress2
                  }" required>
                  <label for="streetAddress2" id="streetAddress2Label" class="absolute   transition-all duration-200  top-4 left-3 text-gray-400 peer-focus:-top-4 peer-focus:left-0 peer-focus:text-sm peer-focus:text-blue-600  ">Street Address 2</label>
              </div>
                <div class="relative py-3 bg-transparent">
                  <input type="text" id="city" name='city' placeholder=" " class=" peer block w-full appearance-none  rounded-md py-2 px-2 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent" value="${
                    dataWithId.city
                  }" required>
                  <label for="city" id="cityLabel" class="absolute   transition-all duration-200  top-4 left-3 text-gray-400 peer-focus:-top-4 peer-focus:left-0 peer-focus:text-sm peer-focus:text-blue-600 ">City</label>
              </div>
                <div class="relative py-3 bg-transparent">
                  <input type="text" id="province" name="province" placeholder=" " class=" peer block w-full appearance-none  rounded-md py-2 px-2 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent" value="${
                    dataWithId.province
                  }" required>
                  <label for="province" id="provinceLabel" class="absolute   transition-all duration-200  top-4 left-3 text-gray-400 peer-focus:-top-4 peer-focus:left-0 peer-focus:text-sm peer-focus:text-blue-600  ">Province</label>
              </div>
                <div class="relative py-3 bg-transparent">
                  <input type="text" id="postalCode" name="postalCode" placeholder=" " class=" peer block w-full appearance-none  rounded-md py-2 px-2 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent" value="${
                    dataWithId.postalCode
                  }" required>
                  <label for="postalCode" id="postalCodeLabel" class="absolute transition-all duration-200  top-4 left-3 text-gray-400 peer-focus:-top-4 peer-focus:left-0 peer-focus:text-sm peer-focus:text-blue-600 ">Postal Code</label>
              </div>
              </div>
            </div>
            <div class="container-notes flex gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"  class='w-8 self-start mt-3' id="notes"><path d="M52.24023,13.97983H48.5V10.43a5.36342,5.36342,0,0,0-5.25977-5.4502H40.40967a6.00065,6.00065,0,0,0-11.81934,0H11.75977A5.36343,5.36343,0,0,0,6.5,10.43V49.52964a5.36342,5.36342,0,0,0,5.25977,5.45019H15.5v3.54981a5.36342,5.36342,0,0,0,5.25977,5.45019H52.24023A5.36341,5.36341,0,0,0,57.5,58.52964V19.43A5.36342,5.36342,0,0,0,52.24023,13.97983ZM34.5,3.97983a2.00021,2.00021,0,0,1-.00009,4A2.00021,2.00021,0,0,1,34.5,3.97983Zm-22.74023,47A1.36641,1.36641,0,0,1,10.5,49.52964V10.43a1.36641,1.36641,0,0,1,1.25977-1.4502H28.67188l-3.58594,3.58594a2,2,0,0,0,2.82818,2.82807l4.00544-4.00544a6.0287,6.0287,0,0,0,7.76863-2.40865l3.552.00008A1.36641,1.36641,0,0,1,44.5,10.43V49.52964a1.36641,1.36641,0,0,1-1.25977,1.45019ZM53.5,58.52964a1.36641,1.36641,0,0,1-1.25977,1.45019H20.75977A1.36641,1.36641,0,0,1,19.5,58.52964V54.97983H43.24023A5.36341,5.36341,0,0,0,48.5,49.52964V17.97983h3.74023A1.36641,1.36641,0,0,1,53.5,19.43Z"></path><path d="M38.5 22.97983h-22a2.00021 2.00021 0 0 0 .00009 4H38.5A2.00021 2.00021 0 0 0 38.5 22.97983zM38.5 32.97983h-22a2.00021 2.00021 0 0 0 .00009 4H38.5A2.00021 2.00021 0 0 0 38.5 32.97983zM38.5 41.97983a2.00019 2.00019 0 0 0 .00008 4A2.00019 2.00019 0 0 0 38.5 41.97983zM30.5 41.97983a2.00021 2.00021 0 0 0 .00009 4A2.00021 2.00021 0 0 0 30.5 41.97983z"></path></svg>
                <div class="container-input flex flex-col gap-2 w-10/12">

                
                <div class="relative py-3 bg-transparent">
                  <textarea type="text" id="notes" name='notes' placeholder=" " class=" peer block w-full appearance-none  rounded-md py-2 px-2 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent h-32" value="${
                    dataWithId.notes
                  }" required>${dataWithId.notes}</textarea>
                 
                  <label for="notes" id="notesLabel" class="absolute transition-all duration-200  top-4 left-3 text-gray-400 peer-focus:-top-4 peer-focus:left-0 peer-focus:text-sm peer-focus:text-blue-600">Notes</label>
              </div>
              </div>
            </div>
          </div>
          </form>`;
  containerForm.innerHTML = formEdit;
  // checkCheckboxes();

  const formEditElement = document.getElementById('contact-form-edit');
  formEditElement.addEventListener('submit', editContactData);
  const inputs = formEditElement.querySelectorAll(
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
  renderLabelSidebar();
  renderCountDataContact(localContactData);
  renderCountTrash(localContactData);
  renderCountLabel(localContactData);
}

function renderCountSideBar() {
  // this event listener to make style when value inside input or text area empty or deleted
  const localContactData = getDataStorage();
  console.log(localContactData);

  const inputs = formElement.querySelectorAll(
    'input[type="text"],input[type="email"], textarea',
  );
  console.log(inputs);
  inputs.forEach((input) => {
    const labelId = input.id + 'Label';
    const label = document.getElementById(labelId);
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
  renderLabelSidebar();
  renderCountDataContact(localContactData);
  renderCountTrash(localContactData);
  renderCountLabel(localContactData);
}
function renderCountDataContact(data) {
  const spanCountContact = document.querySelectorAll('.count-contacts');
  const homeData =
    data && data.length > 0
      ? data.filter((item) => item.createdAt && !item.deletedAt)
      : [];
  console.log(homeData);
  const countData = homeData.length;
  if (spanCountContact)
    spanCountContact.forEach((item) => (item.innerText = countData));
}
function renderCountTrash(data) {
  const spanCountTrash = document.querySelectorAll('#count-trash');
  console.log(spanCountTrash);
  const trashData =
    data && data.length > 0 ? data.filter((item) => item.deletedAt) : [];
  console.log(trashData, 'tras');
  spanCountTrash.forEach((item) => (item.innerText = trashData.length));
}
function renderCountLabel(data) {
  const spanCountContact = document.querySelectorAll(`.count-label`);

  spanCountContact.forEach((item) => {
    const labelData = data.filter(
      (items) => !items.deletedAt && items.label.includes(Number(item.id)),
    );
    item.innerText = labelData.length;
    console.log(labelData, 'label');
  });

  const localData = data.length;
  // spanCountContact.innerText = localData;
  // console.log(spanCountContact.innerText);
}

function activeMenu() {}

function contactData(data, pathname, id) {
  console.log(
    data,
    data.filter((item) => item.createdAt && !item.deletedAt),
    'datalocal',
  );
  switch (pathname) {
    case '/':
      return data.filter((item) => item.createdAt && !item.deletedAt);
    case 'trash':
      console.log('trash');
      return data.filter((item) => item.deletedAt);
    case 'label':
      // if (id === '1') {
      // } else {
      // }
      return data.filter((item) => item.label.includes(id) && !item.deletedAt);
    default:
      return 'Default value';
  }
}

function editContactData(event) {
  const dataId = Number(url.get('id'));
  const localContactData = getDataStorage();

  event.preventDefault();
  const formContactData = new FormData(event.target);
  const newContact = {
    id: dataId,
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
    label: selectedLabels,
    notes: formContactData.get('notes'),
    deletedAt: null,
    createdAt: today,
  };
  const updatedContacts = localContactData.map((contact) => {
    if (contact.id === dataId) {
      return newContact;
    } else {
      return contact;
    }
  });
  addDataStorage('contactData', updatedContacts);
  renderEditForm();
}

function renderLabelSidebar() {
  const containerLabel = document.querySelectorAll('.container-label');
  const labelData = getDataLabel();
  labelData.forEach((item) => {
    const anchorLabel = document.createElement('a');
    anchorLabel.setAttribute('href', `/label/?label=${item.id}`);
    anchorLabel.setAttribute(
      'class',
      'rounded-xl ml-2 py-2 px-4 hover:bg-[#6987c9] hover:text-white',
    );
    const spanCountElement = document.createElement('span');
    spanCountElement.setAttribute('id', item.id);
    spanCountElement.setAttribute('class', 'count-label');
    console.log(spanCountElement);
    anchorLabel.innerHTML = `${item.value} (<span id="${item.id}" class="count-label">0</span>)`;
    console.log(anchorLabel);

    containerLabel.forEach((item) => item.appendChild(anchorLabel));
  });
  console.log(containerLabel);
}

function renderLabelForm() {
  const containerLabel = document.querySelectorAll('.container-select-label');
  // containerLabel.forEach((item)=>
  // )
  console.log(containerLabel, 'lables');
}

function adjustURL() {
  const anchor = document.querySelectorAll('a');

  console.log(anchor);
  anchor.forEach((item) => {
    const url = new URL(item.href);
    let newHref = '';
    console.log(pathname.includes('naswa-address-book'), 'condition adjust');
    if (pathname.includes('naswa-address-book')) {
      newHref = '/naswa-address-book' + url.pathname;
      console.log(newHref);
      item.href = newHref;
    }
  });
  console.log(anchor);
}
function checkCheckboxes(data) {
  // Loop through each checkboxs
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach((checkbox) => {
    const labelId = checkbox.id + 'Label';
    const label = document.getElementById(labelId);
    const isChecked = data.includes(Number(checkbox.value));
    if (isChecked) {
      label.classList.add('peer-checked:bg-primary', 'peer-checked:text-white');
      // label.setAttribute(
      //   'class',
      //   'peer-checked:bg-primary peer-checked:text-white bg-white p-1 rounded shadow-md cursor-pointer',
      // );
    } else {
      if (
        label.classList.contains(
          'peer-checked:bg-primary',
          'peer-checked:text-white',
        )
      ) {
        label.classList.remove(
          'peer-checked:bg-primary',
          'peer-checked:text-white',
        );
      }
    }
  });
}

// // Example usage
// const dataCheckbox = {
//   label: [1, 3], // Assuming the checkbox values are numbers
// };

// checkCheckboxes(dataCheckbox);

function renderTitleLabel(id) {
  const titleHeader = document.querySelectorAll('#title-label');
  console.log(titleHeader);
  console.log(id, 'label id');

  titleHeader.forEach((header) => {
    if (id === 1) {
      header.innerText = 'Home';
    } else if (id === 2) {
      header.innerText = 'Work';
    }
  });
}
