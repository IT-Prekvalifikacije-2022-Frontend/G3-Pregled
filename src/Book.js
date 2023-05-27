import { useFetcher, useLoaderData } from "react-router-dom"
import { napraviAutore } from "./tekstAlati"
import { Autocomplete, Button, Chip, Container, Paper, Rating, Stack, TextField, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { validateISBN, validateTitle, validateYear } from "./validacija";
import { Label } from "@mui/icons-material";
import { produce } from "immer";

/*
        "title": "The Rise And Fall And Rise And Fall Of The Cyclic Empire",
        "isbn": "1111111111113",
        "year": "1798",
*/

const ValidatorIndex = {
    year: validateYear,
    title: validateTitle,
    isbn: validateISBN
};

const ValidatedTextField = ({id, StateIndex, currentBook, generateOnChanged}) => {        
    return <TextField 
                    helperText={StateIndex[id][0].cause} 
                    error={!StateIndex[id][0].valid} 
                    id={id} 
                    value={currentBook[id]} 
                    onChange={generateOnChanged(id)} 
                    onBlur={e => {
                        StateIndex[id][1](ValidatorIndex[id](currentBook[id]));
                    }}
            />
}

const Book = () => {
    const [book, genres, authors] = useLoaderData();
    const [currentBook, setCurrentBook] = useState(structuredClone(book));
    const generateOnChanged = (t) => {
        return (e) => {
            /*setCurrentBook({
                ...currentBook,
                [t] : e.target.value
            });*/
            setCurrentBook(produce(draft => {
                draft[t] = e.target.value;//normalno ne smem, ali immer to dozvoljava
            }));
        }
    }

    const [selectedAuthor, setSelectedAuthor] = useState(null);

    const [godinaErrorState, setGodinaErrorState] = useState(validateYear(book.year));
    const [titleErrorState, setTitleErrorState] = useState(validateTitle(book.title));
    const [isbnErrorState, setIsbnErrorState] = useState(validateISBN(book.isbn));
    const fetcher = useFetcher();
    const StateIndex = {
        year: [godinaErrorState, setGodinaErrorState],
        title: [titleErrorState, setTitleErrorState],
        isbn: [isbnErrorState, setIsbnErrorState]
    }
    const isFormValid = () => {
        for(const e in StateIndex){
            if(!StateIndex[e][0].valid) return false;
        }
        return true;
    }
    const validationContext = {
        StateIndex : StateIndex,
        currentBook : currentBook,
        generateOnChanged : generateOnChanged
    };

    const strToGenre = (s) => {
        return genres.find(v => v.name === s);
    }

    const strToAuthor = (s) => {
        return authors.find(v => v.name === s);
    }
    return <>
        <Container maxWidth="sm" sx={{padding: '25px'}}>
            <Paper sx={{padding: '25px'}}>
                <Stack spacing={1}>
                    <Typography variant="h6" align="center">Editovanje Knjige</Typography>
                    {/* <TextField helperText="Naslov" id="title" value={currentBook.title} onChange={generateOnChanged('title')} required={true}></TextField> */}
                    <ValidatedTextField id="title" {...validationContext}/>
                    <Stack direction={"column"}>
                        <Typography>Autori: </Typography>
                        <Stack direction={"row"} border={1} sx={{padding: "20px", flexWrap:'wrap', rowGap:"5px"}} spacing={1}>
                            {currentBook.authors.map((v, ii) => <Chip label={v} onDelete={() => {
                                /*setCurrentBook({
                                    ...currentBook,
                                    authors: currentBook.authors.filter((v, i) => i !== ii)
                                });*/
                                setCurrentBook(produce(draft => {
                                    draft.authors = draft.authors.filter((v, i) => i !== ii);
                                }));
                            }}/>)}
                        </Stack>
                        <Stack direction={"row"}>
                            <Typography sx={{alignSelf:"center"}}>Ime: </Typography>
                            <Autocomplete
                                sx={{width:"300px"}}
                                options={authors.filter(v => currentBook.authors.every(vv => vv !== v.name))}
                                getOptionLabel={a => a.name}
                                renderInput={(params) => <TextField {...params}/>}
                                value={selectedAuthor}
                                onChange={(e, v) => {
                                    setSelectedAuthor(v);
                                }} />
                            <Button disabled={selectedAuthor === null} onClick={e => {
                                if(selectedAuthor !== null){
                                    /*setCurrentBook({
                                        ...currentBook,
                                        authors: [...(currentBook.authors), selectedAuthor.name]
                                    });*/
                                    setCurrentBook(produce(draft => {
                                        draft.authors.push(selectedAuthor.name);
                                    }));
                                    setSelectedAuthor(null);
                                }
                            }}>Dodaj</Button>
                        </Stack>
                    </Stack>
                    {/* <TextField helperText="ISBN" id="isbn" value={currentBook.isbn} onChange={generateOnChanged('isbn')} required={true}></TextField> */}
                    <ValidatedTextField id='isbn' {...validationContext}></ValidatedTextField>
                    <Autocomplete
                                options={genres} 
                                getOptionLabel={g => g.name} 
                                renderInput={(params) => <TextField {...params} label="Žanr"/>} 
                                value={strToGenre(currentBook.genre)}
                                onChange={(e, v) => {
                                    /*setCurrentBook({
                                        ...currentBook,
                                        genre : v.name,
                                    });*/
                                    setCurrentBook(produce(draft => {
                                        draft.genre = v.name;
                                    }));
                                }}
                            />

                    <ValidatedTextField id='year' {...validationContext}></ValidatedTextField>
                    {/* <TextField helperText={godinaErrorState.cause} error={!godinaErrorState.valid} id="year" value={currentBook.year} onChange={generateOnChanged('year')} required={true} onBlur={e => {
                        setGodinaErrorState(validateYear(currentBook.year));
                    }}></TextField> */}
                    <Stack direction={"column"} alignItems={"flex-start"}>
                        <Typography>Ocena: </Typography>
                        <Rating value={currentBook.rating} onChange={generateOnChanged('rating')} id='rating' precision={0.5}/>
                    </Stack>
                    <Stack direction={"row"} justifyContent={"flex-end"}>
                        <Button onClick={(e) => {
                            setCurrentBook(structuredClone(book));
                            for(const k in StateIndex){
                                StateIndex[k][1](ValidatorIndex[k](book[k]));
                            //  ^^^^^^^^^^^^^^^^ ^^^^^^^^^^^^^^^^^  ^^^^^^
                            //  setter za stanje    Validator za      Vrednost
                            //        validacije     ovu osobinu      za osobinu
                            }
                        }}>Reset</Button>
                        <Button variant="contained" disabled={!isFormValid()} onClick={e => {
                            let o = structuredClone(currentBook);
                            o.authors = JSON.stringify(o.authors);
                            fetcher.submit(o, {
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