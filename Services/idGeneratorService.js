const Counter = require('../Model/counter');

// Function to generate the next unique trip ID (starting from TR1000)
const generateTripId = async () => {
  let counter = await Counter.findOne({ name: 'tripIdCounter' });

  // If the counter doesn't exist, create it with the initial value
  if (!counter) {
    counter = new Counter({ name: 'tripIdCounter', count: 1000 });
    await counter.save();
  }

  // Increment the counter
  counter.count += 1;

  // Save the updated counter
  await counter.save();

  // Generate the trip ID in the format TR1000, TR1001, etc.
  return `TR${counter.count}`;
};

module.exports = { generateTripId };
