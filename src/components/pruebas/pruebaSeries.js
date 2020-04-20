import React, { useState, useEffect } from "react";
import chiSquareInverse from "inv-chisquare-cdf";
import TitleBar from "../TitleBar/TitleBar";

const PruebaSerie = () => {
    let [cuadrants, setCuadrants] = useState([]);
    let [c, setC] = useState("");
    let [m, setM] = useState(0);
    let [numbersCSVString, setNumbersCSVString] = useState("");
    let [numbers, setNumbers] = useState([]);
    let [numbersLength, setNumbersLength] = useState(0);
    let [x2Total, setX2Total] = useState(0);
    let [acepta, setAcepta] = useState(false);
    let [testRun, setTestRun] = useState(false);
    let [alpha, setAlpha] = useState(0.05);
    let [chiValue, setChiValue] = useState(0);
    let [testTable, setTestTable] = useState([]);

    useEffect(() => {
        if (chiValue > x2Total) {
            setAcepta(true);
        }
        if (testTable.length > 0) setTestRun(true);
    }, [x2Total, chiValue, testTable.length]);

    useEffect(() => {
        let degreeFreed = m > 2 ? m - 1 : 1;
        setChiValue(chiSquareInverse.invChiSquareCDF(1 - alpha / 2, degreeFreed));
    }, [alpha, m]);

    const addCSVValues = () => {
        if (parseFloat(c)) {
            let nums = numbersCSVString.split(",").map((e) => parseFloat(e));
            setAlpha(parseFloat(c));
            setNumbers([...nums]);
            setNumbersLength(nums.length);
        }
    };

    const closestSquareTable = (m) => {
        let notFound = true;
        let i = 0;
        while (notFound) {
            let ibase2 = Math.pow(i, 2);
            if (m > ibase2) {
                i++;
            } else if (m < ibase2) {
                m = ibase2;
                notFound = false;
            } else if (m == ibase2) {
                notFound = false;
            }
        }
        return m;
    };

    const calculate = () => {
        if (numbers.length > 0) {
            let nums = [...numbers];
            let divs = Math.sqrt(numbersLength);
            let tempM = closestSquareTable(divs);
            let coordinates = [];
            console.log(tempM);
            setM(tempM);
            let ei = numbersLength / tempM;
            for (let i = 0; i < numbersLength - 1; i++) {
                coordinates.push({ xValue: nums[i], yValue: nums[i + 1] });
            }
            let base = Math.sqrt(tempM);
            let coordX = 0;
            let coordY = 0;
            let range = 1 / base;
            let tableCuadrnts = [];
            for (let i = 0; i < base; i++) {
                for (let j = 0; j < base; j++) {
                    tableCuadrnts.push({
                        lowerX: coordX,
                        higherX: coordX + range,
                        lowerY: coordY,
                        higherY: coordY + range,
                    });
                    coordY += range;
                }
                coordX += range;
                coordY = 0;
            }
            setCuadrants(tableCuadrnts);

            let ammountByCuadrant = [];
            for (let i = 0; i < tableCuadrnts.length; i++) {
                for (let j = 0; j < coordinates.length; j++) {
                    if (
                        coordinates[j].xValue > tableCuadrnts[i].lowerX &&
                        coordinates[j].xValue < tableCuadrnts[i].higherX &&
                        coordinates[j].yValue > tableCuadrnts[i].lowerY &&
                        coordinates[j].yValue < tableCuadrnts[i].higherY
                    ) {
                        ammountByCuadrant.push(i);
                    }
                }
            }

            let tempOi = new Array(tableCuadrnts.length).fill(0);

            for (let i = 0; i < ammountByCuadrant.length; i++) {
                tempOi[ammountByCuadrant[i]]++;
            }

            let tempx2Vals = [];
            let tempx2TotalVal = 0;
            for (let i = 0; i < tempM; i++) {
                console.log(ei);
                tempx2Vals[i] = parseFloat(Math.pow(ei - tempOi[i], 2) / ei);
                tempx2TotalVal += tempx2Vals[i];
            }
            setX2Total(tempx2TotalVal);

            let tempTestTable = [];
            for (let i = 0; i < tableCuadrnts.length; i++) {
                tempTestTable.push({
                    interval: i + 1,
                    oi: tempOi[i],
                    ei: ei,
                    x2: tempx2Vals[i],
                });
            }
            setTestTable(tempTestTable);
        }
    };

    const getResultMessage = () => {
        if (testRun) {
            if (acepta) {
                return "No se puede rechazar la Ho: " + x2Total.toFixed(4) + " <  Valor de la tabla: " + chiValue.toFixed(4)
            } else {
                return "No se rechaza la Ho: " + x2Total.toFixed(4) + " >  Valor de la tabla: " + chiValue.toFixed(4)
            }
        }
    }

    return (
        <div className="container">
            <TitleBar title="Prueba de Series" />

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
                    <textarea id="list" onChange={(e) => setNumbersCSVString(e.target.value)} />
                    <div className="input-group-append">
                        <span className="input-group-text" id="basic-addon2">
                            <div className="btn btn-primary" onClick={() => addCSVValues()}>Agregar Numeros</div>
                        </span>
                    </div>
                </div>

                <div className="input-group mb-3">
                    <div className='btn btn-primary' onClick={(e) => calculate()}>Generar</div>
                </div>
            </div>
            <div className="row">
                <p>{getResultMessage()}</p>
            </div>
            {testRun &&
                <table className="table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Oi</th>
                            <th>Ei = n/m</th>
                            <th>(Ei-Oi)^2/Ei</th>
                        </tr>
                    </thead>
                    <tbody>
                        {testTable.map((e, k) => {
                            {
                                return (
                                    <tr key={k}>
                                        <td>{k + 1}</td>
                                        <td>{e.oi.toFixed(4)}</td>
                                        <td>{e.ei.toFixed(4)}</td>
                                        <td>{e.x2.toFixed(4)}</td>
                                    </tr>
                                );
                            }
                        })}
                    </tbody>
                </table>
            }
        </div>
    );
};

export default PruebaSerie;

/*

0.872,
0.950,
0.343,
0.058,
0.384,
0.219,
0.041,
0.036,
0.213,
0.946,
0.570,
0.842,
0.706,
0.809,
0.300,
0.618,
0.512,
0.462,
0.005,
0.203,
0.291,
0.151,
0.596,
0.443,
0.868,
0.913,
0.511,
0.586,
0.608,
0.879


*/