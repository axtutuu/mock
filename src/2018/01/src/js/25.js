import _ from 'lodash'

const ROCK = 0,
      SCISSORS = 1,
      PAPER = 2


function randCp() {
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
const result = document.querySelector('#result')
const resultTtl = document.querySelector('#result-title')
const bg = document.querySelector('#result-bg')
const me = document.querySelector('#result-me')
const cp = document.querySelector('#result-cp')

submit.addEventListener('click', () => {
  if (judgment.item == undefined) return
  const cpResult = randCp()

  resultTtl.textContent = judgment.judge(cpResult)
  result.setAttribute('data-display', 'block')
  me.setAttribute('data-item', _.invert(judgment.items)[judgment.item])
  cp.setAttribute('data-item', _.invert(judgment.items)[cpResult])
})

bg.addEventListener('click', () => {
  result.setAttribute('data-display', 'none')
})

items.addEventListener('click', (e) => {
  const item = e.target.dataset.item
  if (!item) return

  items.setAttribute('data-selected-item', item)
  judgment.set(item)
})
