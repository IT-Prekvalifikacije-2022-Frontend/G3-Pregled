import { useState } from "react";
import { useFetcher, useLoaderData } from "react-router-dom";

//TODO make generic for editing and adding new
const Genre = () => {
    const g = useLoaderData();
    const [n, setN] = useState(g.name);
    const fetcher = useFetcher();
    return <div>
        Id: {g.id}<br/>
        <label>Ime: <input value={n} onChange={(e) => setN(e.target.value)}/></label><br/>
        <button onClick={e => {
            let o = {name: n};
            fetcher.submit(o, {
                method: 'put',
                action: `/genres/${g.id}`
            });
        }}>Save</button>
    </div>;
}

export default Genre;