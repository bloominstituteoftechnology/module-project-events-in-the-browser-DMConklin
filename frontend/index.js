// 👉 TASK 1 - Understand the existing code 👈
function moduleProject2() {
  // 👇 WORK WORK BELOW THIS LINE 👇
  let startTime = new Date().getTime() // Record start time

  function getTimeElapsed() { // To be used at end of game to get elapsed time
    let currentTime = new Date().getTime()
    return currentTime - startTime
  }

  // Setting up the footer content
  let footer = document.querySelector('footer')
  let currentYear = new Date().getFullYear()
  footer.textContent = `© BLOOM INSTITUTE OF TECHNOLOGY ${currentYear}`

  let keys = { // To easily check `event.key` on keyboard events
    space: ' ',
    up: 'ArrowUp',
    right: 'ArrowRight',
    down: 'ArrowDown',
    left: 'ArrowLeft',
  }

  // Helper function to grab all squares
  const getAllSquares = () => document.querySelectorAll('.square')

  // Populating the grid with rows and squares
  for (let n = 0; n < 5; n++) {
    // Creating the rows
    let row = document.createElement('div')
    document.querySelector('#grid').appendChild(row)
    row.classList.add('row')
    // Creating the squares
    for (let m = 0; m < 5; m++) {
      let square = document.createElement('div')
      square.classList.add('square')
      row.appendChild(square)
      square.addEventListener('click', (event) => {
        // 👉 TASK 2 - Use a click handler to target a square 👈
        document.querySelector('.targeted').classList.remove('targeted')
        event.currentTarget.classList.add('targeted')
      })
    }
  }
  document.querySelector('.row:nth-child(3)')
    .children[2].classList.add('targeted') // Initial square being targeted

  // Helper function to obtain 5 random indices (0-24) to put mosquitoes in
  function generateRandomIntegers() {
    let randomInts = []
    while (randomInts.length < 5) {
      let randomInt = Math.floor(Math.random() * 25)
      if (!randomInts.includes(randomInt)) {
        randomInts.push(randomInt)
      }
    }
    return randomInts
  }
  let allSquares = getAllSquares()
  generateRandomIntegers().forEach(randomInt => { // Puts live mosquitoes in 5 random squares
    let mosquito = document.createElement('img')
    mosquito.src = './mosquito.png'
    mosquito.style.transform = `rotate(${Math.floor(Math.random() * 359)}deg) scale(${Math.random() * 0.4 + 0.8})`
    mosquito.dataset.status = 'alive'
    allSquares[randomInt].appendChild(mosquito)
  })

  document.addEventListener('keydown', evt => {
    // 👉 TASK 3 - Use the arrow keys to highlight a new square 👈
    if (evt.key == keys.up) {
      const lastTarget = document.querySelector('.targeted')
      try {
        const nextTarget = lastTarget.parentElement.previousElementSibling
          .querySelector(`div:nth-child(${[].slice.call(lastTarget.parentElement.children).findIndex(e => e.classList.contains('targeted'))+1})`)
        lastTarget.classList.remove('targeted')
        nextTarget.classList.add('targeted')
      } catch (e) {
        return
      }
    }
    if (evt.key == keys.down) {
      const lastTarget = document.querySelector('.targeted')
      try {
        const nextTarget = lastTarget.parentElement.nextElementSibling
          .querySelector(`div:nth-child(${[].slice.call(lastTarget.parentElement.children).findIndex(e => e.classList.contains('targeted'))+1})`)
        lastTarget.classList.remove('targeted')
        nextTarget.classList.add('targeted')
      } catch (e) {
        return
      }
    }
    if (evt.key == keys.left) {
      const lastTarget = document.querySelector('.targeted')
      try {
        const nextTarget = lastTarget.previousElementSibling.classList
        lastTarget.classList.remove('targeted')
        nextTarget.add('targeted')
      } catch (e) {
        return
      }
    }
    if (evt.key == keys.right) {
      const lastTarget = document.querySelector('.targeted')
      try {
        const nextTarget = lastTarget.nextElementSibling.classList
        lastTarget.classList.remove('targeted')
        nextTarget.add('targeted')
      } catch (e) {
        return
      }
    }
    // 👉 TASK 4 - Use the space bar to exterminate a mosquito 👈
    if (evt.key == keys.space) {
      document.querySelector('.targeted').firstChild.setAttribute('data-status', 'dead')
      document.querySelector('.targeted').setAttribute('style', 'background-color: red')
      // 👉 TASK 5 - End the game 👈
      if (document.querySelectorAll("img[data-status='alive']").length < 1) {
        document.querySelector('p.info').textContent = `Extermination completed in ${Math.floor(getTimeElapsed()*0.001)} seconds!`
        let restart = document.createElement('button')
        restart.textContent = 'Restart'
        document.querySelector('h2').append(restart)
        document.querySelector('h2 button').addEventListener('click', evt => {
          location.reload()
        })
      }
    }
  })
  // 👆 WORK WORK ABOVE THIS LINE 👆
}

// ❗ DO NOT MODIFY THE CODE BELOW
// ❗ DO NOT MODIFY THE CODE BELOW
// ❗ DO NOT MODIFY THE CODE BELOW
if (typeof module !== 'undefined' && module.exports) module.exports = { moduleProject2 }
else moduleProject2()
