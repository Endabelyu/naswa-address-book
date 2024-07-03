const contact = [
  {
    ID: '1',
    'Full Name': 'John Doe',
    Phone: '+1-202-555-0143',
    Email: 'johndoe@example.com',
    Location: 'New York, USA',
  },
  {
    ID: '2',
    'Full Name': 'Jane Smith',
    Phone: '+1-202-555-0198',
    Email: 'janesmith@example.com',
    Location: 'Los Angeles, USA',
  },
  {
    ID: '3',
    'Full Name': 'Michael Johnson',
    Phone: '+44-20-7946-0958',
    Email: 'michaeljohnson@example.co.uk',
    Location: 'London, UK',
  },
  {
    ID: '4',
    'Full Name': 'Emily Davis',
    Phone: '+61-2-9374-4000',
    Email: 'emilydavis@example.com.au',
    Location: 'Sydney, Australia',
  },
  {
    ID: '5',
    'Full Name': 'Chris Brown',
    Phone: '+49-30-12345678',
    Email: 'chrisbrown@example.de',
    Location: 'Berlin, Germany',
  },
  {
    ID: '6',
    'Full Name': 'Patricia Garcia',
    Phone: '+34-91-123-4567',
    Email: 'patriciagarcia@example.es',
    Location: 'Madrid, Spain',
  },
  {
    ID: '7',
    'Full Name': 'David Wilson',
    Phone: '+81-3-1234-5678',
    Email: 'davidwilson@example.jp',
    Location: 'Tokyo, Japan',
  },
  {
    ID: '8',
    'Full Name': 'Sophia Martinez',
    Phone: '+33-1-2345-6789',
    Email: 'sophiamartinez@example.fr',
    Location: 'Paris, France',
  },
  {
    ID: '9',
    'Full Name': 'Liam Robinson',
    Phone: '+1-416-555-0123',
    Email: 'liamrobinson@example.ca',
    Location: 'Toronto, Canada',
  },
  {
    ID: '10',
    'Full Name': 'Olivia Lee',
    Phone: '+82-2-1234-5678',
    Email: 'olivialee@example.kr',
    Location: 'Seoul, South Korea',
  },
];

contact.forEach((contact) => {
  console.log(
    `${contact['Full Name']} (${contact['Phone']}) ${contact['Email']} in ${contact['Location']}`,
  );
});
