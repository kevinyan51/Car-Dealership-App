import React, { useEffect, useState} from 'react';

function AutomobileForm(){
    const [color, setColor] = useState('')
    const [year, setYear] = useState('')
    const [vin, setVin] = useState('')
    const [model, setModel] = useState('')
    const [models, setModels] = useState([])

    const handelColorChange = event => {
        const value = event.target.value
        setName(value)
    }
    const handelYearChange = event => {
        const value = event.target.value
        setYear(value)
    }
    const handelVinChange = event => {
        const value = event.target.value
        setVin(value)
    }

}
