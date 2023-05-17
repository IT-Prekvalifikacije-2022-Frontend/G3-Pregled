import { napraviAutore } from "./tekstAlati"
import './Books.css';

const BookCard = ({book}) => {
    return <div className="book_card">
        <div className="book_title_container"><p className="book_title">{book.title}</p></div>
        <div className="book_info">
            <div className="book_info_detail">{napraviAutore(book.authors)}</div>
            <div className="book_info_detail">{book.genre}</div>
            <div className="book_info_detail">{book.rating.toFixed(2)}</div>
        </div>
    </div>
}

export default BookCard;