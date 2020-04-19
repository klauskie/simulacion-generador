import React, { useEffect, useState } from 'react'
import chiSquareInverse from 'inv-chisquare-cdf'
import TitleBar from '../TitleBar/TitleBar';

const PruebaUnidormidadChiCuadrada = () => {
    let [c, setC] = useState('');
    let [n, setN] = useState(0);
    let [m, setM] = useState(0);
    let [numbersCSVString, setNumbersCSVString] = useState('');
    let [numbers, setNumbers] = useState([]);
    let [acepta, setAcepta] = useState(false);
    let [testRun, setTestRun] = useState(false);
    let [chiSum, setChiSum] = useState(0);
    let [alpha, setAlpha] = useState(0.05);
    let [chiValue, setChiValue] = useState(0);
    let [testTable, setTestTable] = useState([]);
    let [display, setDisplay] = useState(false);

    const getObject = (interval, oi, ei, eioiei) => {
        return {
            interval,
            oi,
            ei,
            eioiei
        }
    }

    useEffect(() => {
        if (chiValue > chiSum) {
            setAcepta(true)
        }
        if (testTable.length > 0)
            setTestRun(true);
    }, [chiSum])

    useEffect(() => {
        let degreeFreed = m > 2 ? m - 1 : 1;
        setChiValue(chiSquareInverse.invChiSquareCDF(1 - alpha / 2, degreeFreed));
    }, [alpha, m])

    const getMessage = () => {
        if (display) {
            if (chiValue > chiSum) {
                return `No se puede rechazar Ho: Cálculo(${chiSum.toFixed(2)}) < Chi(${chiValue.toFixed(2)})`
            } else {
                return `Se rechaza Ho: Cálculo(${chiSum.toFixed(2)}) > Chi(${chiValue.toFixed(2)})... Nuestro calculo es mayor a Chi^2`
            }
        }
    }

    const inputToList = () => {
        let cleanedList = numbersCSVString.split(',').map((x) => {
            return x.trim()
        })
        setAlpha(parseFloat(c));
        setN(cleanedList.length);
        setM(Math.pow(cleanedList.length, .5));
        return cleanedList
    }

    const calculateUni = () => {
        let list = inputToList()
        setNumbers(list)

        let _n = list.length
        let _m = Math.pow(list.length, .5)

        if (list.length > 0) {
            let ei = _n / _m;
            let temp = [...testTable]
            let tempEi = [];
            for (let i = 0; i < _m; i++) {
                let oi = list.filter((e) => (e > (.1 * i) && e < (.1 * (i + 1)))).length
                let eioisquaredei = Math.pow(ei - oi, 2) / ei
                temp.push(getObject(`[${.01 * i}-${.01 * (i + 1)}]`, oi, ei, eioisquaredei));
                tempEi.push(eioisquaredei);
            }
            setTestTable(temp)
            setChiSum(tempEi.reduce((prev, curr) => prev + curr));
        }
    }

    const calculate = () => {
        calculateUni()
        setDisplay(true)
    }

    return (
        <div className="container">
            <TitleBar title="Prueba de Uniformidad Chi-Cuadrada" />
            <div className='form-group'>
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon1">Alpha: </span>
                    </div>
                    <input id='semilla' type='text' value={c} onChange={(e) => setC(e.target.value)} />
                    <div className="input-group-append">
                        <span className="input-group-text" id="basic-addon2">nivel de confianza</span>
                    </div>
                </div>

                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon1">Input: </span>
                    </div>
                    <textarea id="list" onChange={(e) => setNumbersCSVString(e.target.value)} />
                    <div className="input-group-append">
                        <span className="input-group-text" id="basic-addon2">CSV</span>
                    </div>
                </div>

                <div className="input-group mb-3">
                    <div className='btn btn-primary' onClick={(e) => calculate()}>Generar</div>
                </div>
            </div>
            <div className="row">
                <p>{getMessage()}</p>
            </div>
            {
                display &&
                <div>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">i</th>
                                <th scope="col">Oi</th>
                                <th scope="col">Ei = n/m</th>
                                <th scope="col">(Ei-Oi)^2/Ei</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                testTable.map((e) => {
                                    {
                                        return (
                                            <tr>
                                                <td>{e.interval}</td>
                                                <td>{e.oi}</td>
                                                <td>{e.ei}</td>
                                                <td>{e.eioiei}</td>
                                            </tr>
                                        )
                                    }
                                })
                            }
                        </tbody>
                    </table>

                </div>
            }
        </div>
    )
}

export default PruebaUnidormidadChiCuadrada

/*

0.347,
0.832,
0.966,
0.472,
0.797,
0.101,
0.696,
0.966,
0.404,
0.603,
0.993,
0.371,
0.729,
0.067,
0.189,
0.977,
0.843,
0.562,
0.549,
0.992,
0.674,
0.628,
0.055,
0.494,
0.494,
0.235,
0.178,
0.775,
0.797,
0.252,
0.426,
0.054,
0.022,
0.742,
0.674,
0.898,
0.641,
0.674,
0.821,
0.19,
0.46,
0.224,
0.99,
0.786,
0.393,
0.461,
0.011,
0.977,
0.246,
0.881,
0.189,
0.753,
0.73,
0.797,
0.292,
0.876,
0.707,
0.562,
0.562,
0.821,
0.112,
0.191,
0.584,
0.347,
0.426,
0.057,
0.819,
0.303,
0.404,
0.64,
0.37,
0.314,
0.731,
0.742,
0.213,
0.472,
0.641,
0.944,
0.28,
0.663,
0.909,
0.764,
0.999,
0.303,
0.718,
0.933,
0.056,
0.415,
0.819,
0.444,
0.178,
0.516,
0.437,
0.393,
0.268,
0.123,
0.945,
0.527,
0.459,
0.652


*/