export const TicTacToe = {
  // Элемент с полями в дом дереве
  el: null,

  // Булевое значение закончилась ли игра
  isGameEnd: false,

  // Булевое значение
  // true если текущий ход у X
  // false если текущий ход у O
  isXTurn: true,

  // Матрица 3 на 3 с информацией о полях
  matrix: [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ],

  // массив победных комбинаций
  // состоит из массивов вида [row, col]
  // если все 3 значения равны, то игра окончена
  wonCombinations: [
    [[1, 1], [1, 2], [1, 3]],
    [[2, 1], [2, 2], [2, 3]],
    [[3, 1], [3, 2], [3, 3]],
    [[1, 1], [2, 2], [3, 3]],
    [[1, 3], [2, 2], [3, 1]],
    [[1, 1], [2, 1], [3, 1]],
    [[1, 2], [2, 2], [3, 2]],
    [[1, 3], [2, 3], [3, 3]],
  ],

  /**
   * Функция инициализации элементов и запуска игры
   * @returns {object} - текущий объект
   */
  init({el, onMove}) {
    this.el = el
    this.onMove = onMove
    this.boxes = el.querySelectorAll('.tic-tac-toe__ceil')
    
    return this
  },
  
  /**
   * Функция инициализации слушателей события клика по ячейке
   */
  initListeners() {
    this.boxes.forEach(box => {
      box.addEventListener('click', event => {
        // проверка не закончилась ли игра и не пустой ли блок
        if (
          this.isGameEnd || 
          !this.isBlockEmpty(event.target)
        ) {
          return
        }

        // изменение значения элемента в матрице
        this.setBlockValue(event.target)
        // изменение значения элемента в дом дереве
        this.setBlockDom(event.target)
        
        // проверка на победу
        if (this.checkForWin()) {
          // изменение статуса игры
          this.setGameEndStatus()
        }

        // проверка на наличие пустых блоков
        if (!this.checkHasEmptyBlocks()) {
          // изменение статуса игры
          this.setGameEndStatus()

          setTimeout(() => {
            alert('Конец игры')
          })
          return
        }

        // проверка статуса игры
        if (this.isGameEnd) {
          // вывод информации о победителе
          setTimeout(() => {
            alert('Победил ' + this.getCurrentTurnValue())
          })
        } else {
          // изменить значение текущего хода в объекте
          this.changeTurnValue()
          // изменить значение текущего хода в дом дереве
          if (this.onMove) {
            this.onMove(this.isXTurn)
          }
        }
      })
    })
  },

  /**
   * Проверка на наличие пустых блоков
   * @returns {boolean} - true если есть пустые блоки, false - если нет
   */
  // комментарии
  checkHasEmptyBlocks() {
    for (let i = 0; i < this.matrix.length; i++) {
      for (let j = 0; j < this.matrix[i].length; j++) {
        if (this.matrix[i][j] === null) {
          return true
        }
      }
    }

    return false
  },

  /**
   * Инициализация слушателя клика и вызов колбэка текущего хода
   */
  startGame() {
    this.initListeners()
    this.onMove(this.isXTurn)
  },

  /**
   * Сброс данных и очищение дом дерева
   */
  // комментарии
  restartGame() {
    for (let i = 0; i < this.boxes.length; i++){
      this.setBlockValue(this.boxes[i], true)
      this.setBlockDom(this.boxes[i], true)
    }

    this.isXTurn = true
    this.isGameEnd = false

    if (this.onMove) {
      this.onMove(this.isXTurn)
    }
  },
  
  /**
   * Проверка пустой ли блок
   * @param {HTMLDivElement} target - ячейка в дом дереве
   * @returns {boolean} - true если блок пустой
   */
  isBlockEmpty(target) {
    const [row, col] = this.getBlockPosition(target)
    
    return !this.matrix[row - 1][col - 1]
  },

  /**
   * Получение позиции блока из dataset
   * @param {HTMLDivElement} target - ячейка в дом дереве
   * @returns {array} - массив со строкой и колонкой target вида [row, col]
   */
  getBlockPosition(target) {
    const {row, col} = target.dataset
    
    return [row, col]
  },
  
  /**
   * Изменение значения элемента в матрице
   * Определяет значение [row, col] ячейки, после чего устанавливает
   * значение в матрице для соответствующего поля
   * @param {HTMLDivElement} target - ячейка в дом дереве
   * @param {boolean?} clear - если true - отчистить ячейку в матрице
   */
  // комментарии
  setBlockValue(target, clear) {
    const position = this.getBlockPosition(target)
    const row = position[0]
    const col = position[1]

    let value

    if (clear) {
      value = null
    } else {
      value = this.getCurrentTurnValue()
    }

    this.matrix[row - 1][col - 1] = value
  },

  /**
   * Изменение значения элемента в дом дереве
   * Определяет текущий ход, после чего устанавливает
   * значение в дом дереве
   * @param {HTMLDivElement} target - ячейка в дом дереве
   * @param {boolean?} clear - если true - отчистить target
   */
  // комментарии
  setBlockDom(target, clear) {
    let value

    if (clear) {
      value = ''
    } else {
      value = this.getCurrentTurnValue()
    }

    target.innerHTML = value
  },

  /**
   * Получение строки с текущем ходом
   * @returns {string} Текущий ход 'X' или 'O'
   */
  // комментарии
  getCurrentTurnValue() {
    if (this.isXTurn) {
      return 'X'
    } else {
      return 'O'
    }
  },

  /**
   * Изменение текущего хода в данных
   */
  // комментарии
  changeTurnValue() {
    this.isXTurn = !this.isXTurn
  },

  /**
   * Проверка победных комбинаций
   * @returns {boolean} - true если кто-то победил
   */
  checkForWin() {    
    for (let i = 0; i < this.wonCombinations.length; i++) {
      const [first, second, third] = this.wonCombinations[i]

      if (
        this.matrix[first[0] - 1][first[1] - 1] &&
        this.matrix[first[0] - 1][first[1] - 1] === this.matrix[second[0] - 1][second[1] - 1] &&
        this.matrix[third[0] - 1][third[1] - 1] === this.matrix[second[0] - 1][second[1] - 1]
      ) {
        return true
      }
    }

    return false
  },

  /**
   * Установить статус об окончании игры
   */
  // комментарии
  setGameEndStatus() {
    this.isGameEnd = true;
  }
}