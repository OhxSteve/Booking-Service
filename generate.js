const fs = require('fs');
const faker = require('faker');

const createDataJSON = (id) => {
  const dataItem = {};
  dataItem.roomId = id;

  dataItem.price = faker.random.number({
    min: 50,
    max: 400,
  });

  dataItem.numberOfBookings = faker.random.number({
    min: 1,
    max: 25,
  });

  dataItem.bookings = [];

  for (let i = 0; i < dataItem.numberOfBookings; i++) {
    const booking = {};
    booking.checkIn = faker.date.between('2018-07-24', '2019-12-31');
    booking.duration = faker.random.number({
      min: 1,
      max: 31,
    });

    dataItem.bookings.push(booking);
  }

  dataItem.serviceFee = faker.random.number({
    min: 15,
    max: 50,
  });

  dataItem.cleaningFee = faker.random.number({
    min: 5,
    max: 35,
  });

  dataItem.minimumStay = faker.random.number({
    max: 3,
  });

  dataItem.maxAdults = faker.random.number({
    min: 2,
    max: 8,
  });

  dataItem.maxChildren = faker.random.number({
    min: 2,
    max: 8,
  });

  dataItem.maxInfants = faker.random.number({
    min: 2,
    max: 4,
  });

  dataItem.taxes = faker.random.number({
    min: 5,
    max: 40,
  });

  const num1 = faker.random.number({
    max: 5,
  });

  const num2 = faker.random.number({
    max: 7,
  });

  const funFactTitles = [
    'This house is haunted.',
    "This was Elon Musk's first apartment.",
    'This place has a great view of the park.',
    'This place has amazing air conditioning.',
    'This is a very popular booking.',
    'People are talking about this place.',
  ];
  const funFacts = [
    'It’s been viewed 500+ times in the past week.',
    `It’s been booked ${dataItem.taxes} times in the past year.`,
    'The owner takes pictures of all the tenants.',
    'This is a top rated listing.',
    'The owner is a gentleman and a scholar.',
    'The owner is well-liked in his community.',
    "It's rated in the top 5% for hospitality.",
    "It's rated in the top 5% for cleanliness.",
  ];

  dataItem.funFactTitles = funFactTitles[num1];
  dataItem.funFacts = funFacts[num2];

  // Shape of dataItem object
  //     {
  //       roomId: Number
  //       numberOfBookings: Number
  //       bookings:  Array [{checkIn: Date, duration: Number}]
  //       price: Number
  //       cleaningFee: Number
  //       serviceFee: Number
  //       minimumStay: Number
  //       maxAdults: Number,
  //       maxChildren: Number,
  //       maxInfants: Number,
  //       taxes: Number
  //   }
  return dataItem;
};
const data = [];
const writeJSON = () => {
  // fs.appendFileSync('./bookings.json');
  // const records = Array(2000000)
  //   .fill()
  //   .map((e, i) => JSON.stringify(createDataJSON(i)));
  // records.forEach((data) => {
  //   out.write(`${data}\n`);
  // });
  for (let i = 1; i <= 10000000; i++) {
    fs.appendFileSync('./bookings.json', `${JSON.stringify(createDataJSON(i))}\n`);
  }
};

writeJSON();
