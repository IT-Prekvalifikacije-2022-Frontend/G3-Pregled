import { useState, useEffect } from "react";
import { useFetcher, useLoaderData, useNavigate } from "react-router-dom";
import { lc_match } from "./tekstAlati";

const Authors = () => {
    const authors = useLoaderData();
    const [currentAuthors, setCurrentAuthors] = useState([]);
    const [q, setQ] = useState("");
    const nav = useNavigate();
    const fetcher = useFetcher();
    useEffect(() => {
        //PRE PRIKAZA I KADA SE PROMENI Q
        setCurrentAuthors(authors.filter(v => {
            return lc_match(v.name, q);
        }));
    }, [q, authors]);
    return <div className="author_container">
        <header className="author_container_header">
            <input className="author_search" type="text" placeholder="Pretraga..." value={q} onChange={e => setQ(e.target.value)}/><button onClick={e => {
                nav('/authors/new');
            }}>+</button>
        </header>
        <table>
            <thead>
                <tr><th>ID</th><th>Ime</th><th>Komande</th></tr>
            </thead>
            <tbody>
                {currentAuthors.map(a => <tr id={a.id}><td>{a.id}</td><td>{a.name}</td><td><button onClick={async (e) => {
                    fetcher.submit({}, {
                        method: 'delete',
                        action: `/authors/${a.id}`
                    });
                }}>[X]</button>
                <button onClick={async (e) => {
                    nav(`/authors/${a.id}`);
                }}>[E]</button>
                </td></tr>)}
            </tbody>
        </table>            
    </div>;
}

export default Authors;