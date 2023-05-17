export const napraviAutore = (auth) => {
    let authors = [...auth];
    if(authors.length === 0){
        return "Anonymous";
    }else if(authors.length === 1){
        return authors[0];
    }else{
        let last = authors.pop();
        console.log(last);
        let r = authors.join(", ");
        return r + " & " + last;
    }
}

export const lc_match = (x, q) => {
    return x.toLowerCase().includes(q.toLowerCase());
}