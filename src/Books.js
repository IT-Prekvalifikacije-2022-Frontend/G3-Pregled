import { useLoaderData } from "react-router-dom";
import BookCard from "./BookCard";
import './Books.css';
import { useEffect, useState } from "react";
import { lc_match } from "./tekstAlati";

const Books = () => {
    const [books, genres] = useLoaderData();
    const [currentBooks, setCurrentBooks] = useState([]);
    const [q, setQ] = useState("");
    const [g, setG] = useState("");
    useEffect(() => {
        //PRE PRIKAZA I KADA SE PROMENI Q
        setCurrentBooks(books.filter(v => {
            return (lc_match(v.title, q) ||
                   //lc_match(v.genre, q) ||
                   v.authors.some(vv => lc_match(vv, q))) &&
                   (g !== "" ? v.genre === g : true)
                   ;
        }));
    }, [q, books, g]);
    return <div className="books_container">
        <header className="books_container_header">
            <input className="search" type="text" placeholder="Pretraga..." value={q} onChange={e => setQ(e.target.value)}/>
            <select value={g} onChange={e => setG(e.target.value)}>
                <option id="0" value="">All</option>
                {genres.map(gg => <option id={gg.id} value={gg.name}>{gg.name}</option>)}
            </select>
        </header>
        <div className="container_show_books">
            {currentBooks.map(b => <BookCard id={b.id} book={b}/>)}
        </div>
    </div>;
}

export default Books;