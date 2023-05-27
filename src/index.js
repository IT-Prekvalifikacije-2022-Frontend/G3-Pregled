import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Navigate, RouterProvider, createBrowserRouter, useRouteError } from 'react-router-dom';
import Books from './Books';
import Genres from './Genres';
import Authors from './Authors';
import Genre from './Genre';
import NewGenre from './NewGenre';
import Author from './Author';
import NewAuthor from './NewAuthor';
import Book from './Book';
import { check_login, get_login } from './login_logic';
import {Box, Container, Stack, Typography } from '@mui/material';

const ErrorDisplay = ({entity}) => {
  const error = useRouteError();
  if(error.cause === 'login'){
    return <Navigate to="/"/>;
  }
  return <Container>
    <Stack direction={'column'} spacing={1}>
      <Typography variant='h4'>Desila se greška u učitavanju {entity}</Typography>
      <Typography>
      Jako nam je žao. Da li ste pokrenuli back-end server, možda? 
      </Typography>
      <Typography variant='h6'>Interna greška je: </Typography>
      <Box>
        <pre>
          {error.message}          
        </pre>
      </Box>
    </Stack>
  </Container>
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
          const user = check_login();
          let b = await fetch("http://localhost:8080/api/v1/book");
          let bb = await b.json();
          let g = await fetch("http://localhost:8080/api/v1/genre");
          let gg = await g.json();
          return [bb, gg];
        },
        errorElement: <ErrorDisplay entity="knjiga"/>
      },
      {
        path: "genres",
        element: <Genres/>,
        errorElement: <ErrorDisplay entity="žanrova"/>,
        loader: async () => {
          const user = check_login();
          return fetch("http://localhost:8080/api/v1/genre");
        }
      },
      {
        path: "genres/:id",
        element: <Genre></Genre>,
        errorElement: <ErrorDisplay entity="žanrova"/>,
        loader: async ({params}) => {
          const user = check_login();
          return fetch(`http://localhost:8080/api/v1/genre/${params.id}`);
        },
        action: async ({params, request}) => {
          const user = check_login();
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
        errorElement: <ErrorDisplay entity="žanrova"/>,
        action: async ({request}) => {
          const user = check_login();
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
        errorElement: <ErrorDisplay entity="pisaca"/>,
        loader: async () => {
          const user = check_login();
          return fetch("http://localhost:8080/api/v1/author");
        }
      },
      {
        path: "authors/:id",
        element: <Author/>,
        errorElement: <ErrorDisplay entity="pisaca"/>,
        loader: async ({params}) => {
          const user = check_login();
          return fetch(`http://localhost:8080/api/v1/author/${params.id}`);
        },
        action: async ({params, request}) => {
          const user = check_login();
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
        errorElement: <ErrorDisplay entity="pisaca"/>,
        action: async ({request}) => {
          const user = check_login();
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
      {
        path: "books/:id",
        element: <Book></Book>,
        errorElement: <ErrorDisplay entity="pisaca"/>,
        loader: async ({params}) => {
          const user = check_login();
          let b = await fetch(`http://localhost:8080/api/v1/book/${params.id}`);
          let bb = await b.json();
          let g = await fetch('http://localhost:8080/api/v1/genre/');
          let gg = await g.json();
          let a = await fetch('http://localhost:8080/api/v1/author/');
          let aa = await a.json();
          return [bb, gg, aa];
        },
        action: async ({params, request}) => {
          if(request.method === 'DELETE'){
            return fetch(`http://localhost:8080/api/v1/book/${params.id}`, {
              method: 'DELETE'
            });
          }else if(request.method === 'PUT'){
            let data = Object.fromEntries(await request.formData());
            data.authors = JSON.parse(data.authors);
            console.log(JSON.stringify(data, null, 4));
            return fetch(`http://localhost:8080/api/v1/book/${params.id}`, {
              method: 'PUT',
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