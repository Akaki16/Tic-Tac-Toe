'use strict';

// players scores
const scores = {
    first: 0,
    second: 0
};

const displayController = (() => {

    const _playGameBtn = document.querySelector('.play-btn');
    const _returnBtn = document.querySelector('.return-btn');
    const _players = document.querySelectorAll('.player > h2');
    const _scores = document.querySelectorAll('.score');
    const [ first, second ] = _players;
    const [ firstScore, secondScore ] = _scores;

    const _name1 = document.getElementById('name1');
    const _name2 = document.getElementById('name2');

    const _displayGame = (modal) => {
        _displayNames();
        if (_name1.value !== '' && _name2.value !== '') {
            modal.style.display = 'none';
            _showNamesInGame();
        }
    }

    const _displayNameFields = () => {
        const names = document.getElementById('names');

        if (names.classList.contains('d-none')) {
            names.classList.remove('d-none');
            names.classList.add('d-block');
        } else if (names.classList.contains('d-block')) {
            names.classList.remove('d-block');
            names.classList.add('d-none');
        }

    }

    const _displayNames = () => {
        const name1Txt = document.querySelector('.name1');
        const name2Txt = document.querySelector('.name2');
        _name1.addEventListener('keyup', e => {
            name1Txt.innerHTML = `${e.target.value}`;
        });
        _name2.addEventListener('keyup', e => {
            name2Txt.innerHTML = `${e.target.value}`;
        });
    }

    const _showNamesInGame = () => {
        first.innerHTML = `<i class="fas fa-user-check"></i> ${_name1.value}`;
        second.innerHTML = `${_name2.value} <i class="fas fa-user-check"></i>`;
    }

    const _clear = () => {
        first.innerHTML = '';
        second.innerText = '';
        // reset scores
        scores.first = 0;
        scores.second = 0;
        firstScore.textContent = scores.first;
        secondScore.textContent = scores.second;
        // clear all spots on the board
        document.querySelectorAll('.box').forEach((box) => {
            box.innerText = '';
            box.style.backgroundColor = 'lightgray';
        });
    }

    const _loadHomepage = (modal) => {
        modal.style.display = 'block';
        _clear();
    }

    return {
        playGameBtn: _playGameBtn,
        returnBtn: _returnBtn,
        loadHomepage: _loadHomepage,
        displayGame: _displayGame,
        displayNameFields: _displayNameFields,
    }

})();

const gameBoard = (() => {

    const _generateGameBoard = (rows) => {
        const board = document.getElementById('board');
        for (let i = 0; i < rows; i++) {
            const box = document.createElement('button');
            box.classList.add(`box`, `box-${i}`);
            board.appendChild(box);
        }
    }

    return {
        generateGameBoard: _generateGameBoard
    }

})();

