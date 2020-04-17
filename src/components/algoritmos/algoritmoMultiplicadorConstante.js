import React, { useState, useEffect } from 'react'
import modifyNums from '../../util/algorithmFunctions'
import TitleBar from '../TitleBar/TitleBar';

const AlgoritmoMultiplicadorConstante = () => {
    let [d, setD] = useState(3);
    let [seed, setSeed] = useState(100);
    let [a, setA] = useState(100);
    let [amount, setAmount] = useState(0);
    let [generatedNums, setGeneratedNums] = useState([]);
    let [unvalidA, setUnvalidA] = useState(false);
    useEffect(() => {
        let seedLength = seed.toString().length;
        if (d !== seedLength && seedLength > 3 && seedLength < 7) {
            setD(seedLength);
        }
    }, [seed, a])
    const getNumsObj = (y, a, x, r) => {
        return {
            y,
            a,
            x,
            r
        };
    };

    const generateNums = () => {
        if (a.toString().length != d) {
            setUnvalidA(true);
        } else {
            setUnvalidA(false);
            let tempArr = [];
            let seedProduct = a * seed;
            let middleSeedValues = modifyNums.getMiddleValues(seedProduct, d);
            tempArr.push(getNumsObj(seedProduct, a, middleSeedValues, modifyNums.transformToR(middleSeedValues, d)));
            for (let i = 1; i < amount; i++) {
                seedProduct = a * tempArr[i - 1].x;
                middleSeedValues = modifyNums.getMiddleValues(seedProduct, d);
                tempArr.push(getNumsObj(seedProduct, a, middleSeedValues, modifyNums.transformToR(middleSeedValues, d)));
            }
            console.log(tempArr)
            setGeneratedNums(tempArr);
        }
    }

    return (
        <div className="container">

            <TitleBar title="Algoritmo Multiplicador Constante" />

            <div className='form-group'>
                {
                    unvalidA ? <div class="alert alert-danger" role="alert">
                        La constante y la semilla deben de medir lo mismo
                    </div> : ''
                }
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon1">Semilla 0: </span>
                    </div>
                    <input id='semilla' type='number' min='100' max='999999' value={seed} onChange={(e) => setSeed(e.target.value)} />
                </div>

                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon1">Constante: </span>
                    </div>
                    <input id='semilla' type='number' min='100' max='999999' value={a} onChange={(e) => setA(e.target.value)} />
                </div>

                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon1">N: </span>
                    </div>
                    <input id='generar' type='number' value={amount} onChange={(e) => setAmount(e.target.value)} />
                    <div className="input-group-append">
                        <span className="input-group-text" id="basic-addon2">limite de la lista</span>
                    </div>
                </div>
                <div className="input-group mb-3">
                    <div className='btn btn-primary' onClick={(e) => generateNums()}>Generar</div>
                </div>
            </div>
            <div className='row'>
                <p>D: {d}</p>
                <table className='table table-bordered'>
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Y</th>
                            <th scope="col">A</th>
                            <th scope="col">X</th>
                            <th scope="col">R</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            generatedNums.map((e, k) => {
                                return (
                                    <tr scope="row" key={k}>
                                        <td>{k + 1}</td>
                                        <td>{e.y}</td>
                                        <td>{e.a}</td>
                                        <td>{e.x}</td>
                                        <td>{e.r}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default AlgoritmoMultiplicadorConstante