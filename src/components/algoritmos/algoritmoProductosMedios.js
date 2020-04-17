import React, { useState, useEffect } from 'react'
import modifyNums from '../../util/algorithmFunctions'
import TitleBar from '../TitleBar/TitleBar';

const AlgoritmoProductosMedios = () => {
    let [d, setD] = useState(3);
    let [seed, setSeed] = useState(100);
    let [seed2, setSeed2] = useState(100);
    let [amount, setAmount] = useState(0);
    let [generatedNums, setGeneratedNums] = useState([]);
    useEffect(() => {
        let seedLength = seed.toString().length;
        let seed2Length = seed2.toString().length
        if (d !== seedLength && seedLength > 3 && seedLength < 7 && seed2Length > 3 && seed2Length < 7) {
            setD(seedLength > seed2Length ? seedLength : seed2Length);
        }
    }, [seed, seed2])
    const getNumsObj = (y, x1, x2, r) => {
        return {
            y,
            x1,
            x2,
            r
        };
    };

    const generateNums = () => {
        let tempArr = [];
        let seedProduct = seed * seed2;
        let middleSeedValues = modifyNums.getMiddleValues(seedProduct, d);
        tempArr.push(getNumsObj(seedProduct, seed2, middleSeedValues, modifyNums.transformToR(middleSeedValues, d)));
        for (let i = 1; i < amount; i++) {
            seedProduct = tempArr[i - 1].x1 * tempArr[i - 1].x2;
            middleSeedValues = modifyNums.getMiddleValues(seedProduct, d);
            tempArr.push(getNumsObj(seedProduct, tempArr[i - 1].x2, middleSeedValues, modifyNums.transformToR(middleSeedValues, d)));
        }
        console.log(tempArr)
        setGeneratedNums(tempArr);
    }

    return (
        <div className="container">

            <TitleBar title="Algoritmo Productos Medios" />

            <div className='form-group'>
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon1">Semilla 0: </span>
                    </div>
                    <input id='semilla' type='number' min='100' max='999999' value={seed} onChange={(e) => setSeed(e.target.value)} />
                </div>

                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon1">Semilla 1: </span>
                    </div>
                    <input id='semilla' type='number' min='100' max='999999' value={seed2} onChange={(e) => setSeed2(e.target.value)} />
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
                            <th scope="col">Xi-1</th>
                            <th scope="col">Xi</th>
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
                                        <td>{e.x1}</td>
                                        <td>{e.x2}</td>
                                        <td>{e.r}</td>
                                    </tr>
                                )
                            }
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default AlgoritmoProductosMedios