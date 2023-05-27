import { useState } from "react";

export const useLogin = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
    return [
        user, 
        (username, password) => {
            //Ovde bi poslali na back-end zahtev za logovanjem, a ovde samo simuliramo
            if(username === 'veljko' && password === 'veljko'){
                const nuser = {
                    username: 'veljko',
                    name: 'Veljko Petrović',
                    token: 'deepSecrets'
                };
                setUser(nuser);
                localStorage.setItem('user', JSON.stringify(nuser));
                return nuser;
            }else{
                return null;
            }
        },
        () => {
            setUser(null);
            localStorage.removeItem('user');
        }
    ]
}

export const get_login = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    return user;
}

export const check_login = () => {
    const user = get_login();
          if(user === null){
            const err = {
              cause: 'login',
              message: 'Korisnik nije logovan'
            };
            throw err;
          }
    return user;
}