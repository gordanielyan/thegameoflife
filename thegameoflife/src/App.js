import Life from './Life';
import './App.css';
import {useEffect, useState} from "react";
let table
let timeoutHandler
function App() {
    let [rows, cols] = [20, 20]
    const [board, setBoard] = useState(()=>createTable(rows, cols))
    const [ticking, setTicking] = useState(false)
    let runGame = () => {
        setTicking(true);
        createNewGen();
    }
    let stopGame = () => {
        setTicking( false);
        if (timeoutHandler) {
            window.clearTimeout(timeoutHandler);
            timeoutHandler = null;
        }
    }

    function runOrPause() {
    	!ticking ? runGame() : stopGame()
    	setTicking(!ticking)
    }

    function neighbour(a, i, j) {
        let k = 0;
        for (let index = -1; index <= 1; index++) {
            for (let index2 = -1; index2 <= 1; index2++) {
                let col = (i + index + cols) % cols;
                let row = (j + index2 + rows) % rows;
                k += a[col][row];
            }
        }
        k -= a[i][j];
        return k;
    }
    function newGeneration(a) {
        let b = Array(rows).fill(0).map(i => {
            return Array(cols).fill(0)
        });
        for (let i = 0; i < a.length; i++) {
            for (let j = 0; j < a[i].length; j++) {
                if (neighbour(a, i, j) === 3)
                    b[i][j] = 1;
                if (neighbour(a, i, j) < 2 || neighbour(a, i, j) > 3)
                    b[i][j] = 0;
                if (neighbour(a, i, j) === 2)
                    b[i][j] = a[i][j];
            }
        }
        return b;
    }

    function createNewGen(){
        let elements = []
        console.table(table)
        table = newGeneration(table)
        table.forEach((i, iInd) => {
                i.forEach((j, jInd) => elements.push(<button {...{className: j === 1 ? 'alive' : 'dead'}}
                                                             onClick={() => changeState(iInd, jInd)}/>))
                elements.push(<br/>)
            }
        )
        setBoard(elements)
        console.table(table)
        timeoutHandler = window.setTimeout(() => {
            createNewGen();
        }, 500);
    }

    function changeState(iI, jJ) {
        table[iI][jJ] = Number(!table[iI][jJ])
        let elements = []
        table.forEach((i, iInd) => {
                i.forEach((j, jInd) => elements.push(<button {...{className: j === 1 ? 'alive' : 'dead'}}
                                                             onClick={() => {changeState(iInd, jInd)}}/>))
                elements.push(<br/>)
            }
        )
        setBoard(elements)
    }

    function createTable(rows, cols) {
    	console.log('this should be seen once')
        let elements = []
        table = Array(rows).fill(0).map(i => {
            return Array(cols).fill(0)
        })
        table = table.map(i => {
            i = i.map(j => {
                return Math.round(Math.random())
            })
            return i
        })
        /*table[1 + 1][1 - 1] = 1;
        table[1 + 1][1] = 1;
        table[1 + 1][1 + 1] = 1;
        table[1][1 + 1] = 1;
        table[1 - 1][1] = 1;*/
        table.forEach((i, iInd) => {
            i.forEach((j, jInd) => elements.push(<button {...{className: j === 1 ? 'alive' : 'dead'}} onClick={() => {
                changeState(iInd, jInd)
            }}/>))
            elements.push(<br/>)
        })
        return elements
    }

    return (
        <div className="App">
        	<div className="board">
            {board}
            </div>
            <button className='control' onClick={() => runOrPause()}>{ticking ? 'Pause' : 'Play'}</button>
            {/*{<button className='control' onClick={() => runGame()}>resume</button>}*/}
        </div>
    );
}

export default App;
