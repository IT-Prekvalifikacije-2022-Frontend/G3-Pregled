import { useContext, useState } from "react";
import { Button, Stack, TextField, Typography } from "@mui/material";
import { useFetcher, useLoaderData } from "react-router-dom";

//TODO make generic for editing and adding new
const Genre = () => {
    const g = useLoaderData();
    const [n, setN] = useState(g.name);
    const fetcher = useFetcher();
    return <>
    <Stack direction={"column"} spacing={1} sx={{paddingLeft: '160px', paddingRight: '160px', paddingTop: '40px'}}>
        <Typography>Id: {g.id}</Typography>
        <TextField label="Ime" value={n} onChange={e => setN(e.target.value)}/>
        <Stack direction={"row-reverse"}>
            <Button variant="contained" onClick={e => {
                let o = {name: n};
                fetcher.submit(o, {
                    method: 'put',
                    action: `/genres/${g.id}`
                });
            }}>
                Save
            </Button>
        </Stack>
    </Stack>
</>;
    /*return <div>
        Id: {g.id}<br/>
        <label>Ime: <input value={n} onChange={(e) => setN(e.target.value)}/></label><br/>
        <button onClick={e => {
            let o = {name: n};
            fetcher.submit(o, {
                method: 'put',
                action: `/genres/${g.id}`
            });
        }}>Save</button>
    </div>;*/
}

export default Genre;