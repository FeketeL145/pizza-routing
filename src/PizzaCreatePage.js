import { useNavigate } from "react-router-dom";

export function PizzaCreatePage() {
    const navigate = useNavigate();

    return(
        <div className="p-5 content bg-whitesmoke text-center">
            <h2>Új pizza</h2>
            <form onSubmit={
                (event) => {
                    event.persist();
                    event.preventDefault();
                    fetch('https://pizza.kando-dev.eu/Pizza', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                    id: 0,
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
                        <input type="text" name="name" className="form-control"/>
                    </div>
            </div>
            <div className="form-group row pb-3">
                <label className="col-sm-3 col-form-label">Gluténmentes-e:</label>
                <div>
                        <label>
                            <input
                                type="radio"
                                name="isGlutenFree"
                                value="1"
                            />
                            Igen
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="isGlutenFree"
                                value="0"
                            />
                            Nem
                        </label>
                    </div>
            </div>
            <div className="form-group row pb-3">
                <label className="col-sm-3 col-form-label">Kép URL:</label>
                    <div>
                        <input type="text" name="kepURL" className="form-control"/>
                    </div>
            </div>
        <button type="submit" className="btn btn-primary">Hozzáad</button>
        </form>
        </div>
    )
}