import React, { Component } from 'react'
import { Link } from 'react-router-dom';

class Header extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
                <span className="navbar-brand">Simulacion: generador</span>
                <button id="closeNav" className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className="navbar-nav">
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#!" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Algoritmos
                            </a>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                <Link to='/algoritmo/cuadrados-medios' className="dropdown-item" >Cuadrados Medios</Link>
                                <Link to='/algoritmo/productos-medios' className="dropdown-item" >Productos Medios</Link>
                                <Link to='/algoritmo/multiplicador-constante' className="dropdown-item">Multiplicador Constante</Link>
                                <Link to='/algoritmo/lineal' className="dropdown-item" >Lineal</Link>
                                <Link to='/algoritmo/congruencial-multiplicativo' className="dropdown-item" >Congruencial Multiplicativo</Link>
                                <Link to='/algoritmo/congruencial-aditivo' className="dropdown-item" >Congruencial Aditivo</Link>
                                <Link to='/algoritmo/congruencial-cuadratico' className="dropdown-item" >Congruencial Cuadrático</Link>
                            </div>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#!" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Prueblas
                            </a>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                <Link to='/prueba/medias' className="dropdown-item">Medias</Link>
                                <Link to='/prueba/varianza' className="dropdown-item">Varianza</Link>
                                <Link to='/prueba/uniformidad-chi-cuadrada' className="dropdown-item">Uniformidad Chi Cuadrada</Link>
                                <Link to='/prueba/uniformidad-kolmogorov-smirnov' className="dropdown-item">Uniformidad Kolmogorov-Smirnov</Link>
                                <Link to='/prueba/independencia-corridas-arriba-abajo' className="dropdown-item">Independencia Corridas Arriba y Abajo</Link>
                                <Link to='/prueba/independencia-corridas-arriba-abajo-media' className="dropdown-item">independencia Corridas Arriba y Abajo Media</Link>
                                <Link to='/prueba/poker' className="dropdown-item">Poker</Link>
                                <Link to='/prueba/series' className="dropdown-item">Series</Link>
                                <Link to='/prueba/huecos' className="dropdown-item">Huecos</Link>
                                <Link to='/prueba/distribucion-chi-cuadrada' className="dropdown-item">Distribución Chi Cuadrada</Link>
                                <Link to='/prueba/kolmogorov-smirnov' className="dropdown-item">Kolmogorov-Smirnov</Link>
                            </div>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#!" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Metodos
                            </a>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                <Link to='/metodo/transformada-inversa' className="dropdown-item">Transformada Inversa</Link>
                                <Link to='/metodo/convolucion' className="dropdown-item">Convolución</Link>
                            </div>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}

export default Header;