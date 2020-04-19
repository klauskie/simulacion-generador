import React, { useState } from "react";
import TitleBar from "../TitleBar/TitleBar";

const Kolmogorov = () => {
    let [numeros, setNumeros] = useState("");
    let [N, setN] = useState(0);
    let [c, setC] = useState(0.95);
    let [alpha, setAlpha] = useState(0.0);
    let [Dmas, setDmas] = useState(0);
    let [Dmenos, setDmenos] = useState(0);
    let [Dna, setDna] = useState(0);
    let [Hipot, setHipot] = useState("");

    const prueba = () => {
        if (parseFloat(c) < 0 || parseFloat(c) > 1) {
            alert("Inserta un nivel de aceptacion entre 0 y 1");
            return;
        }

        let tempArr = numeros.split(",");
        let n = tempArr.length;
        setN(n);

        if (n > 20) {
            alert("La muestra debe tener 20 o menos números");
            return;
        }

        tempArr.sort((a, b) => parseFloat(a) - parseFloat(b));
        let arr1 = [];
        let arr3 = [];
        let arr4 = [];
        let arr5 = [];
        for (let i = 0; i < n; i++) {
            arr1[i] = (i + 1) / n;
            arr3[i] = i / n;
            arr4[i] = parseFloat((arr1[i] - tempArr[i]).toFixed(4));
            arr5[i] = parseFloat((tempArr[i] - arr3[i]).toFixed(4));
        }
        let table = [];
        table[0] = [0.995, 0.99, 0.975, 0.95, 0.9];
        table[1] = [0.9293, 0.9, 0.8418, 0.7763, 0.6837];
        table[2] = [0.829, 0.7845, 0.7076, 0.636, 0.5648];
        table[3] = [0.7342, 0.6888, 0.6239, 0.5652, 0.4926];
        table[4] = [0.6685, 0.6271, 0.5632, 0.5094, 0.4469];
        table[5] = [0.6166, 0.5774, 0.5192, 0.4679, 0.4103];
        table[6] = [0.5758, 0.5384, 0.4834, 0.436, 0.3814];
        table[7] = [0.5418, 0.5065, 0.4542, 0.4096, 0.3582];
        table[8] = [0.5133, 0.4796, 0.43, 0.3874, 0.339];
        table[9] = [0.4889, 0.4566, 0.4092, 0.3686, 0.3225];
        table[10] = [0.4677, 0.4367, 0.3912, 0.3524, 0.3082];
        table[11] = [0.449, 0.4191, 0.3754, 0.3381, 0.2957];
        table[12] = [0.4324, 0.4036, 0.3614, 0.3254, 0.2846];
        table[13] = [0.4176, 0.3897, 0.3448, 0.3141, 0.2747];
        table[14] = [0.4042, 0.3771, 0.3376, 0.3039, 0.2658];
        table[15] = [0.392, 0.3657, 0.3283, 0.2947, 0.2577];
        table[16] = [0.3808, 0.3552, 0.3179, 0.2862, 0.2503];
        table[17] = [0.3706, 0.3456, 0.3093, 0.2785, 0.2435];
        table[18] = [0.3611, 0.3368, 0.3014, 0.2713, 0.2435];
        table[19] = [0.3524, 0.3286, 0.294, 0.2647, 0.2315];

        let d_max = Math.max(...arr4);
        let d_min = Math.abs(Math.min(...arr5));
        setDmas(d_max);
        setDmenos(d_min);

        let d_value = d_max > d_min ? d_max : d_min;
        let tempAlp = (1 - parseFloat(c)).toFixed(2);

        setAlpha(tempAlp);
        let d_table;

        switch (parseFloat(tempAlp)) {
            case 0.01:
                d_table = table[n - 1][0];
                break;
            case 0.02:
                d_table = table[n - 1][1];
                break;
            case 0.05:
                d_table = table[n - 1][2];
                break;
            case 0.1:
                d_table = table[n - 1][3];
                break;
            case 0.2:
                d_table = table[n - 1][4];
                break;
            default:
                d_table = 0;
                break;
        }

        console.log(d_table, tempAlp);
        setDna(d_table);

        let hipot =
            d_table > d_value
                ? "Como D α,𝑛 > D no se puede rechazar que los números se distribuyen uniformemente"
                : "Como D α,𝑛 < D se puede rechazar que los números se distribuyen uniformemente";
        setHipot(hipot);
    };

    return (
        <div className="container">
            <TitleBar title="Prueba Uniformidad Kolmogorov-Smirnov" />
            <div className="form-group">

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
                    <textarea id="list" onChange={(e) => setNumeros(e.target.value)} />
                    <div className="input-group-append">
                        <span className="input-group-text" id="basic-addon2">CSV</span>
                    </div>
                </div>

                <div className="input-group mb-3">
                    <div className='btn btn-primary' onClick={(e) => prueba()}>Run</div>
                </div>

            </div>

            <div className="row">
                <div className="col-12">
                    <table className="table text-center">
                        <thead>
                            <tr>
                                <th scope="col">Alpha</th>
                                <th scope="col">D+</th>
                                <th scope="col">D-</th>
                                <th scope="col">Da,n</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{alpha}</td>
                                <td>{Dmas}</td>
                                <td>{Dmenos}</td>
                                <td>{Dna}</td>
                            </tr>
                        </tbody>
                    </table>
                    <br />
                    <p className="text-center">{Hipot}</p>
                </div>
            </div>
        </div>
    );
};

export default Kolmogorov;

/*
0.78,
0.98,
0.24,
0.73,
0.43,
0.16,
0.78,
0.47,
0.18,
0.55,
0.04,
0.29,
0.68,
0.77,
0.16,
0.03,
0.79,
0.22,
0.37,
0.80


*/