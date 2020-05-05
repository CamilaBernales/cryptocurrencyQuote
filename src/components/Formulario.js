import React, { useEffect, useState } from 'react';
import Error from './Error';
import styled from '@emotion/styled';
import useMoneda from '../hooks/useMoneda';
import useCriptomoneda from '../hooks/useCriptomoneda';
import axios from 'axios';

const Boton = styled.input`
    margin-top: 20px;
    font-weight: bold;
    font-size: 20px;
    padding: 10px;
    background-color: #66a2fe;
    border: none;
    width: 100%;
    border-radius: 10px;
    color: #FFF;
    transition: background-color .3s ease;
    &:hover {
        background-color: #326AC0;
        cursor:pointer;
    }
`

const Formulario = ({guardarCriptomoneda, guardarMoneda}) => {


    //state listado cripto
    const [listacripto, guardarCriptomonedas] = useState([]);
    const [error, guardarError] = useState(false);

    const monedas = [
        { codigo: 'USD', nombre: "Dolar estados unidos" },
        { codigo: 'MXN', nombre: "Peso Mexicano" },
        { codigo: 'EUR', nombre: "Peso Europeo" },
        { codigo: 'ARS', nombre: "Peso Argentino " },
        { codigo: 'GBP', nombre: "Libra Esterlina" },
        { codigo: 'COP', nombre: "Peso colombiano" }
    ]

     // Utilizar useMoneda
     const [ moneda, SelectMonedas ] = useMoneda('Elige tu Moneda', '', monedas);

     // utilizar useCriptomoneda
     const [criptomoneda, SelectCripto] = useCriptomoneda('Elige tu Criptomoneda', '', listacripto);

    //ejecutar llamado a la api
    useEffect(() => {
        const consultarAPI = async () => {
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
            const resultado = await axios.get(url);
            guardarCriptomonedas(resultado.data.Data);
        }
        consultarAPI();
    }, [])
    //cuando el usuairo hace submit
    const cotizarMoneda = e => {
        e.preventDefault();

        //validar cuando el usuario
        if(moneda === '' || criptomoneda === '') {
            guardarError(true);
            return;
        }
        //caso contrario paso datos al componente principal
        // pasar los datos al componente principal
        guardarError(false);
        guardarMoneda(moneda);
        guardarCriptomoneda(criptomoneda);
    }

    return (

        <div>
            <form onSubmit={cotizarMoneda}>
            {error ? <Error mensaje="Todos los campos son obligatorios" /> : null}          
            
            <SelectMonedas />
            <SelectCripto />
            <Boton
                type="submit"
                value="Calcular"
            />
            </form>
        </div>
    );
}


export default Formulario;