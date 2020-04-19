import React, { useState, useEffect } from 'react'
import { standardNormalTable } from 'simple-statistics'
import TitleBar from '../TitleBar/TitleBar';

const PruebaMedias = () => {
    let [c, setC] = useState('')
    let [numbersCSVString, setNumbersCSVString] = useState('');
    let [numbers, setNumbers] = useState([]);
    let [acepta, setAcepta] = useState(false);
    let [testRun, setTestRun] = useState(false);
    let [media, setMedia] = useState(0);
    let [alpha, setAlpha] = useState(0);
    let [limitI, setLimitI] = useState(0.0);
    let [limitS, setLimitS] = useState(0.0);
    let [display, setDisplay] = useState(false);

    useEffect(() => {
        let temp = (alpha * .01) / (Math.pow(12 * numbers.length, .5));

        setLimitI(.5 - temp);
        setLimitS(.5 + temp);
    }, [alpha])


    const getMessage = () => {
        if (display) {
            if (limitI < media && limitS > media) {
                return "No se puede rechazar Ho"
            } else {
                return "Se rechaza Ho"
            }
        }
    }

    const inputToList = () => {
        let cleanedList = numbersCSVString.split(',').map((x) => {
            return x.trim()
        })
        standardNormalTable.forEach((val, index) => {
            if (val === 1 - (parseFloat(c) / 2)) {
                setAlpha(index)
            }
        });
        return cleanedList
    }

    const calculateMed = () => {
        let list = inputToList()
        setNumbers(list)
        if (list.length > 0) {
            let sum = list.reduce((prev, curr) => {
                return (Number(prev) + Number(curr)).toFixed(4)
            })
            setMedia(sum / list.length)
        }
        return list
    }

    const calculate = () => {
        let list = calculateMed()
        setDisplay(true)
    }

    return (
        <div className="container">

            <TitleBar title="Prueba de Medias" />

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

            {display &&
                <div className="row">
                    <table className='table'>
                        <thead>
                            <tr>
                                <th scope="col">Tamaño</th>
                                <th scope="col">Li</th>
                                <th scope="col">Ls</th>
                                <th scope="col">ri^</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{numbers.length}</td>
                                <td>{limitI.toFixed(4)}</td>
                                <td>{limitS.toFixed(4)}</td>
                                <td>{media.toFixed(4)}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            }
        </div>
    )
}

export default PruebaMedias

// 0.0449,0.1733,0.5746,0.049,0.8406,0.849,0.92,0.2564,0.6015,0.6694,0.3972,0.7025,0.1055,0.1247,0.1977,0.0125,0.63,0.2531,0.8297,0.6483,0.6972,0.9582,0.9085,0.8524,0.5514,0.0316,0.3587,0.7041,0.5915,0.2523,0.2545,0.3044,0.0207,0.1067,0.3857,0.1746,0.3362,0.1589,0.3727,0.4145