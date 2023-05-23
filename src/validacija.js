// Godina je konvertabilna u int, mora biti pozitivna, i mora biti u rasponu od 1 do koja god da je trenutna godina
export const validateYear = (y) => {
    const current = new Date().getFullYear();
    const re = /^\d{1,4}$/;
    if(re.test(y)){
        const yy = Number.parseInt(y);
        if(!isNaN(yy)){
            if(yy < 0){                
                return {valid: false, cause: "Godina mora biti pozitivna."};
            }
            if(yy > current){
                return {valid: false, cause: "Godina ne sme biti u budućnosti."};
            }
            return {valid: true, cause: "Godina"};
        }else{
            return {valid: false, cause: "Godina se sastoji samo od brojeva i mora biti pozitivna.X"};
        }
    }else{
        return {valid: false, cause: "Godina se sastoji samo od brojeva i mora biti pozitivna."};
    }
}

export const validateTitle = (t) => {
    if(t === ""){
        return {valid: false, cause: "Naslov mora da postoji. Koristiti 'untitled' za dela bez naslova."};
    }else{
        return {valid: true, cause: "Naslov"};
    }    
}

export const validateISBN = (i) => {
    const re = /^\d{13}$/;
    const weights = [1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1];
    if(re.test(i)){
        const test = i
        .split("")
        .map((v, index) => Number.parseInt(v) * weights[index])
        .reduce((s, v) => s + v, 0) % 10;
        if(test === 0){
            return {valid: true, cause: "ISBN"};
        }else{
            return {valid: false, cause: "ISBN ne ispunjava uslov kontrolne cifre"};
        }
    }else{
        return {valid: false, cause: "ISBN mora da bude tačno 13 cifara."};
    }
}