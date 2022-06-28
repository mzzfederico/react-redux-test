import { useEffect, useReducer, useState } from "react";
import "./Azienda.scss"


export const reducer = (state, action) => {
    let nuovoStato = { ...state };

    if (action.type === "aumentaNumero") {
        nuovoStato = { ...state, counter: state.counter + 1 }
    }
    if (action.type === "diminuisciNumero") {
        nuovoStato = { ...state, counter: state.counter - 1 }
    }

    return reducerNumeriPrimi(nuovoStato, action);
};

export const reducerNumeriPrimi = (state, action) => {
    /* includes("pending") includes("fulfilled")... */
    if (action.type.includes("Numero")) {
        return { ...state, isPrime: isPrime(state.counter) }
    }
    return state;
};


export default function Azienda() {
    const [state, dispatch] = useReducer(reducer, { counter: 1 });

    const handleClick = () => dispatch({ type: "aumentaNumero" });
    const handleClick2 = () => dispatch({ type: "diminuisciNumero" });

    return <h1>
        <button onClick={handleClick2}>-1</button>
        {state.counter}
        <button onClick={handleClick}>+1</button>
    </h1>;
}













function Azienda___ () {
    const [formData, setFormData] = useState({ denominazione: "", codiceImpresa: "", telefono: "" });

    useEffect(function() {
        /*  if (Number.isNaN(Number(formData.telefono))) {
             alert("Telefono non è un numero");
         } */
         setFormData(p => ({ ...p, telefono: "...." }));
    }, [])

    function handleOnlyNumbers(event) {
        if (event.key === "Backspace") return;
        if (event.key === ".") event.preventDefault();
        if (Number.isNaN(Number(event.key))) event.preventDefault();
        /* formData... */
    }

    function handleChange(event) {
        /* if (event.target.name === "codiceImpresa") {
            // Number.isNaN(Number(....)) - vero se non è un numero valido
            if (Number.isNaN(Number(event.target.value.replace(".", "")))) {
                return
            }
        } */
        setFormData(prevState => ({...prevState, [event.target.name]: event.target.value.replace(".", "")}))

    }

    return (
        <div className="azienda">
            <pre>{JSON.stringify(formData, null, 4)}</pre>
            <form>
                <label htmlFor="denominazione">Denominazione</label>
                <input type="text" id="denominazione" name="denominazione" value={formData.denominazione} onChange={handleChange} />
                <label htmlFor="codiceImpresa">Codice Impresa</label>
                <input type="text" id="codiceImpresa" name="codiceImpresa"
                    value={formData.codiceImpresa}
                    onKeyDown={handleOnlyNumbers}
                    onChange={handleChange}
                />
                <label htmlFor="telefono">Telefono</label>
                <input type="text" id="telefono" name="telefono" value={formData.telefono} onChange={handleChange}/>
            </form>
        </div>
    );
}









const isPrime = num => {
    for(let i = 2, s = Math.sqrt(num); i <= s; i++)
        if(num % i === 0) return false;
    return num > 1;
}