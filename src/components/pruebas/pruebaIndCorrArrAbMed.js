import React, { useState, useEffect } from 'react'
import TitleBar from '../TitleBar/TitleBar';

const PruebaCorrArrAbMed = () => {
    let [numeros, setNumeros] = useState('');
    let [N, setN] = useState(0);
    let [C0, setC0] = useState(0);
    let [N1, setN1] = useState(0);
    let [N0, setN0] = useState(0);
    let [MC0, setMC0] = useState(0);
    let [VariazaC0, setVariazaC0] = useState(0);
    let [Z0, setZ0] = useState(0);
    let [Hipot, setHipot] = useState('');

    const prueba = () => {
        let tempArr = numeros.split(',');
        let n = tempArr.length
        setN(n)
        let media = 0.5;
        let countSwitch = 0;
        let swithflag = 0;

        let count1 = tempArr.reduce((a, b) => {
            let temp = parseFloat(b.trim()) > media ? 1 : 0
            if (temp != swithflag) {
                countSwitch++;
                swithflag = !swithflag;
            }
            return parseInt(a) + temp;
        }, 0)
        let count0 = n - count1

        setC0(countSwitch)
        setN1(count1)
        setN0(count0);
        let mc0 = ((2 * count1 * count0) / n) + (1 / 2);
        setMC0(mc0);

        let variazaC0 = ((2 * count0 * count1) * (2 * count0 * count1 - n)) / ((n * n) * (n - 1))
        setVariazaC0(variazaC0)

        let z0 = Math.abs((countSwitch - mc0) / Math.sqrt(variazaC0))
        setZ0(z0)

        let hipot = 1.96 > z0 && z0 > -1.96 ? "Como el valor Zo cae dentro de nuestro intervalo (-1.96, 1.96) no podemos rechazar que los números sean independientes" :
            "Como el valor Zo no cae dentro de nuestro intervalo (-1.96, 1.96) podemos concluir que los números no son independientes";
        setHipot(hipot)
    }

    return (
        <div className="container">
            <TitleBar title="Prueba: Corridas Arriba y Abajo Media" />

            <div className='form-group'>
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon1">Input: </span>
                    </div>
                    <textarea id="list" onChange={(e) => setNumeros(e.target.value)} />
                    <div className="input-group-append">
                        <span className="input-group-text" id="basic-addon2">CSV</span>
                    </div>
                </div>

                <div className="input-group mb-3">
                    <div className='btn btn-primary' onClick={(e) => prueba()}>Generar</div>
                </div>
            </div>

            <div className="row">
                <p>{Hipot}</p>
            </div>

            {Hipot &&
                <table className='table'>
                    <thead>
                        <tr>
                            <th scope="col">Tamaño</th>
                            <th scope="col">C0</th>
                            <th scope="col">N1</th>
                            <th scope="col">N0</th>
                            <th scope="col">MC0</th>
                            <th scope="col">Varianza0</th>
                            <th scope="col">Zo</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{N}</td>
                            <td>{C0}</td>
                            <td>{N1.toFixed(5)}</td>
                            <td>{N0.toFixed(5)}</td>
                            <td>{MC0.toFixed(5)}</td>
                            <td>{VariazaC0.toFixed(5)}</td>
                            <td>{Z0.toFixed(5)}</td>
                        </tr>
                    </tbody>
                </table>
            }

        </div>
    )
}

export default PruebaCorrArrAbMed

/*
0.809,
0.042,
0.432,
0.538,
0.225,
0.88,
0.688,
0.772,
0.036,
0.854,
0.397,
0.268,
0.821,
0.897,
0.07,
0.721,
0.087,
0.35,
0.779,
0.482,
0.136,
0.855,
0.453,
0.197,
0.444,
0.799,
0.809,
0.691,
0.545,
0.857,
0.692,
0.055,
0.348,
0.373,
0.436,
0.29,
0.015,
0.834,
0.599,
0.724,
0.564,
0.709,
0.946,
0.754,
0.677,
0.128,
0.012,
0.498,
0.6,
0.913

*/