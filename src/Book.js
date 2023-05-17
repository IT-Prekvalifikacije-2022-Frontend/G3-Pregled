import { useFetcher, useLoaderData } from "react-router-dom"
import { napraviAutore } from "./tekstAlati"
import { Button, Container, Paper, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";

/*
        "title": "The Rise And Fall And Rise And Fall Of The Cyclic Empire",
        "isbn": "1111111111113",
        "year": "1798",
*/

const Book = () => {
    const book = useLoaderData();
    const [currentBook, setCurrentBook] = useState(structuredClone(book));
    const generateOnChanged = (t) => {
        return (e) => {
            setCurrentBook({
                ...currentBook,
                [t] : e.target.value
            });
        }
    }
    const fetcher = useFetcher();
    return <>
        <Container maxWidth="sm" sx={{padding: '25px'}}>
            <Paper sx={{padding: '25px'}}>
                <Stack spacing={1}>
                    <Typography variant="h6" align="center">Editovanje Knjige</Typography>
                    <TextField helperText="Naslov" id="txtTitle" value={currentBook.title} onChange={generateOnChanged('title')}></TextField>
                    <TextField helperText="ISBN" id="txtISBN" value={currentBook.isbn} onChange={generateOnChanged('isbn')}></TextField>
                    <TextField helperText="Godina" id="txtYear" value={currentBook.year} onChange={generateOnChanged('year')}></TextField>
                    <Stack direction={"row"} justifyContent={"flex-end"}>
                        <Button onClick={(e) => {
                            setCurrentBook(structuredClone(book));
                        }}>Reset</Button>
                        <Button variant="contained" onClick={e => {
                            let o = structuredClone(currentBook);
                            o.authors = JSON.stringify(o.authors);
                            fetcher.submit(o,  {
                                method: 'put',
                                action: `/books/${currentBook.id}`
                            });
                        }}>Save</Button>
                    </Stack>
                </Stack>
            </Paper>            
        </Container>
    </>
}

export default Book;