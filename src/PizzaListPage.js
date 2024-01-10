import {useState, useEffect} from 'react';
import {NavLink} from 'react-router-dom';

export function PizzaListPage(){
    const [pizzaData, setPizzaData] = useState([]);
    const [isFetchPending, setFetchPending] = useState(false);

    useEffect (()=>{
        setFetchPending(true);
        fetch("https://pizza.kando-dev.eu/Pizza")
            .then(response => response.json())
            .then(pizza => setPizzaData(pizza))
            .catch(error => console.log(error))
            .finally(()=>{
                setFetchPending(false);
            })
    }, []);

    return(
        <div className="p-5 m-auto text-center content bg-ivory">
        {isFetchPending ? (<div className="spinner-border"></div>) : (<div>
                <h2>Pizzák</h2>
                {pizzaData.map((pizza) => (
                    <NavLink key={pizza.id} to={`/egy-pizza/${pizza.id}`}>
                    <div key = {pizza.id} className="card col-sm-3 d-inline-block m-1 p-2">
                            <h2 style={{ textAlign: 'center' }}>{pizza.name}</h2>
                            <p style={{ textAlign: 'center' }}>Gluténmentes: {pizza.isGlutenFree ? 'Igen' : 'Nem'}</p>
                            <div className="card-body">
                                <img src={pizza.kepURL} alt={pizza.name} style={{maxWidth: '80%', maxHeight: '150px', objectFit: 'cover', alignSelf: 'center' }} />
                            </div>
                    </div>
                    </NavLink>
                ))}
                </div>)}
        </div>    
    );
}