import React, { useState, useEffect } from 'react'
import TitleBar from '../TitleBar/TitleBar';

const PruebaHuecos = () => {
    let [rawList, setRawList] = useState("");
    let [minInter, setMinInter] = useState(0);
    let [maxInter, setMaxInter] = useState(1);
    let [table, setTable] = useState([]);
    let [H, setH] = useState(0);
    let [estTotal, setEstTotal] = useState(0)
    let [display, setDisplay] = useState(false);
    const X2 = 11.07

    const calculate = () => {
        let list = inputToList()
        let normList = normalizeList(list)
        let table = fillTable(normList)

        setTable(table)
        setDisplay(true)
    }

    const inputToList = () => {
        let cleanedList = rawList.split(',').map((x) => {
            return x.trim()
        })
        return cleanedList
    }

    // agrega 1 si el numero esta dentro de los intervalos, 0 si no
    const normalizeList = (list) => {
        let newList = []
        list.forEach((x) => {
            if (minInter <= x && x <= maxInter) {
                newList.push(1)
            } else {
                newList.push(0)
            }
        })
        return newList
    }

    // llama a todos los metodos necesarios para llenar la tabla
    const fillTable = (list) => {
        let { firstTable, H } = getOi(list)
        setH(H)
        let table = getEi(firstTable, H)
        return getEstadistico(table)
    }

    // cuenta los hoyos con un tamaño dado
    const getOi = (list) => {
        console.log(list)
        let firstOne = list.indexOf(1)
        let H = 0
        let table = [
            { i: 0, oi: 0, ei: 0, f: 0 },
            { i: 1, oi: 0, ei: 0, f: 0 },
            { i: 2, oi: 0, ei: 0, f: 0 },
            { i: 3, oi: 0, ei: 0, f: 0 },
            { i: 4, oi: 0, ei: 0, f: 0 },
            { i: 5, oi: 0, ei: 0, f: 0 }
        ]
        for (let h = 0; h <= 5; h++) {
            let holes = 0
            for (let i = firstOne; i < list.length - 1; i++) {
                for (let k = i + 1; k < list.length; k++) {
                    if (list[k] === 1) {
                        if (list[i] === list[k]) {
                            if (h === holes) {
                                table[h].oi += 1
                                H++
                            } else if (h === 5 && holes >= 5) {
                                table[h].oi += 1
                                H++
                            }
                            i = k
                        }
                        holes = 0
                    } else {
                        holes++
                    }

                }
            }
        }
        return { firstTable: table, H: H }
    }

    // set values for the EI column
    const getEi = (table, H) => {
        table.forEach((obj) => {
            obj.ei = H * (maxInter - minInter).toFixed(1) * Math.pow((1 - (maxInter - minInter).toFixed(1)), obj.i)
        })
        return table
    }

    // set values for the Last column
    const getEstadistico = (table) => {
        let total = 0
        table.forEach((obj) => {
            obj.f = Math.pow((obj.ei - obj.oi), 2) / obj.ei
            total += obj.f
        })
        setEstTotal(total)
        return table
    }

    const getResultMessage = () => {
        if (display) {
            if (estTotal < X2) {
                return "No se puede rechazar la Ho: " + estTotal.toFixed(2) + " < " + X2
            } else {
                return "Se rechaza la Ho: " + + estTotal.toFixed(2) + " > " + X2
            }
        }
    }

    return (
        <div className="container">

            <TitleBar title="Prueba de Huecos" />

            <div className='form-group'>

                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon1">Intervalo 0: </span>
                    </div>
                    <input id='intervalo0' type='number' min='0' max='1' onChange={(e) => setMinInter(e.target.value * 1)} />
                    <div className="input-group-append">
                        <span className="input-group-text" id="basic-addon2">min 0</span>
                    </div>
                </div>

                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon1">Intervalo 1: </span>
                    </div>
                    <input id='intervalo1' type='number' min='0' max='1' onChange={(e) => setMaxInter(e.target.value * 1)} />
                    <div className="input-group-append">
                        <span className="input-group-text" id="basic-addon2">max 1</span>
                    </div>
                </div>

                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon1">Input: </span>
                    </div>
                    <textarea id="list" onChange={(e) => setRawList(e.target.value)} />
                    <div className="input-group-append">
                        <span className="input-group-text" id="basic-addon2">CSV</span>
                    </div>
                </div>

                <div className="input-group mb-3">
                    <div className='btn btn-primary' onClick={(e) => calculate()}>Generar</div>
                </div>
                <div className="row">
                    <p>{getResultMessage()}</p>
                </div>
            </div>

            {display &&
                <table className='table'>
                    <thead>
                        <tr>
                            <th scope="col">Tamaño Hueco</th>
                            <th scope="col">Oi</th>
                            <th scope="col">Ei</th>
                            <th scope="col">Estadistico</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            table.map((e) => {
                                return (
                                    <tr scope="row" key={e.i}>
                                        <td>{e.i}</td>
                                        <td>{e.oi}</td>
                                        <td>{e.ei.toFixed(3)}</td>
                                        <td>{e.f.toFixed(3)}</td>
                                    </tr>
                                )
                            })
                        }
                        <tr scope="row">
                            <td>TOTAL</td>
                            <td>H={H}</td>
                            <td>H={H}</td>
                            <td>{estTotal.toFixed(3)}</td>
                        </tr>
                    </tbody>
                </table>
            }
        </div>
    )
}

export default PruebaHuecos

/*
0.872,
0.950,
0.343,
0.058,
0.384,
0.219,
0.041,
0.036,
0.213,
0.946,
0.570,
0.842,
0.706,
0.809,
0.300,
0.618,
0.512,
0.462,
0.005,
0.203,
0.291,
0.151,
0.596,
0.443,
0.868,
0.913,
0.511,
0.586,
0.608,
0.879
*/