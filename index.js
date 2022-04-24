const table = document.querySelector("#app table")
const allTd = document.querySelectorAll('td')

class STATE {
  circle = 0;
  cross = 1;
}

let state = new STATE
let player = state.circle
let turns = 0
let stopAndWaitMessage = false

const records = {
  circle: [],
  cross: [],
};

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
  // console.log(records.circle)
  // console.log(records.cross)
  for (const element of winState) {
    if (element.every((e) => allInclude(e, arr))) {
      return true
    }
  }
  return false
}

function cleanTable() {
  allTd.forEach((e) => {
    e.innerHTML = ''
  })
}
function alertMessage(shape, txt) {
  // console.log('shape=' + shape)
  if (shape === state.circle) {
    alert('O ' + txt)
  } else if (shape === state.cross) {
    alert('X ' + txt)
  }

}
function initialize() {
  turns = 0
  player = state.circle

  records.circle.length = 0
  records.cross.length = 0

  stopAndWaitMessage = false
}
table.addEventListener('click', function onTableClicked(event) {
  const target = event.target
  if (target.tagName !== 'TD') { // 點到田埂的時候 return
    return
  }
  const index = Number(target.dataset.index)

  if (stopAndWaitMessage === true) { // 已經分出勝負，停止一切，等待秀出勝利資訊，並重置棋盤
    return
  }

  player = switchPlayer(player)
  draw(target, player)
  addRecords(index, player)
  // console.log('turns=' + turns)

  if (turns >= 5) {
    const end = isEndGame(player)
    if (end === true) {
      console.log('win')
      stopAndWaitMessage = true
      setTimeout(() => {
        alertMessage(player, 'win')
        cleanTable()
        initialize()
      }, 500);

    } else if (end === false) {
      console.log('keep trying')

    }
  }

})
