import { NavLink, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

export function PizzaModPage() {
    const navigate = useNavigate();
    const param = useParams();
    const id = param.pizzaId;
    const [pizzaData, setPizza] = useState([]);
    const [isFetchPending, setFetchPending] = useState(false);

    useEffect(() => {
        setFetchPending(true);
        (async() => {
            try{
                const res = await fetch(`https://pizza.kando-dev.eu/Pizza/${id}`);
            const pizza = await res.json();
            setPizza(pizza);
        } 
        catch(error){
            console.log(error);
        }
        finally{
            setFetchPending(false);
        }
        })();
    },[id]);

    return(
        <div className="p-5 content bg-whitesmoke text-center">
            <h2>Pizza módosítása</h2>
            <form onSubmit={
                (event) => {
                    event.persist();
                    event.preventDefault();
                    fetch(`https://pizza.kando-dev.eu/Pizza/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                    id: id,
                    name: event.target.name.value,
                    isGlutenFree: event.target.isGlutenFree.value,
                    kepURL: event.target.kepURL.value,
                })
            })
    .then(response => response.json())
    .then(data => console.log(data))
    .then(navigate('/'))
    .catch(error => console.error('Error:', error));
            }
        }>
            <div className="form-group row pb-3">
                <label className="col-sm-3 col-form-label">Név:</label>
                    <div>
                        <input type="text" name="name" className="form-control" placeholder={pizzaData.name}/>
                    </div>
            </div>
            <div className="form-group row pb-3">
                <label className="col-sm-3 col-form-label">Gluténmentes-e:</label>
                    {pizzaData.isGlutenFree ? (
                        <div>
                        <label className="col-sm-3 col-form-label">
                            <input
                                type="radio"
                                name="isGlutenFree"
                                value="1"
                                checked="true"
                            />
                            Igen
                        </label>
                        <label className="col-sm-3 col-form-label">
                            <input
                                type="radio"
                                name="isGlutenFree"
                                value="0"
                            />
                            Nem
                        </label>
                    </div>
                    ): (
                        <div>
                        <label className="col-sm-3 col-form-label">
                            <input
                                type="radio"
                                name="isGlutenFree"
                                value="1"
                            />
                            Igen
                        </label>
                        <label className="col-sm-3 col-form-label">
                            <input
                                type="radio"
                                name="isGlutenFree"
                                value="0"
                                checked="true"
                            />
                            Nem
                        </label>
                    </div>
                    )}
            </div>
            <div className="form-group row pb-3">
                <label className="col-sm-3 col-form-label">Kép URL:</label>
                    <div>
                        <input type="text" name="kepURL" className="form-control" placeholder={pizzaData.kepURL}/>
                    </div>
            </div>
            <div className="d-flex justify-content-between">
                    <div className="w-50">
                        <button type="submit" className="btn btn-primary">Mentés</button>
                    </div>
                    <div className="w-50">
                        <NavLink to={`/egy-pizza/${pizzaData.id}`}>
                                <button className="btn btn-secondary">Vissza</button>
                        </NavLink>
                        
                    </div>
                </div>
        </form>
        </div>
    )
}