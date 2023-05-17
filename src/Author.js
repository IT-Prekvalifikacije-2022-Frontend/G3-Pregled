import { useState } from "react";
import { useFetcher, useLoaderData } from "react-router-dom";

//TODO make generic for editing and adding new
const Author = () => {
    const a = useLoaderData();
    const [n, setN] = useState(a.name);
    const fetcher = useFetcher();
    return <div>
        Id: {a.id}<br/>
        <label>Ime: <input value={n} onChange={(e) => setN(e.target.value)}/></label><br/>
        <button onClick={e => {
            let o = {name: n};
            fetcher.submit(o, {
                method: 'put',
                action: `/authors/${a.id}`
            });
        }}>Save</button>
    </div>;
}

export default Author;