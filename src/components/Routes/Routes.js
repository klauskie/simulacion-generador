import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from '../Home/Home'
import AlgoritmoCuadradosMedios from '../algoritmos/algoritmoCuadradosMedios';
import AlgoritmoMultiplicadorConstante from '../algoritmos/algoritmoMultiplicadorConstante';
import AlgoritmoLineal from '../algoritmos/algoritmoLineal';
import AlgoritmoCongruencialMultiplicativo from '../algoritmos/algortimoCongruencialMultiplicativo';
import AlgoritmoCongruencialAditivo from '../algoritmos/algortimoCongruencialAditivo'
import AlgoritmoCongruencialCuadratico from '../algoritmos/algortimoCongruencialCuadratico'
import AlgoritmoProductosMedios from '../algoritmos/algoritmoProductosMedios'
import PruebaDstrbcnChiCdrd from '../pruebas/pruebaDistChiCuad'
import PruebaVarianza from '../pruebas/pruebaVarianza'
import PruebaUnidormidadChiCuadrada from '../pruebas/pruebaUniformidadChiCuadrada'
import PruebaHuecos from '../pruebas/pruebaHuecos'
import PruebaCorrArrAbMed from '../pruebas/pruebaIndCorrArrAbMed'
import PruebaIndepCorrArrAb from '../pruebas/pruebaIndepCorrArrAb'
import PruebaKolSmir from '../pruebas/pruebaKolSmir'
import PruebaMedias from '../pruebas/pruebaMedias'
import PruebaPoker from '../pruebas/pruebaPoker'
import PruebaSerie from '../pruebas/pruebaSeries'
import PruebaUniformidadKolSmir from '../pruebas/pruebaUniformidadKolSmir'
import MetodoConvolucion from '../metodos/metodoConvolucion'
import MetodoTransformadaInversa from '../metodos/metodoTransformadaInversa'


class Routes extends Component {
    render() {
        return (
            <Switch>
                <Route exact path="/simulacion-generador" component={Home} />
                <Route exact path="/simulacion-generador/algoritmo/cuadrados-medios" component={AlgoritmoCuadradosMedios} />
                <Route exact path="/simulacion-generador/algoritmo/productos-medios" component={AlgoritmoProductosMedios} />
                <Route exact path="/simulacion-generador/algoritmo/multiplicador-constante" component={AlgoritmoMultiplicadorConstante} />
                <Route exact path="/simulacion-generador/algoritmo/lineal" component={AlgoritmoLineal} />
                <Route exact path="/simulacion-generador/algoritmo/congruencial-multiplicativo" component={AlgoritmoCongruencialMultiplicativo} />
                <Route exact path="/simulacion-generador/algoritmo/congruencial-aditivo" component={AlgoritmoCongruencialAditivo} />
                <Route exact path="/simulacion-generador/algoritmo/congruencial-cuadratico" component={AlgoritmoCongruencialCuadratico} />
                <Route exact path="/simulacion-generador/prueba/medias" component={PruebaMedias} />
                <Route exact path="/simulacion-generador/prueba/varianza" component={PruebaVarianza} />
                <Route exact path="/simulacion-generador/prueba/uniformidad-chi-cuadrada" component={PruebaUnidormidadChiCuadrada} />
                <Route exact path="/simulacion-generador/prueba/uniformidad-kolmogorov-smirnov" component={PruebaUniformidadKolSmir} />
                <Route exact path="/simulacion-generador/prueba/independencia-corridas-arriba-abajo" component={PruebaIndepCorrArrAb} />
                <Route exact path="/simulacion-generador/prueba/independencia-corridas-arriba-abajo-media" component={PruebaCorrArrAbMed} />
                <Route exact path="/simulacion-generador/prueba/poker" component={PruebaPoker} />
                <Route exact path="/simulacion-generador/prueba/series" component={PruebaSerie} />
                <Route exact path="/simulacion-generador/prueba/huecos" component={PruebaHuecos} />
                <Route exact path="/simulacion-generador/prueba/distribucion-chi-cuadrada" component={PruebaDstrbcnChiCdrd} />
                <Route exact path="/simulacion-generador/prueba/kolmogorov-smirnov" component={PruebaKolSmir} />
                <Route exact path="/simulacion-generador/metodo/transformada-inversa" component={MetodoTransformadaInversa} />
                <Route exact path="/simulacion-generador/metodo/convolucion" component={MetodoConvolucion} />
            </Switch >
        );
    }
}

export default Routes;