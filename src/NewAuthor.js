import { useEffect, useState } from "react";
import { useFetcher, useLoaderData, useNavigate } from "react-router-dom";

//TODO make generic for editing and adding new
const NewAuthor = () => {
    const [n, setN] = useState("");
    const fetcher = useFetcher();
    const nav = useNavigate();
    useEffect(() => {
        if(fetcher.data){
            nav(-1);
        }
    }, [fetcher]);
    return <div>
        <label>Ime: <input value={n} onChange={(e) => setN(e.target.value)}/></label><br/>
        <button onClick={e => {
            let o = {name: n};
            fetcher.submit(o, {
                method: 'post',
                action: `/authors/new`
            });
        }}>Save</button>
    </div>;
}

export default NewAuthor;