const table = document.querySelector("#app table")


class STATE {
  circle = 0;
  cross = 1;
}

let state = new STATE
let player = state.circle

const records = {
  circle: [],
  cross: [],
};
let turns = 0
const winState = []
winState.push([1, 2, 3])
winState.push([4, 5, 6])
winState.push([7, 8, 9])
winState.push([1, 4, 7])
winState.push([2, 5, 8])
winState.push([3, 6, 9])
winState.push([1, 5, 9])
winState.push([3, 5, 7])

function draw(cell, shape) { // parameter1 = cell = 畫在哪一格
  const str = shape === state.circle ? 'circle' : 'cross'
  cell.innerHTML = `<div class='${str}' />`
}
function switchPlayer(shape) {
  return shape === state.circle ? state.cross : state.circle
}
function addRecords(index, shape) {
  if (shape === state.circle) {
    records.circle.push(index)
  } else if (shape === state.cross) {
    records.cross.push(index)
  }
  turns++
}

function allInclude(element, array) {
  return array.includes(element)
}

function isEndGame(shape) {
  const arr = shape === state.circle ? records.circle : records.cross

  for (const element of winState) {
    if (element.every((e) => allInclude(e, arr))) {
      return true
    }
  }
  return false
}

table.addEventListener('click', function onTableClicked(event) {
  const target = event.target
  if (target.tagName !== 'TD') { // 點到田埂的時候 return
    return
  }
  const index = Number(target.dataset.index)

  draw(target, player)
  addRecords(index, player)

  if (turns >= 5) {
    const end = isEndGame(player)
    if (end === true) {
      console.log('win')
    } else if (end === false) {
      console.log('keep trying')
    }
  }

  player = switchPlayer(player)
})