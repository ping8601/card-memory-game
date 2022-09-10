// link for the suits image on the card
const symbols = [
  // spade
  'https://assets-lighthouse.alphacamp.co/uploads/image/file/17989/__.png',
  // heart
  'https://assets-lighthouse.alphacamp.co/uploads/image/file/17992/heart.png',
  // diamond
  'https://assets-lighthouse.alphacamp.co/uploads/image/file/17991/diamonds.png',
  // club
  'https://assets-lighthouse.alphacamp.co/uploads/image/file/17988/__.png'
]

const view = {
  // get the content of the card
  getCardContent(index) {
    const num = this.transformNum((index % 13) + 1)
    const symbol = symbols[Math.floor(index / 13)]
    return `
      <p>${num}</p>
      <img src="${symbol}" alt="">
      <p>${num}</p>`
  },
  // get HTML for a card
  getCardElement(index) {
    return `<div data-index="${index}" class="card back"></div>`
  },
  // change 1, 11, 12, 13 to A, J, Q, K
  transformNum(num) {
    switch(num) {
      case 1:
        return 'A'
      case 11:
        return 'J'
      case 12:
        return 'Q'
      case 13:
        return 'K'
      default:
        return num
    }
  },
  // put the cards into card pannel
  displayCards() {
    const rootElement = document.querySelector('#cards')
    rootElement.innerHTML = utility.getRandomNumberArray(52)
    .map(index => this.getCardElement(index))
    .join('')
  },
  // flip the card
  flipCard(card) {
    // if the card is front-face
    if (card.classList.contains('back')) {
      // return back-face
      card.classList.remove('back')
      card.innerHTML = this.getCardContent(Number(card.dataset.index))
    } else {
      // if the card is back-face
      // return front-face
      card.classList.add('back')
      card.innerHTML = null
    }
  }
}

const utility = {
  // shuffle the cards
  getRandomNumberArray(count) {
    const number = Array.from(Array(count).keys())
    for (let i = number.length - 1; i > 0; i--) {
      let randomIndex = Math.floor(Math.random() * (i + 1));
      [number[i], number[randomIndex]] = [number[randomIndex], number[i]]
    }
    return number
  }
}

view.displayCards()

// select all card (as node list) and add event listener
document.querySelectorAll('.card').forEach(
  card => { card.addEventListener('click', event => {
    view.flipCard(card)
  })
})