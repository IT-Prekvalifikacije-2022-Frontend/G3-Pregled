import { napraviAutore } from "./tekstAlati"
import './Books.css';
import { Link } from "react-router-dom";
import { Box, Button, Card, CardActions, CardContent, CardHeader, Rating, Stack, Typography } from "@mui/material";
import { Link as MLink } from "@mui/material"

/*const BookCard = ({book}) => {
    return <div className="book_card">
        <div className="book_title_container"><p className="book_title">{book.title}</p></div>
        <div className="book_info">
            <div className="book_info_detail">{napraviAutore(book.authors)}</div>
            <div className="book_info_detail">{book.genre}</div>
            <div className="book_info_detail"><Rating value={book.rating} precision={0.5}/></div>
            <div className="book_details_link"><Link to={`/books/${book.id}`}>Detalji...</Link></div>
        </div>
    </div>
}*/

const BookCard = ({book}) => {
    return <Card sx={{display: 'flex', flexDirection:'column', justifyContent: 'space-between'}}>
        <CardContent>
            <Stack spacing={1}>
                <Typography align='center' fontWeight={700}>{book.title}</Typography>
                <Typography align='center'>{napraviAutore(book.authors)}</Typography>
                <Typography align='center'>{book.genre}</Typography>
                <Rating sx={{alignSelf: 'center'}} value={book.rating} precision={0.5}/>
            </Stack>
        </CardContent>
        <CardActions sx={{justifyContent: "flex-end"}}>
            <Button component={Link} to={`/books/${book.id}`}>Detalji...</Button>
        </CardActions>
    </Card>
}

export default BookCard;