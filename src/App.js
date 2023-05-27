import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { AppBar, Box, Divider, Drawer, IconButton, Stack, Toolbar, Typography, Button, createTheme, ThemeProvider, CssBaseline, FormGroup, FormControlLabel, Switch} from "@mui/material";
import { ChevronLeft, Menu, Mood } from "@mui/icons-material";
import { createContext, useMemo, useState } from "react";
import { prvo_veliko } from "./tekstAlati";
import { useLogin } from "./login_logic";
import LoginControl from "./LoginControl";

const create_palette = (mode) => {
  let r = {};
  if(mode === 'light'){
    r = {
      mode: mode,
      primary: {
        main: "#009127"
      },
      divider: "#00300d",
      text: {
        primary: "#00000",
        secondary: "#424242"
      }
    }
  }else{
    r = {
      mode: mode,
      primary: {
        main: "#e68e00"
      },
      divider: "#663f00",
      text: {
        primary: "#EEEEEE",
        secondary: "#A0A0A0"
      }
    }
  }
  return {
    palette: r
  }
}

export const UserContext = createContext(null);

function App() {
  const [otvoreno, setOtvoreno] = useState(false);
  const [mode, setMode] = useState('light');
  const theme = useMemo(() => createTheme(create_palette(mode)), [mode]);
  const [user, login, logout] = useLogin();
  const nav = useNavigate();
  const loc = useLocation();
  return <>
    <ThemeProvider theme={theme}>
      <UserContext.Provider value={{user, login, logout}}>
      <CssBaseline/>
      <Stack direction="column">
        <AppBar sx={{ height: "60px", flexDirection: "row" }}>
          <Toolbar>
            <IconButton
              onClick={e => {
                setOtvoreno(!otvoreno);
              }}
            >
              <Menu />
            </IconButton>
          </Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, textAlign: 'center', lineHeight: 2.5 }}>Pregled Knjiga <Mood /> </Typography>
          <Typography sx={{lineHeight: 2.5, paddingRight: "30px"}}>{(user) ? `Zdravo ${user.name}` : "Molimo ulogujte se"}</Typography>
        </AppBar>
        <Drawer
          anchor="left"
          open={otvoreno}
          onClose={e => setOtvoreno(false)}
        >
          <Box>
            <IconButton onClick={e => setOtvoreno(false)}>
              <ChevronLeft />
            </IconButton>
          </Box>
          <Divider />
              <LoginControl safePath="/" defaultPath="/books"/>
          <Divider />
              <Box>
                <FormGroup>
                  <FormControlLabel 
                    label={prvo_veliko(mode)} 
                    control={<Switch checked={mode === 'dark'} onChange={e => {
                      if(e.target.checked){
                        setMode('dark');
                      }else{
                        setMode('light');
                      }
                    }}/>}
                  />
                </FormGroup>
              </Box>
          <Divider />
          <Stack direction="column" spacing={1}>
            <Button component={NavLink} to={'books'}>Knjige</Button>
            <Button component={NavLink} to={'genres'}>Žanrovi</Button>
            <Button component={NavLink} to={'authors'}>Autori</Button>
          </Stack>
        </Drawer>
        <Box sx={{ paddingTop: "60px" }}>
          <Outlet />
        </Box>
      </Stack>
      </UserContext.Provider>
    </ThemeProvider>
  </>;
  /*return <>
    <div className="app_container">
      <h1>Pregled Knjiga :) </h1>
      <aside className="sidenav_container">
        <ul className="sidenav_list">
          <li className="sidenav_list_item"><NavLink className="sidenav_navlink" to="books">Knjige</NavLink></li>
          <li className="sidenav_list_item"><NavLink className="sidenav_navlink" to="genres">Žanrovi</NavLink></li>
          <li className="sidenav_list_item"><NavLink className="sidenav_navlink" to="authors">Autori</NavLink></li>
        </ul>
      </aside>
      <div className="app_content">
        <Outlet/>
      </div>
    </div>
  </>;*/
}

export default App;
