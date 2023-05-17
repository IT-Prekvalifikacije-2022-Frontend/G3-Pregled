import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { RouterProvider, createBrowserRouter, useRouteError } from 'react-router-dom';
import Books from './Books';
import Genres from './Genres';
import Authors from './Authors';
import Genre from './Genre';
import NewGenre from './NewGenre';
import Author from './Author';
import NewAuthor from './NewAuthor';

const BookError = () => {
  const error = useRouteError();
  return <div className='error_message'>
    <h2>Desila se greška u učitavanju knjiga</h2>
    <p>Jako nam je žao. Da li ste pokrenuli back-end server, možda?</p>
    <h3>Interna greška je: </h3>
    <pre>
      {error.message}
    </pre>
  </div>
}

const GenreError = () => {
  const error = useRouteError();
  return <div className='error_message'>
    <h2>Desila se greška u učitavanju žanrova</h2>
    <p>Jako nam je žao. Da li ste pokrenuli back-end server, možda?</p>
    <h3>Interna greška je: </h3>
    <pre>
      {error.message}
    </pre>
  </div>
}

const AuthorError = () => {
  const error = useRouteError();
  return <div className='error_message'>
    <h2>Desila se greška u učitavanju pisaca.</h2>
    <p>Jako nam je žao. Da li ste pokrenuli back-end server, možda?</p>
    <h3>Interna greška je: </h3>
    <pre>
      {error.message}
    </pre>
  </div>
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      {
        path: "books",
        element: <Books/>,
        loader: async () => {
          let b = await fetch("http://localhost:8080/api/v1/book");
          let bb = await b.json();
          let g = await fetch("http://localhost:8080/api/v1/genre");
          let gg = await g.json();
          return [bb, gg];
        },
        errorElement: <BookError/>        
      },
      {
        path: "genres",
        element: <Genres/>,
        errorElement: <GenreError/>,
        loader: async () => {
          return fetch("http://localhost:8080/api/v1/genre");
        }
      },
      {
        path: "genres/:id",
        element: <Genre></Genre>,
        errorElement: <GenreError/>,
        loader: async ({params}) => {
          return fetch(`http://localhost:8080/api/v1/genre/${params.id}`);
        },
        action: async ({params, request}) => {
          if(request.method === 'DELETE'){
            return fetch(`http://localhost:8080/api/v1/genre/${params.id}`, {
              method: 'DELETE'
            });
          }else if(request.method === 'PUT'){
            const data = Object.fromEntries(await request.formData());
            return fetch(`http://localhost:8080/api/v1/genre/${params.id}`, {
              method: 'PUT',
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(data)
            });
          }
        }
      },
      {
        path: "genres/new",
        element: <NewGenre/>,
        errorElement: <GenreError/>,
        action: async ({request}) => {
          if(request.method === 'POST'){
            const data = Object.fromEntries(await request.formData());
            return fetch(`http://localhost:8080/api/v1/genre`, {
              method: 'POST',
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(data)
            });
          }
        }
      },
      {
        path: "authors",
        element: <Authors/>,
        errorElement: <AuthorError/>,
        loader: async () => {
          return fetch("http://localhost:8080/api/v1/author");
        }
      },
      {
        path: "authors/:id",
        element: <Author/>,
        errorElement: <AuthorError/>,
        loader: async ({params}) => {
          return fetch(`http://localhost:8080/api/v1/author/${params.id}`);
        },
        action: async ({params, request}) => {
          if(request.method === 'DELETE'){
            return fetch(`http://localhost:8080/api/v1/author/${params.id}`, {
              method: 'DELETE'
            });
          }else if(request.method === 'PUT'){
            const data = Object.fromEntries(await request.formData());
            return fetch(`http://localhost:8080/api/v1/author/${params.id}`, {
              method: 'PUT',
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(data)
            });
          }
        }
      },
      {
        path: "authors/new",
        element: <NewAuthor/>,
        errorElement: <AuthorError/>,
        action: async ({request}) => {
          if(request.method === 'POST'){
            const data = Object.fromEntries(await request.formData());
            return fetch(`http://localhost:8080/api/v1/author`, {
              method: 'POST',
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(data)
            });
          }
        }
      },
    ]
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);