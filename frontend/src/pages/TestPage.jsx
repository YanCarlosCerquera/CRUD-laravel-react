import * as React from "react";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import baseUrl from "utilities/baseUrl";
import frontendUrl from "utilities/frontendUrl";
import backendApi from "utilities/apiUrl";
import useCurrentPages from "components/layouts/hooks/currentPagesHook";
import {
  Container,
  Box,
  Grid,
  CssBaseline,
  Paper,
  TextField,
  Typography,
  Button,
  styled,
} from "@mui/material";




const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#dce9ff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const Item2 = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#dce9ff",
  ...theme.typography.body2,
  padding: "30px 30px 0 30px",
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

const buttonStyleSky = () => {
  return {
    bgcolor: "#009dff",
    ":hover": {
      backgroundColor: "#536a8c",
    },
  };
};

const buttonStyleGreen = () => {
  return {
    bgcolor: "#008000",
    ":hover": {
      backgroundColor: "#536a8c",
    },
    marginLeft: "10px",
  };
};

const textFieldStyle = () => {
  return {
    fieldset: {
      borderColor: "#008000!important",
      color: "#008000!important",
    },
    label: {
      color: "#008000",
      ":hover": {
        color: "#009dff!important",
      },
    },
    marginBottom: "30px",
  };
};



