import { Link, useFetcher, useLoaderData, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { lc_match } from "./tekstAlati";
import './Genres.css';

const Genres = () => {
    const genres = useLoaderData();
    const [currentGenres, setCurrentGenres] = useState([]);
    const [q, setQ] = useState("");
    const fetcher = useFetcher();
    const nav = useNavigate();
    useEffect(() => {
        //PRE PRIKAZA I KADA SE PROMENI Q
        setCurrentGenres(genres.filter(v => {
            return lc_match(v.name, q);
        }));
    }, [q, genres]);
    return <div className="genre_container">
        <header className="genre_container_header">
            <input className="genre_search" type="text" placeholder="Pretraga..." value={q} onChange={e => setQ(e.target.value)}/>
            <button onClick={e => {
                nav('/genres/new');
            }}>+</button>
        </header>
        <table>
            <thead>
                <tr><th>ID</th><th>Ime</th><th>Komande</th></tr>
            </thead>
            <tbody>
                {currentGenres.map(g => <tr id={g.id}><td>{g.id}</td><td>{g.name}</td><td><button onClick={async (e) => {
                    fetcher.submit({}, {
                        method: 'delete',
                        action: `/genres/${g.id}`
                    });
                }}>[X]</button>
                <Link to={`/genres/${g.id}`}>[E]</Link>
                </td></tr>)}
            </tbody>
        </table>            
    </div>;
}

export default Genres;