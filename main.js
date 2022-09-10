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
  // get HTML for a card
  getCardElement(index) {
    const num = this.transformNum((index % 13) + 1)
    const symbol = symbols[Math.floor(index / 13)]
    return `
    <div class="card">
      <p>${num}</p>
      <img src="${symbol}" alt="">
      <p>${num}</p>
    </div>`
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
    rootElement.innerHTML = Array.from(Array(52).keys())
    .map(index => this.getCardElement(index))
    .join('')
  }
}

view.displayCards()