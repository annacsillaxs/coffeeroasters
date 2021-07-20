const open__1 = document.querySelector('#open__1');
const cardNodeList = document.querySelectorAll('.subscribe__card');
const cardArr = Array.from(cardNodeList);
const cardsArr = document.querySelectorAll('.subscribe__cards');
const asideArr = document.querySelectorAll('.subscribe__item');
const arrowsArr = document.querySelectorAll('.subscribe__arrow');
const optionsArr = document.querySelectorAll('.subscribe__option');
const sumNodeList = document.querySelectorAll('.subscribe__order-sum span');
const sumArr = Array.from(sumNodeList);


// The interactive subscription page has a number of specific behaviours, which are listed below:

// * If "Capsule" is selected for the first option
//   * The "Want us to grind them?" section should be disabled and not able to be opened
// - Order summary texts updates
//   - If "Capsule" is selected, update the order summary text to:
//     - "I drink my coffee **using** Capsules"
//     - Remove the grind selection text
//   - If "Filter" or "Espresso" are selected, update the order summary text to:
//     - "I drink my coffee **as** Filter||Espresso"
//     - Keep/Add the grind selection text
//   - For all other selections, add the selection title in the blank space where appropriate
// - Updating per shipment price (shown in "How often should we deliver?" section at the bottom) based on weight selected
//   - If 250g weight is selected
//     - Every Week price per shipment is $7.20
//     - Every 2 Weeks price per shipment is $9.60
//     - Every Month price per shipment is $12.00
//   - If 500g weight is selected
//     - Every Week price per shipment is $13.00
//     - Every 2 Weeks price per shipment is $17.50
//     - Every Month price per shipment is $22.00
//   - If 1000g weight is selected
//     - Every Week price per shipment is $22.00
//     - Every 2 Weeks price per shipment is $32.00
//     - Every Month price per shipment is $42.00
// - Calculating per month cost for the Order Summary modal
//   - If Every Week is selected, the Order Summary modal should show the per shipment price multiplied by 4. For example, if 250g weight is selected, the price would be $28.80/month
//   - If Every 2 Weeks is selected, the Order Summary modal should show the per shipment price multiplied by 2. For example, if 250g weight is selected, the price would be $19.20/month
//   - If Every Month is selected, the Order Summary modal should show the per shipment price multiplied by 1. For example, if 250g weight is selected, the price would be $12.00/month

// ========== slice cardArr into arrays of 3 elements
function sliceIntoChunks(arr, chunkSize) {
    const res = [];
    // arr => cardArr | 15 options card
    for (let i = 0; i < arr.length; i += chunkSize) {
        const chunk = arr.slice(i, i + chunkSize);
        res.push(chunk);
    }
    return res;
}

const slicedCardArr = sliceIntoChunks(cardArr, 3);


// ========== Toggle open class onClick
function toggleOpen(clicked) {

  if (clicked.id && !clicked.classList.contains('disabled')) {
    clicked.parentNode.parentNode.classList.toggle('open');

    for (let i = 0; i < asideArr.length; i++) {
      if (asideArr[i].classList.contains(clicked.id)  && !asideArr[i].classList.contains('disabled')) {
        asideArr[i].classList.toggle('open');
        break
      }
    }
  }

  if (!clicked.classList.contains('disabled')) {
    clicked.classList.toggle('open');
    for (let i = 0; i < arrowsArr.length; i++) {
      if (arrowsArr[i].id == clicked.classList[1]) {
        arrowsArr[i].parentNode.parentNode.classList.toggle('open');
        break;
      }
    }
  }
}

// ========== Toggle selected class on card
function toggleSelected(card) {
  let num = Math.floor(cardArr.indexOf(card) / 3);

  for (let i = 0; i < slicedCardArr[num].length; i++) {
    slicedCardArr[num][i].classList.remove('selected');
  }
  card.classList.add('selected');

  let chosen_option = card.firstElementChild.innerText;

  disableGrind(chosen_option, num);
  return ([chosen_option, num]);
}

// ========== disable Grind option
function disableGrind(chosen, row) {
  const grind_arrow = document.querySelector('#open__4');
  const grind_aside = document.querySelector('#grind_aside');

  if (chosen === 'Capsule' && row === 0) {
    grind_arrow.classList.add('disabled');
    grind_aside.classList.add('disabled');
    grind_arrow.classList.remove('open');
    grind_aside.classList.remove('open');
  } else if (chosen !== 'Capsule' && row === 0) {
    grind_arrow.classList.remove('disabled');
    grind_aside.classList.remove('disabled');
  }
}


// ========== Add Selected to Summary
function selectedToSummary(card) {
  const selectedText = toggleSelected(card)[0];
  const selectedCardsIdx = toggleSelected(card)[1];
 
  sumNodeList[selectedCardsIdx].innerText = selectedText;

  let counter = isSumCompleted();
  console.log(counter)
}

// ========== Check if summary isCompleted
function isSumCompleted() {
  let counter = 0;
  const grind_arrow = document.querySelector('#open__4');

  for (let i = 0; i < sumNodeList.length; i++) {
    if (sumNodeList[i].innerText !== '_____' ) {
      counter++
    } 
  }
  // if (grind_arrow.classList.contains('disabled')) {
  //   counter++
  // }
  if (counter === sumNodeList.length || (grind_arrow.classList.contains('disabled') && counter === sumNodeList.length - 1)) {
    document.querySelector('#btn_create').disabled = false;
  }

  return counter;
}

// ========== Generate Modal text
function getText() {
  document.querySelector('#modal__sum').innerHTML = document.querySelector('.subscribe__order-sum').innerHTML;
  console.log(document.querySelector('.subscribe__order-sum').innerHTML)
}

// ========== Show modal
function showModal() {
  document.querySelector('.modal').classList.add('show');
}



// ---------- EVENT LISTENERS ----------

// ========== Toggle open class onClick on arrow
arrowsArr.forEach(arrow => arrow.addEventListener('click', () => toggleOpen(arrow)));

// ========== Toggle open class onClick on item
asideArr.forEach(item => item.addEventListener('click', () => toggleOpen(item)));

// ========== Add selected to Clicked card, remove from the others
cardArr.forEach(card => card.addEventListener('click', () => selectedToSummary(card)));

document.querySelector('#btn_create').addEventListener('click', () => {
  getText();
  showModal();
})

// Close Modal
document.querySelector('#close__modal').addEventListener('click', () => {
  console.log('click')
   document.querySelector('.modal').classList.remove('show')
})