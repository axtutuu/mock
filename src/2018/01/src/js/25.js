import _ from 'lodash'

const ROCK = 0,
      SCISSORS = 1,
      PAPER = 2


function cp() {
  return Math.floor(Math.random() * (PAPER - ROCK) + ROCK)
}

class Judgment {
  constructor() {
    this.items = {
      rock: 0,
      scissors: 1,
      paper: 2
    }

    this.results = {
      '0': "引き分け",
      '1': "負け",
      '2': "勝ち"
    }
  }

  set(item) {
    const tmp = this.items[item]
    if (tmp === undefined) throw new Error('item not found')
    this.item = tmp
  }

  judge(cp) {
    const i = (this.item - cp + 3) % 3
    return this.results[String(i)]
  }
}

const judgment = new Judgment()

const submit = document.querySelector('#submit')
const items = document.querySelector('#items')
submit.addEventListener('click', () => {
  console.log(judgment.judge(cp()))
})

items.addEventListener('click', (e) => {
  const item = e.target.dataset.item
  if (!item) return

  items.setAttribute('data-selected-item', item)
  judgment.set(item)
})
