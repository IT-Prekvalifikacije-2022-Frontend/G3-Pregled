import { useFetcher, useLoaderData } from "react-router-dom"
import { napraviAutore } from "./tekstAlati"
import { Autocomplete, Button, Chip, Container, Paper, Rating, Stack, TextField, Typography } from "@mui/material";
import { useCallback, useEffect, useReducer, useRef, useState } from "react";
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

const ValidatedTextField = ({id, state, dispatch, generateOnChanged}) => {        
    return <TextField 
                    helperText={state.errors[id].cause} 
                    error={!state.errors[id].valid} 
                    id={id} 
                    value={state.currentBook[id]} 
                    onChange={generateOnChanged(id)} 
                    onBlur={e => {
                        //StateIndex[id][1](ValidatorIndex[id](currentBook[id]));
                        dispatch({
                            type: 'validate',
                            key: id
                        });
                    }}
            />
}

const my_reducer = (state, action) => {
    if(action.type === 'changed'){
        state.currentBook[action.key] = action.value;
    }else if(action.type === 'delete_author'){
        state.currentBook.authors = state.currentBook.authors.filter((v, i) => i !== action.which_author);
    }else if(action.type === 'select_author'){
        state.selectedAuthor = action.which_author;
    }else if(action.type === 'add_author'){
        state.currentBook.authors.push(state.selectedAuthor.name);
        state.selectedAuthor = null;
    }else if(action.type === 'reset'){
        state.currentBook = structuredClone(action.value);
        for(const k in ValidatorIndex){
            state.errors[k] = ValidatorIndex[k](state.currentBook[k]);
        }
    }else if(action.type === 'validate'){
        state.errors[action.key] = ValidatorIndex[action.key](state.currentBook[action.key]);
    }
};

const Book = () => {
    const [book, genres, authors] = useLoaderData();
    const [state, dispatch] = useReducer(produce(my_reducer), {
        currentBook: structuredClone(book),
        selectedAuthor: null, 
        errors : {
            year: validateYear(book.year),
            title: validateTitle(book.title),
            isbn: validateISBN(book.isbn),
        }
    });
    const resetCallback = useCallback(e => {
        dispatch({
            type: 'reset',
            value: book
        });
    }, [book]);
    //const [currentBook, setCurrentBook] = useState(structuredClone(book));
    const generateOnChanged = (t) => {
        return (e) => {
            /*setCurrentBook({
                ...currentBook,
                [t] : e.target.value
            });*/
            dispatch({
                type: 'changed',
                key: t,
                value: e.target.value
            });
            /*setCurrentBook(produce(draft => {
                draft[t] = e.target.value;//normalno ne smem, ali immer to dozvoljava
            }));*/
        }
    }

    //const [selectedAuthor, setSelectedAuthor] = useState(null);

    //const [godinaErrorState, setGodinaErrorState] = useState(validateYear(book.year));
    //const [titleErrorState, setTitleErrorState] = useState(validateTitle(book.title));
    //const [isbnErrorState, setIsbnErrorState] = useState(validateISBN(book.isbn));
    const fetcher = useFetcher();
    //const StateIndex = {
    //    year: [godinaErrorState, setGodinaErrorState],
    //    title: [titleErrorState, setTitleErrorState],
    //    isbn: [isbnErrorState, setIsbnErrorState]
    // }
    const isFormValid = () => {
        for(const k of ['year', 'title', 'isbn']){
            if(!state.errors[k].valid) return false;
        }
        /*for(const e in StateIndex){
            if(!StateIndex[e][0].valid) return false;
        }*/
        return true;
    }
    const validationContext = {
//        StateIndex : StateIndex,
//        currentBook : currentBook,
        state: state,
        dispatch : dispatch,
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
                            {state.currentBook.authors.map((v, ii) => <Chip label={v} onDelete={() => {
                                /*setCurrentBook({
                                    ...currentBook,
                                    authors: currentBook.authors.filter((v, i) => i !== ii)
                                });*/
                                dispatch({
                                    type: 'delete_author',
                                    which_author: ii
                                });
                                /*setCurrentBook(produce(draft => {
                                    draft.authors = draft.authors.filter((v, i) => i !== ii);
                                }));*/
                            }}/>)}
                        </Stack>
                        <Stack direction={"row"}>
                            <Typography sx={{alignSelf:"center"}}>Ime: </Typography>
                            <Autocomplete
                                sx={{width:"300px"}}
                                options={authors.filter(v => state.currentBook.authors.every(vv => vv !== v.name))}
                                getOptionLabel={a => a.name}
                                renderInput={(params) => <TextField {...params}/>}
                                value={state.selectedAuthor}
                                onChange={(e, v) => {
                                    //setSelectedAuthor(v);
                                    dispatch({
                                        type: 'select_author',
                                        which_author: v
                                    })
                                }} />
                            <Button disabled={state.selectedAuthor === null} onClick={e => {
                                if(state.selectedAuthor !== null){
                                    /*setCurrentBook({
                                        ...currentBook,
                                        authors: [...(currentBook.authors), selectedAuthor.name]
                                    });*/
                                    dispatch({
                                        type: 'add_author'                                        
                                    });
                                    /*setCurrentBook(produce(draft => {
                                        draft.authors.push(selectedAuthor.name);
                                    }));
                                    setSelectedAuthor(null);*/
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
                                value={strToGenre(state.currentBook.genre)}
                                onChange={(e, v) => {
                                    /*setCurrentBook({
                                        ...currentBook,
                                        genre : v.name,
                                    });*/
                                    dispatch({
                                        type: 'changed',
                                        key: 'genre',
                                        value: v.name
                                    });
                                    /*setCurrentBook(produce(draft => {
                                        draft.genre = v.name;
                                    }));*/
                                }}
                            />

                    <ValidatedTextField id='year' {...validationContext}></ValidatedTextField>
                    {/* <TextField helperText={godinaErrorState.cause} error={!godinaErrorState.valid} id="year" value={currentBook.year} onChange={generateOnChanged('year')} required={true} onBlur={e => {
                        setGodinaErrorState(validateYear(currentBook.year));
                    }}></TextField> */}
                    <Stack direction={"column"} alignItems={"flex-start"}>
                        <Typography>Ocena: </Typography>
                        <Rating value={state.currentBook.rating} onChange={generateOnChanged('rating')} id='rating' precision={0.5}/>
                    </Stack>
                    <Stack direction={"row"} justifyContent={"flex-end"}>
                        <Button onClick={resetCallback}>Reset</Button>
                        {/*<Button onClick={(e) => {
                            //setCurrentBook(structuredClone(book));
                            dispatch({
                                type: 'reset',
                                value: book
                            });
                            //for(const k in StateIndex){
                            //    StateIndex[k][1](ValidatorIndex[k](book[k]));
                            //  ^^^^^^^^^^^^^^^^ ^^^^^^^^^^^^^^^^^  ^^^^^^
                            //  setter za stanje    Validator za      Vrednost
                            //        validacije     ovu osobinu      za osobinu
                            // }
                        }}>Reset</Button>*/}
                        <Button variant="contained" disabled={!isFormValid()} onClick={e => {
                            let o = structuredClone(state.currentBook);
                            o.authors = JSON.stringify(o.authors);
                            fetcher.submit(o, {
                                method: 'put',
                                action: `/books/${state.currentBook.id}`
                            });
                        }}>Save</Button>
                    </Stack>
                </Stack>
            </Paper>            
        </Container>
    </>
}

export default Book;