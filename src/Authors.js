import { useState, useEffect } from "react";
import { useFetcher, useLoaderData, useNavigate } from "react-router-dom";
import { lc_match } from "./tekstAlati";
import { IconButton, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import { Add, Delete, Edit } from "@mui/icons-material";

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
    return <>
        <Stack direction="column" spacing={1} sx={{padding: '40px'}}>
            <Stack direction="row" spacing={1}>
                <TextField placeholder="Pretraga..." value={q} onChange={e => setQ(e.target.value)} sx={{flexGrow: 1}}/>
                <IconButton onClick={e => nav('/authors/new')}>
                    <Add/>
                </IconButton>
            </Stack>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Ime</TableCell>
                            <TableCell>Komande</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {currentAuthors.map(a => <TableRow>
                            <TableCell>{a.id}</TableCell>
                            <TableCell>{a.name}</TableCell>
                            <TableCell>
                                <Stack direction='row'>
                                    <IconButton onClick={async (e) => {
                                        fetcher.submit({}, {
                                            method: 'delete',
                                            action: `/authors/${a.id}`
                                        });
                                    }}>
                                        <Delete/>
                                    </IconButton>
                                    <IconButton onClick={e => {
                                        nav(`/authors/${a.id}`);
                                    }}>
                                        <Edit/>
                                    </IconButton>
                                </Stack>
                            </TableCell>
                        </TableRow>)}
                    </TableBody>
                </Table>
            </TableContainer>
        </Stack>
    </>
    /*return <div className="author_container">
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
    </div>;*/
}

export default Authors;