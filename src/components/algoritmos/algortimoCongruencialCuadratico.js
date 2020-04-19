import React, { useState } from 'react'
import TitleBar from '../TitleBar/TitleBar';

const AlgoritmoCongruencialCuadratico = () => {
    let [d, setD] = useState(0);
    let [seed, setSeed] = useState(0)
    let [a, setA] = useState(0);
    let [b, setB] = useState(0);
    let [c, setC] = useState(0);
    let [m, setM] = useState(0);
    let [amount, setAmount] = useState(0);
    let [generatedNums, setGeneratedNums] = useState([]);

    const getNumsObj = (b, c, a, x2, x1, divR, r) => {
        return {
            b,
            c,
            x1,
            a,
            x2,
            divR,
            r
        };
    };

    const generateNums = () => {
        let tempArr = [];
        let tempY = ((a * Math.pow(seed, 2) + b * seed) + c) % m;
        tempArr.push(getNumsObj(b, c, a, tempY, tempY, `${tempY}/${m - 1}`, (tempY / (m - 1)).toFixed(d)));
        for (let i = 1; i < amount; i++) {
            tempY = ((a * Math.pow(tempArr[i - 1].x2, 2) + b * tempArr[i - 1].x2) + c) % m;
            tempArr.push(getNumsObj(b, c, a, tempY, tempY, `${tempY}/${m - 1}`, (tempY / (m - 1)).toFixed(d)));
        }
        console.log(tempArr)
        setGeneratedNums(tempArr);
    }

    return (
        <div className="container">

            <TitleBar title="Algoritmo Congruencial Cuadratico" />

            <div className='form-group'>
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon1">d: </span>
                    </div>
                    <input id='semilla' type='number' value={d} onChange={(e) => setD(e.target.value)} />
                    <div className="input-group-append">
                        <span className="input-group-text" id="basic-addon2">decimales</span>
                    </div>
                </div>

                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon1">A: </span>
                    </div>
                    <input id='semilla' type='number' value={a} onChange={(e) => setA(e.target.value)} />
                    <div className="input-group-append">
                        <span className="input-group-text" id="basic-addon2">...</span>
                    </div>
                </div>

                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon1">B: </span>
                    </div>
                    <input id='semilla' type='number' value={b} onChange={(e) => setB(e.target.value)} />
                    <div className="input-group-append">
                        <span className="input-group-text" id="basic-addon2">...</span>
                    </div>
                </div>

                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon1">C: </span>
                    </div>
                    <input id='semilla' type='number' value={c} onChange={(e) => setC(parseInt(e.target.value))} />
                    <div className="input-group-append">
                        <span className="input-group-text" id="basic-addon2">...</span>
                    </div>
                </div>

                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon1">M: </span>
                    </div>
                    <input id='semilla' type='number' value={m} onChange={(e) => setM(e.target.value)} />
                    <div className="input-group-append">
                        <span className="input-group-text" id="basic-addon2">modulus</span>
                    </div>
                </div>

                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon1">Xo: </span>
                    </div>
                    <input id='semilla' type='number' value={seed} onChange={(e) => setSeed(e.target.value)} />
                    <div className="input-group-append">
                        <span className="input-group-text" id="basic-addon2">valor inicial</span>
                    </div>
                </div>

                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon1">N: </span>
                    </div>
                    <input id='generar' type='number' value={amount} onChange={(e) => setAmount(e.target.value)} />
                    <div className="input-group-append">
                        <span className="input-group-text" id="basic-addon2">limite de numeros</span>
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
                            <th scope="col">Xi</th>
                            <th scope="col">R</th>
                            <th scope="col">ri</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            generatedNums.map((e, k) => {
                                return (
                                    <tr scope="row" key={k}>
                                        <td>{k + 1}</td>
                                        <td>{e.x1}</td>
                                        <td>{e.divR}</td>
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

export default AlgoritmoCongruencialCuadratico