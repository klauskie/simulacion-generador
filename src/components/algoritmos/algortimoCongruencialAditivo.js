import React, { useState, useEffect } from 'react'
import TitleBar from '../TitleBar/TitleBar';

const AlgoritmoCongruencialAditivo = () => {
    let [d, setD] = useState(0);
    let [seeds, setSeeds] = useState([])
    let [m, setM] = useState(0);
    let [amount, setAmount] = useState(0);
    let [generatedNums, setGeneratedNums] = useState([]);

    const getNumsObj = (xi, xi_n, xi_1, divR, r) => {
        return {
            xi,
            xi_n,
            xi_1,
            divR,
            r
        };
    };

    const inputToList = (rawList) => {
        let cleanedList = rawList.split(',').map((x) => {
            return x.trim() * 1
        })
        setSeeds(cleanedList)
    }

    const generateNums = () => {
        let tempArr = [];
        let tempY;
        let tempSeeds = [...seeds]
        let n = seeds.length

        for (let i = 0; i < amount; i++) {
            console.log(`${tempSeeds[i]} ${tempSeeds[i + n - 1]} ${n}`)
            tempY = (tempSeeds[i] + tempSeeds[i + n - 1]) % m;
            tempSeeds.push(tempY);
            tempArr.push(getNumsObj(tempY, tempSeeds[i], tempSeeds[i + n - 1], `${tempY}/${m - 1}`, (tempY / (m - 1)).toFixed(d)));
            console.log(tempArr);
            console.log(tempSeeds)
        }
        setGeneratedNums(tempArr);
    }

    return (
        <div className="container">

            <TitleBar title="Algoritmo Algoritmo Congruencial Aditivo" />

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
                        <span className="input-group-text" id="basic-addon1">d: </span>
                    </div>
                    <input type='number' value={d} onChange={(e) => setD(e.target.value)} />
                    <div className="input-group-append">
                        <span className="input-group-text" id="basic-addon2">decimales</span>
                    </div>
                </div>

                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon1">Xo - Xn: </span>
                    </div>
                    <textarea id="list" onChange={(e) => inputToList(e.target.value)} />
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
                            <th scope="col">Xi</th>
                            <th scope="col">Xi-1</th>
                            <th scope="col">Xi-n</th>
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
                                        <td>{e.xi}</td>
                                        <td>{e.xi_1}</td>
                                        <td>{e.xi_n}</td>
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

export default AlgoritmoCongruencialAditivo