const Game = (() => {

    const _scores = document.querySelectorAll('.score');
    const _players = document.querySelectorAll('.player > h2');

    const [ firstName, secondName ] = _players;
    const [ firstScore, secondScore ] = _scores;

    // this state variable determines that to put X on the board if it is 1 and if it is 2 put O on the board 
    let _active = 1;

    const _board = {
        move(target) {
            if (_active === 1) {
                target.target.innerText = 'X';
                _disableMoving(target);
                _active = 2;
                _checkWinner(
                    document.querySelector('.box-0'),
                    document.querySelector('.box-1'),
                    document.querySelector('.box-2')
                );
                _checkWinner(
                    document.querySelector('.box-3'),
                    document.querySelector('.box-4'),
                    document.querySelector('.box-5')
                );
                _checkWinner(
                    document.querySelector('.box-6'),
                    document.querySelector('.box-7'),
                    document.querySelector('.box-8')
                );
                _checkWinner(
                    document.querySelector('.box-0'),
                    document.querySelector('.box-4'),
                    document.querySelector('.box-8')
                );
                _checkWinner(
                    document.querySelector('.box-6'),
                    document.querySelector('.box-4'),
                    document.querySelector('.box-2')
                );
                _checkWinner(
                    document.querySelector('.box-0'),
                    document.querySelector('.box-3'),
                    document.querySelector('.box-6')
                );
                _checkWinner(
                    document.querySelector('.box-1'),
                    document.querySelector('.box-4'),
                    document.querySelector('.box-7')
                );
                _checkWinner(
                    document.querySelector('.box-2'),
                    document.querySelector('.box-5'),
                    document.querySelector('.box-8')
                );
            } else {
                target.target.innerText = 'O';
                _disableMoving(target);
                _active = 1;
                _checkWinner(
                    document.querySelector('.box-0'),
                    document.querySelector('.box-1'),
                    document.querySelector('.box-2')
                );
                _checkWinner(
                    document.querySelector('.box-3'),
                    document.querySelector('.box-4'),
                    document.querySelector('.box-5')
                );
                _checkWinner(
                    document.querySelector('.box-6'),
                    document.querySelector('.box-7'),
                    document.querySelector('.box-8')
                );
                _checkWinner(
                    document.querySelector('.box-0'),
                    document.querySelector('.box-4'),
                    document.querySelector('.box-8')
                );
                _checkWinner(
                    document.querySelector('.box-6'),
                    document.querySelector('.box-4'),
                    document.querySelector('.box-2')
                );
                _checkWinner(
                    document.querySelector('.box-0'),
                    document.querySelector('.box-3'),
                    document.querySelector('.box-6')
                );
                _checkWinner(
                    document.querySelector('.box-1'),
                    document.querySelector('.box-4'),
                    document.querySelector('.box-7')
                );
                _checkWinner(
                    document.querySelector('.box-2'),
                    document.querySelector('.box-5'),
                    document.querySelector('.box-8')
                );
            }
        },
        clearSpots() {
            document.querySelectorAll('.box').forEach((box) => {
                box.innerText = '';
                box.style.backgroundColor = 'lightgray';
                box.disabled = false;
                // return to old state
                _active = 1;
            });
        },
        clearBtn: document.querySelector('.clear-btn')
    };

    const _disableMoving = (target) => {
        target.target.disabled = true;
    }

    const _setBoxColor = (box1, box2, box3, color) => {
        box1.style.backgroundColor = color;
        box2.style.backgroundColor = color;
        box3.style.backgroundColor = color;
    }

    const _checkWinner = (box1, box2, box3) => {
        if (box1.innerText === 'X' && box2.innerText === 'X' && box3.innerText === 'X') {
            _setBoxColor(box1, box2, box3, 'rgb(101, 177, 152)');
            scores.first++;
            firstScore.textContent = `${firstName.innerText} holds ${scores.first}`;
            // disable moving on all spots
            document.querySelectorAll('.box').forEach((box) => {
                box.disabled = true;
            });
        } else if (box1.innerText === 'O' && box2.innerText === 'O' && box3.innerText === 'O') {
            _setBoxColor(box1, box2, box3, 'rgb(101, 177, 152)');
            scores.second++;
            secondScore.textContent = `${secondName.innerText} holds ${scores.second}`;
            // disable moving on all spots
            document.querySelectorAll('.box').forEach((box) => {
                box.disabled = true;
            });
        }
    }

    return {
        board: _board,
        firstScore: firstScore,
        secondScore: secondScore,
    }

})();

// display game
displayController.playGameBtn.addEventListener('click', () => {
    displayController.displayNameFields();
    displayController.displayGame(document.getElementById('modal'));
});

// generate game board
gameBoard.generateGameBoard(9);

// play a game
document.querySelectorAll('.box').forEach((box) => {
    box.addEventListener('click', e => {
        Game.board.move(e);
    });
});

// clear all spots on the board
Game.board.clearBtn.addEventListener('click', () => {
    Game.board.clearSpots();
});

// Go to homepage
displayController.returnBtn.addEventListener('click', () => {
    displayController.loadHomepage(document.getElementById('modal'));
});