const TestPage = () => {
  const {
    currentPages, 
    currentPagesName,
    currentLastPage,
    currentLastPageName,
    currentLastPath,
    currentFirstPath,
    currentIndivPages,
  } = useCurrentPages()

  const [count, setCount] = React.useState(0);
  const [incrementAmount, setIncrementAmount] = React.useState(1);

  const increment = React.useCallback(() => {
    setCount(prevCount => prevCount + 1);
  }, []);

  React.useMemo(() => {
    setCount(prevCount => prevCount + 1);
  }, [incrementAmount]);

  // React.useEffect(() => {
  //   increment()
  // }, [incrementAmount])
  return (
    <>
      <div>
        <button onClick={increment}>Increment</button>
        <p>Count: {count}</p>
        <button onClick={() => setIncrementAmount(incrementAmount + 1)}>
          Increase Increment Amount
        </button>
        <p>Increment Amount: {incrementAmount}</p>
      </div>

      {/* <CssBaseline />
      <Container disableGutters maxWidth="false">
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          minHeight="100vh"
          sx={{
            bgcolor: "#536a8c",
          }}
        >
          <Grid item xs={12} sm={8} md={6} lg={4} xl={4}>
            <Item elevation={4}>
              <Typography
                variant="h4"
                gutterBottom
                sx={{
                  fontWeight: 700,
                  color: "#009dff",
                  paddingBottom: "30px",
                  borderBottom: "1px solid #00800040",
                  marginBottom: "30px",
                }}
              >
                Login
              </Typography>
              <Item2 elevation={2}>
                <TextField
                  type="text"
                  required
                  fullWidth
                  id="username-email"
                  label={"Username or E-mail"}
                  placeholder="Enter username or e-mail"
                  size="small"
                  helperText="Incorrect entry."
                  sx={textFieldStyle}
                />
                <TextField
                  type="password"
                  required
                  // error
                  fullWidth
                  id="password"
                  label={"Password"}
                  placeholder="Enter password"
                  size="small"
                  helperText="Incorrect entry."
                  sx={textFieldStyle}
                />
              </Item2>
              <Box
                display="flex"
                justifyContent="flex-end"
                sx={{ marginTop: "25px" }}
              >
                <Button
                  variant="contained"
                  endIcon={<AppRegistration />}
                  sx={buttonStyleSky}
                  onClick={() => {}}
                >
                  Register Now
                </Button>

                <Button
                  variant="contained"
                  endIcon={<Input />}
                  sx={buttonStyleGreen}
                  onClick={() => myFunction()}
                >
                  Login
                </Button>
              </Box>
            </Item>
          </Grid>
        </Grid>
      </Container> */}





      {/* <Box component="section" sx={{ p: 2, border: "1px dashed grey" }}>
        This Box renders as an HTML section element.
      </Box>

      <Box
        height={200}
        width={200}
        my={4}
        display="flex"
        alignItems="center"
        gap={4}
        p={2}
        sx={{ border: "2px solid grey" }}
      >
        This Box uses MUI System props for quick customization.
      </Box>

      <ThemeProvider
        theme={{
          palette: {
            primary: {
              main: "#007FFF",
              dark: "#0066CC",
            },
          },
        }}
      >
        <Box
          sx={{
            width: 100,
            height: 100,
            borderRadius: 1,
            bgcolor: "primary.main",
            "&:hover": {
              bgcolor: "primary.dark",
            },
          }}
        >
          asdf asdf
        </Box>
      </ThemeProvider>

      <CssBaseline />
      <Container
        disableGutters
        maxWidth="xl"
        sx={{ paddingLeft: 0, paddingRight: 0 }}
      >
        <Box sx={{ bgcolor: "#cfe8fc", height: "100vh" }} />
      </Container>

      <Box
        sx={{ flexGrow: 1, bgcolor: "#536a8c", height: "100vh" }}
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid
          container
          spacing={2}
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item xs={8}>
            <Item>xs=8</Item>
          </Grid>
        </Grid>
      </Box>

      <Paper
        sx={{
          p: 2,
          margin: "auto",
          maxWidth: 500,
          flexGrow: 1,
          backgroundColor: (theme) =>
            theme.palette.mode === "dark" ? "#1A2027" : "#fff",
        }}
      >
        <Grid container spacing={2}>
          <Grid item>
            <ButtonBase sx={{ width: 128, height: 128 }}>
              <Img alt="complex" src="/static/images/grid/complex.jpg" />
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="subtitle1" component="div">
                  Standard license
                </Typography>
                <Typography variant="body2" gutterBottom>
                  Full resolution 1920x1080 • JPEG
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  ID: 1030114
                </Typography>
              </Grid>
              <Grid item>
                <Typography sx={{ cursor: "pointer" }} variant="body2">
                  Remove
                </Typography>
              </Grid>
            </Grid>
            <Grid item>
              <Typography variant="subtitle1" component="div">
                $19.00
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Paper>

      <Stack
        direction="column"
        spacing={2}
        maxWidth="100%"
        sx={{
          bgcolor: "#536a8c",
        }}
        justifyContent="center"
        alignItems="center"
      >
        <Item>Item 1</Item>
      </Stack> */}



      <CssBaseline />
      <Container 
        maxWidth="false" 
        disableGutters
      >
        <Grid 
          container 
          minHeight="100vh" 
          bgcolor="green"
          display='flex'
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <Grid 
            item 
            xs={12}
          >
            <Box 
              display="flex" 
              justifyContent='center' 
              alignItems='center'  
              textAlign="center"
              sx={{
                flexFlow: 'row',
                width: '400px', 
                height: '400px', 
                backgroundColor: 'blue', 
                margin: 0, 
                padding: 0,
              }}>

                <Typography 
                  variant="h6" 
                  backgroundColor="red"
                  sx={{
                    width: '50px', 
                    flexGrow: 1,
                    alignSelf: 'center',
                    justifySelf: 'center'
                  }} 
                >
                  H61
                </Typography>
                <Typography 
                  variant="h6" 
                  flexGrow={1}
                  sx={{
                    width: '50px'
                  }}  
                  backgroundColor="green"
                >
                  H62
                </Typography>
                <Typography 
                  variant="h6" 
                  sx={{
                    width: '50px'
                  }} 
          
                  backgroundColor="white"
                >
                  H63
                </Typography>
                <Typography 
                  variant="h6" 
                  sx={{
                    width: '50px',
                    flexGrow:0
                  }} 
      
                  backgroundColor="pink"
                >
                  H64
                </Typography>
                <Typography 
                  variant="h6" 
                  sx={{
                    width: '50px'
                  }} 
      
                  backgroundColor="purple"
                >
                  H65
                </Typography>
                <Typography 
                  variant="h6" 
                  sx={{
                    width: '50px'
                  }} 
         
                  backgroundColor="gray"
                >
                  H66
                </Typography>
                <Typography 
                  variant="h6" 
                  sx={{
                    width: '50px'
                  }} 
          
                  backgroundColor="magenta"
                >
                  H67
                </Typography>
                <Typography 
                  variant="h6" 
                  sx={{
                    width: '50px'
                  }} 
      
                  backgroundColor="orange"
                >
                  H68
                </Typography>
                <Typography 
                  variant="h6" 
                  sx={{
                    width: '50px'
                  }} 
  
                  backgroundColor="brown"
                >
                  H69
                </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>


      <Box
      component="form"
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)', // 3 equal columns
        gap: 2, // 16px gap between items (8px * 2)
        width: '100%',
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        label="Item 1"
        variant="outlined"
        sx={{
          gridColumn: 'span 1',
        }}
      />
      <TextField
        label="Item 2"
        variant="outlined"
        sx={{
          gridColumn: 'span 1',
        }}
      />
      <TextField
        label="Item 3"
        variant="outlined"
        sx={{
          gridColumn: 'span 1',
        }}
      />
      <TextField
        label="Item 4"
        variant="outlined"
        sx={{
          gridColumn: 'span 1',
        }}
      />
      <TextField
        label="Item 5"
        variant="outlined"
        sx={{
          gridColumn: 'span 1',
        }}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        sx={{
          gridColumn: 'span 3',
          marginTop: 2,
        }}
      >
        Submit
      </Button>
    </Box>




      {baseUrl}<br />
      {frontendUrl}<br />
      {backendApi}<br />
      {currentPages}<br />
      {currentPagesName}<br />
      {currentLastPage}<br />
      {currentLastPageName}<br />
      {currentIndivPages}<br />
      {currentLastPath}<br />
      {currentFirstPath}<br />
    </>
  );
};

export default TestPage;
