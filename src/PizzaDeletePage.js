import { useParams } from "react-router-dom";
import { NavLink, useNavigate } from "react-router-dom";

export function PizzaDeletePage() {
    const navigate = useNavigate();
    const param = useParams();
    const id = param.pizzaId;

    return(
        <form onSubmit={
                (event) => {
                    event.persist();
                    event.preventDefault();
                    fetch(`https://pizza.kando-dev.eu/Pizza/${id}`, {
                    method: 'DELETE',
            })
            .then(response => response.json())
            .then(data => console.log(data))
            .then(navigate('/'))
            .catch(error => console.error('Error:', error));
            }
        }>
        <h1>Biztos hogy kitörli a pizzát?</h1>
        <div className="d-flex justify-content-between">
            <div className="w-50">
                <button type="submit" className="btn btn-primary">Igen</button>
            </div>
            <div className="w-50">
                <NavLink to={`/`}>
                    <button className="btn btn-secondary">Nem</button>
                </NavLink>
                        
            </div>
        </div>
        </form>
    );
}