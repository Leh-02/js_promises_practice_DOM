'use strict';

function setSuccessClass(promiseNumber) {
  const notification = document.createElement('div');

  notification.setAttribute('data-qa', 'notification');
  notification.classList.add('success');
  notification.textContent = `${promiseNumber} promise was resolved`;
  document.body.appendChild(notification);
}

function setErrorClass(promiseNumber) {
  const notification = document.createElement('div');

  notification.setAttribute('data-qa', 'notification');
  notification.classList.add('error');
  notification.textContent = `${promiseNumber} promise was reject`;
  document.body.appendChild(notification);
}

const firstPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject(new Error('First'));
  }, 3000);

  document.addEventListener('click', () => {
    resolve('First');
  });
});

firstPromise.then(setSuccessClass);
firstPromise.catch(setErrorClass);

const secondPromise = new Promise((resolve) => {
  document.addEventListener('click', (ev) => {
    ev.preventDefault();

    if (ev.button === 0 || ev.button === 2) {
      resolve('Second');
    }
  });

  document.addEventListener('contextmenu', (ev) => {
    ev.preventDefault();

    if (ev.button === 2) {
      resolve('Second');
    }
  });
});

secondPromise.then(setSuccessClass);

const thirdPromise = new Promise((resolve) => {
  let leftClick = false;
  let rightClick = false;

  document.addEventListener('click', (ev) => {
    leftClick = true;

    if (ev.button === 0 && rightClick === true) {
      resolve('Third');
    }
  });

  document.addEventListener('contextmenu', (ev) => {
    ev.preventDefault();
    rightClick = true;

    if (ev.button === 2 && leftClick === true) {
      resolve('Third');
    }
  });
});

thirdPromise.then(setSuccessClass);
