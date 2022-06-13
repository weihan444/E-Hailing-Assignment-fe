import TextField from "@mui/material/TextField";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Box from "@mui/material/Box";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Button } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Link from "next/link";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Alert } from "react-bootstrap";
import dynamic from "next/dynamic";
import axios from "axios";

const PrismaZoom = dynamic(() => import("react-prismazoom"), { ssr: false });

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

const DriverPageComponent = () => {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (formData) => {
    console.log(formData);
    const { name, capacity } = formData;
    axios({
      method: "post",
      url: "http://localhost:8080/drivers",
      data: { name, capacity, longitude: x, latitude: y },
    })
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          height: "calc(100vh - 80px)",
          width: "calc(100vh - 80px)",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          margin: "15px",
          position: "absolute",
          left: "25%",
          top: "50%",
          transform: "translate(-50%,-50%)",
        }}
      >
        <PrismaZoom
          style={{
            display: "block",
            width: "100%",
            height: "100%",
          }}
          maxZoom="8"
        >
          <LocationOnIcon
            sx={{
              position: "absolute",
              left: `${x}px`,
              top: `${y}px`,
              transform: "translate(-50%, -95%)",
              color: "orange",
            }}
          />
          <img
            src="erangel.jpg"
            alt="test"
            height="100%"
            onMouseDownCapture={(e) => {
              setX(e.nativeEvent.offsetX);
              setY(e.nativeEvent.offsetY);
            }}
          />
        </PrismaZoom>
      </div>

      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "70%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <Box
          sx={{
            backgroundColor: "white",
            opacity: [0.9, 0.8, 0.75],
            borderRadius: "10px",
            height: "400px",
            width: "400px",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "42%",
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
                <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                  <DirectionsCarIcon sx={{ mr: 1, my: 1 }} />
                  <FormControl fullWidth>
                    <InputLabel
                      variant="standard"
                      htmlFor="uncontrolled-native"
                    >
                      Capacity
                    </InputLabel>
                    <NativeSelect
                      defaultValue={1}
                      {...register("capacity", { required: true })}
                    >
                      <option value={1}>1</option>
                      <option value={2}>2</option>
                      <option value={3}>3</option>
                      <option value={4}>4</option>
                      <option value={5}>5</option>
                      <option value={6}>6</option>
                    </NativeSelect>
                  </FormControl>
                </Box>
                <Space />
                <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                  <LocationOnIcon sx={{ mr: 1, my: 1 }} />
                  <Box>
                    <TextField
                      variant="standard"
                      label="Longitude"
                      size="small"
                      value={x}
                      {...register("longitude", { required: true })}
                    />
                    <TextField
                      variant="standard"
                      label="Latitude"
                      size="small"
                      value={y}
                      {...register("latitude", { required: true })}
                    />
                  </Box>
                </Box>
                <Space />
                <Button
                  sx={{ float: "right" }}
                  type="submit"
                  variant="contained"
                >
                  Add
                </Button>
              </ThemeProvider>
            </form>
          </div>
        </Box>

        <div
          style={{
            color: "black",
            float: "right",
            marginRight: "20px",
            textShadow:
              "0 0 10px #ebd9ce, 0 0 20px #ebd9ce, 0 0 30px #ede0d8, 0 0 40px #f5ede9, 0 0 50px #f5ede9",
          }}
        >
          <Link href="/Driver/resign">
            <a>
              <b>
                <u>To Resign . . .</u>
              </b>
            </a>
          </Link>
        </div>
      </div>
    </>
  );
};

export default DriverPageComponent;
