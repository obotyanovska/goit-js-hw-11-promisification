// Task-1
const delay = ms => {
  return new Promise ((resolve) => {
    setTimeout (() => {
      resolve(ms);
    }, ms);
  });
};

const logger1 = time => console.log(`Resolved after ${time}ms`);

delay(2000).then(logger1); 
delay(1000).then(logger1); 
delay(1500).then(logger1); 


//Task-2
const users = [
  { name: 'Mango', active: true },
  { name: 'Poly', active: false },
  { name: 'Ajax', active: true },
  { name: 'Lux', active: false },
];

const toggleUserState = (allUsers, userName) => {
  const updatedUsers = [...allUsers].map(({ name, active }) => {
    if(name === userName) {
      active = !active;
    }
    return ({ name, active });
  });
  
  const promises = updatedUsers.map(toggleState);
  return Promise.all(promises);
};

function toggleState (data) {
  return new Promise((resolve) => {
    resolve(data);
  });
}

const logger2 = updatedUsers => console.table(updatedUsers);

toggleUserState(users, 'Mango').then(logger2);
toggleUserState(users, 'Lux').then(logger2);


//Task-3
const randomIntegerFromInterval = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const makeTransaction = (transaction) => {
  
  return new Promise ((resolve, reject) => {
    const delay = randomIntegerFromInterval(200, 500);
    let {id, amount, time = delay} = transaction;
    setTimeout(() => {
      const canProcess = Math.random() > 0.3;
      if (canProcess) {
        resolve ({id, amount, time});
      } 
      reject ({id, amount, time});
    }, delay);
  });
};

const logSuccess = ( {id, time} ) => {
  console.log(`Transaction ${id} processed in ${time}ms`);
};

const logError = ( {id} ) => {
  console.warn(`Error processing transaction ${id}. Please try again later.`);
};

makeTransaction({ id: 70, amount: 150 })
  .then(logSuccess)
  .catch(logError);

makeTransaction({ id: 71, amount: 230 })
  .then(logSuccess)
  .catch(logError);

makeTransaction({ id: 72, amount: 75 })
  .then(logSuccess)
  .catch(logError);

makeTransaction({ id: 73, amount: 100 })
  .then(logSuccess)
  .catch(logError);

