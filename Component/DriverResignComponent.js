import { Button } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { useForm } from "react-hook-form";
import { Alert } from "react-bootstrap";
import axios from "axios";

const theme = createTheme({
  palette: {
    primary: {
      main: "#263238",
    },
  },
});

function Space() {
  return (
    <Box
      sx={{
        height: 30,
        backgroundColor: (theme) => theme.palette.mode === "none",
      }}
    />
  );
}

function toResign() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (formData) => {
    console.log(formData);
    const { name } = formData;
    axios({
      method: "get",
      url: `http://localhost:8080/drivers?name=${name}`,
    })
      .then((response) => {
        const { data } = response;
        if (data && data.length > 0) {
          axios({
            method: "delete",
            url: `http://localhost:8080/drivers/${data[0].id}`,
          });
        }
      })
      .catch((error) => console.log(error));

    alert("Thanks for joining us before!");
    window.location = "/";
  };

  return (
    <div>
      <p
        style={{
          textAlign: "center",
          textShadow:
            "0 0 10px #f5db8e, 0 0 20px #f5db8e, 0 0 30px #ede0d8, 0 0 40px #f5ede9, 0 0 50px #f5ede9",
          fontFamily: "fantasy",
          fontSize: "30px",
        }}
      >
        <b>RESIGN</b>
      </p>
      <Box
        sx={{
          backgroundColor: "white",
          opacity: [0.9, 0.8, 0.75],
          borderRadius: "10px",
          height: "200px",
          width: "400px",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "58%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <ThemeProvider theme={theme}>
              <Space />
              <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                <AccountCircleIcon sx={{ mr: 1, my: 1 }} />
                <TextField
                  variant="standard"
                  label="Name"
                  size="small"
                  autoComplete="off"
                  {...register("name", { required: true })}
                />
              </Box>
              {errors.name && (
                <Alert variant="danger">
                  {errors.name?.type === "required" && (
                    <h6 style={{ color: "red", margin: "0px" }}>
                      Name is required
                    </h6>
                  )}
                </Alert>
              )}
              <Space />
              <Button sx={{ float: "right" }} type="submit" variant="contained">
                Confirm
              </Button>
            </ThemeProvider>
          </form>
        </div>
      </Box>
    </div>
  );
}

export default toResign;
