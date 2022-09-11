// define five state for memory card game 
const GAME_STATE = {
  FirstCardAwait: 'FirstCardAwait',
  SecondCardAwait: 'SecondCardAwait',
  CardsMatchFailed: 'CardsMatchFailed',
  CardsMatched: 'CardsMatched',
  GameFinished: 'GameFinished' 
}

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

const model = {
  revealedCards: [],
  isRevealedCardsMatched() {
    return this.revealedCards[0].dataset.index % 13 === this.revealedCards[1].dataset.index % 13
  },
  score: 0,
  triedTimes: 0
}

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
  displayCards(indexes) {
    const rootElement = document.querySelector('#cards')
    rootElement.innerHTML = indexes.map(index => this.getCardElement(index)).join('')
  },
  // flip the card
  flipCards(...cards) {
    cards.map(card => {
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
    })
  },
  // add features on paired cards
  pairedCards(...cards) {
    cards.map(card => {
      card.classList.add('paired')
    })
  },
  renderScore(score) {
    document.querySelector('.score').textContent = `Score: ${score}`
  },
  renderTriedTimes(times) {
    document.querySelector('.tried').textContent = `You have tried: ${times} times`
  }
}

const controller = {
  currentState: GAME_STATE.FirstCardAwait,
  generateCards() {
    view.displayCards(utility.getRandomNumberArray(52))
  },
  // decide what to do with different game satates
  dispatchCardAction(card) {
    if (!card.classList.contains('back')) {
      return
    }
    switch(this.currentState) {
      case GAME_STATE.FirstCardAwait:
        view.flipCards(card)
        model.revealedCards.push(card)
        this.currentState = GAME_STATE.SecondCardAwait
        break
      case GAME_STATE.SecondCardAwait:
        view.renderTriedTimes(++model.triedTimes)
        view.flipCards(card)
        model.revealedCards.push(card)
        if (model.isRevealedCardsMatched()) {
          // cards matched
          view.renderScore(model.score += 10)
          this.currentState = GAME_STATE.CardsMatched
          view.pairedCards(...model.revealedCards)
          model.revealedCards = []
          this.currentState = GAME_STATE.FirstCardAwait
        } else {
          // cards didn't match
          this.currentState = GAME_STATE.CardsMatchFailed
          setTimeout(this.resetCards, 1000)
        }
        break

    }
    console.log('current state:', this.currentState)
    console.log('revealed card:', model.revealedCards)
  },
  resetCards() {
    view.flipCards(...model.revealedCards)
    model.revealedCards = []
    controller.currentState = GAME_STATE.FirstCardAwait
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

controller.generateCards()

// select all card (as node list) and add event listener
document.querySelectorAll('.card').forEach(
  card => { card.addEventListener('click', event => {
    controller.dispatchCardAction(card)
  })
})