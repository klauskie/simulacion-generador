import React, { useState } from 'react'
import TitleBar from '../TitleBar/TitleBar';

const AlgoritmoCongruencialMultiplicativo = () => {
    let [d, setD] = useState(0);
    let [seed, setSeed] = useState(0)
    let [a, setA] = useState(0);
    let [m, setM] = useState(0);
    let [amount, setAmount] = useState(0);
    let [generatedNums, setGeneratedNums] = useState([]);

    const getNumsObj = (y, a, x, divR, r) => {
        return {
            y,
            a,
            x,
            divR,
            r
        };
    };

    const generateNums = () => {
        let tempArr = [];
        let tempY = ((a * seed)) % m;
        tempArr.push(getNumsObj(tempY, a, seed, `${tempY}/${m - 1}`, (tempY / (m - 1)).toFixed(d)));
        for (let i = 1; i < amount; i++) {
            tempY = (a * tempArr[i - 1].y) % m;
            tempArr.push(getNumsObj(tempY, a, tempArr[i - 1].y, `${tempY}/${m - 1}`, (tempY / (m - 1)).toFixed(d)));
        }
        console.log(tempArr)
        setGeneratedNums(tempArr);
    }

    return (
        <div className="container">

            <TitleBar title="Algoritmo Algoritmo Congruencial Multiplicativo" />

            <div className='form-group'>

                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon1">M: </span>
                    </div>
                    <input type='number' value={m} onChange={(e) => setM(e.target.value)} />
                    <div className="input-group-append">
                        <span className="input-group-text" id="basic-addon2">modulus</span>
                    </div>
                </div>

                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon1">A: </span>
                    </div>
                    <input type='number' value={a} onChange={(e) => setA(e.target.value)} />
                    <div className="input-group-append">
                        <span className="input-group-text" id="basic-addon2">1 + 4k</span>
                    </div>
                </div>

                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon1">d: </span>
                    </div>
                    <input type='number' value={d} onChange={(e) => setD(e.target.value)} />
                    <div className="input-group-append">
                        <span className="input-group-text" id="basic-addon2">decimales</span>
                    </div>
                </div>

                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon1">Xo: </span>
                    </div>
                    <input type='number' value={seed} onChange={(e) => setSeed(e.target.value)} />
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
                            <th scope="col">Xi-1</th>
                            <th scope="col">Xi</th>
                            <th scope="col">Process</th>
                            <th scope="col">ri</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            generatedNums.map((e, k) => {
                                return (
                                    <tr scope="row" key={k}>
                                        <td>{k + 1}</td>
                                        <td>{e.x}</td>
                                        <td>{e.y}</td>
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

export default AlgoritmoCongruencialMultiplicativo