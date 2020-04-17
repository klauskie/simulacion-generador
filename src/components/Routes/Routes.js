import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
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
                <Route exact path="/algoritmo/cuadrados-medios" component={AlgoritmoCuadradosMedios} />
                <Route exact path="/algoritmo/productos-medios" component={AlgoritmoProductosMedios} />
                <Route exact path="/algoritmo/multiplicador-constante" component={AlgoritmoMultiplicadorConstante} />
                <Route exact path="/algoritmo/lineal" component={AlgoritmoLineal} />
                <Route exact path="/algoritmo/congruencial-multiplicativo" component={AlgoritmoCongruencialMultiplicativo} />
                <Route exact path="/algoritmo/congruencial-aditivo" component={AlgoritmoCongruencialAditivo} />
                <Route exact path="/algoritmo/congruencial-cuadratico" component={AlgoritmoCongruencialCuadratico} />
                <Route exact path="/prueba/medias" component={PruebaMedias} />
                <Route exact path="/prueba/varianza" component={PruebaVarianza} />
                <Route exact path="/prueba/uniformidad-chi-cuadrada" component={PruebaUnidormidadChiCuadrada} />
                <Route exact path="/prueba/uniformidad-kolmogorov-smirnov" component={PruebaUniformidadKolSmir} />
                <Route exact path="/prueba/independencia-corridas-arriba-abajo" component={PruebaIndepCorrArrAb} />
                <Route exact path="/prueba/independencia-corridas-arriba-abajo-media" component={PruebaCorrArrAbMed} />
                <Route exact path="/prueba/poker" component={PruebaPoker} />
                <Route exact path="/prueba/series" component={PruebaSerie} />
                <Route exact path="/prueba/huecos" component={PruebaHuecos} />
                <Route exact path="/prueba/distribucion-chi-cuadrada" component={PruebaDstrbcnChiCdrd} />
                <Route exact path="/prueba/kolmogorov-smirnov" component={PruebaKolSmir} />
                <Route exact path="/metodo/transformada-inversa" component={MetodoTransformadaInversa} />
                <Route exact path="/metodo/convolucion" component={MetodoConvolucion} />
            </Switch >
        );
    }
}

export default Routes;