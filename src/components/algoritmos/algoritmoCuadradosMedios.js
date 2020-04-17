import React, { useState, useEffect } from 'react'
import modifyNums from '../../util/algorithmFunctions'
import TitleBar from '../TitleBar/TitleBar';


const AlgoritmoCuadradosMedios = () => {
    let [d, setD] = useState(3);
    let [seed, setSeed] = useState(100);
    let [amount, setAmount] = useState(0);
    let [generatedNums, setGeneratedNums] = useState([]);
    useEffect(() => {
        let seedLength = seed.toString().length;
        if (d !== seedLength && seedLength > 3 && seedLength < 7) {
            setD(seedLength);
        }
    }, [seed])
    const getNumsObj = (y, x, r) => {
        return {
            y,
            x,
            r
        };
    };
    const generateNums = () => {
        let tempArr = [];
        let seedSquare = Math.pow(seed, 2);
        let middleSeedValues = modifyNums.getMiddleValues(seedSquare, d);
        tempArr.push(getNumsObj(seedSquare, middleSeedValues, modifyNums.transformToR(middleSeedValues, d)));
        for (let i = 1; i < amount; i++) {
            seedSquare = Math.pow(tempArr[i - 1].x, 2);
            middleSeedValues = modifyNums.getMiddleValues(seedSquare, d);
            tempArr.push(getNumsObj(seedSquare, middleSeedValues, modifyNums.transformToR(middleSeedValues, d)));
        }
        setGeneratedNums(tempArr);
    }

    return (
        <div className="container">

            <TitleBar title="Algoritmo Cuadrados Medios" />

            <div className='form-group'>
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon1">Seed</span>
                    </div>
                    <input id='semilla' type='number' min='100' max='999999' value={seed} onChange={(e) => setSeed(e.target.value)} />
                </div>

                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon1">Limite de numeros a generar</span>
                    </div>
                    <input id='generar' type='number' value={amount} onChange={(e) => setAmount(e.target.value)} />
                </div>

                <div className="input-group mb-3">
                    <div className='btn btn-primary' onClick={(e) => generateNums()}>Generar</div>
                </div>
            </div>

            <div className="row">
                <p>D: {d}</p>
                <table className='table table-bordered'>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Y</th>
                            <th>X</th>
                            <th>R</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            generatedNums.map((e, k) => {
                                return (
                                    <tr scope="row" key={k + 1}>
                                        <td>{k}</td>
                                        <td>{e.y}</td>
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

export default AlgoritmoCuadradosMedios