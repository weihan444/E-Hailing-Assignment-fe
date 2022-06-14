import { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Button } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useForm } from "react-hook-form";
import { Alert } from "react-bootstrap";
import axios from "axios";
import { useRouter } from "next/router";
import Clock from "react-live-clock";

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

const PassengerPageComponent = () => {
  const [startX, setStartX] = useState(337);
  const [startY, setStartY] = useState(337);
  const [endX, setEndX] = useState(337);
  const [endY, setEndY] = useState(337);
  const [start, setStart] = useState(true);
  const router = useRouter();

  const clickStartHandler = () => {
    setStart(true);
  };

  const clickEndHandler = () => {
    setStart(false);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (formData) => {
    const { name, capacity, time } = formData;
    const expected_time = new Date();
    expected_time.setTime(expected_time.getTime() + time * 1000);
    console.log(expected_time);
    const hours = expected_time.getHours();
    const minutes = expected_time.getMinutes();
    const seconds = expected_time.getSeconds();
    axios({
      method: "post",
      url: "http://localhost:8080/customers",
      data: {
        name,
        capacity,
        expected_arrival_time: `${hours < 10 ? "0" + hours : hours}:${
          minutes < 10 ? "0" + minutes : minutes
        }:${seconds < 10 ? "0" + seconds : seconds}`,
        longitude: startX,
        latitude: startY,
        dest_longitude: endX,
        dest_latitude: endY,
      },
    })
      .then((response) => {
        console.log(response);
        const { data } = response;
        router.push({
          pathname: "/Passenger/choose-driver",
          query: data,
        });
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <Clock
        format="HH:mm:ss"
        ticking={true}
        style={{
          position: "fixed",
          top: "0px",
          right: "0px",
          backgroundColor: "white",
          borderRadius: "5px 5px 5px 5px",
          fontSize: "2vw",
          padding: "5px",
        }}
      />
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
            width: "674px",
            height: "674px",
          }}
          maxZoom="8"
        >
          <LocationOnIcon
            sx={{
              position: "absolute",
              left: `${startX}px`,
              top: `${startY}px`,
              transform: "translate(-50%, -95%)",
              color: "powderblue",
              pointerEvents: "none",
            }}
          />
          <LocationOnIcon
            sx={{
              position: "absolute",
              left: `${endX}px`,
              top: `${endY}px`,
              transform: "translate(-50%, -95%)",
              color: "greenyellow",
              pointerEvents: "none",
            }}
          />
          <img
            src="erangel.jpg"
            alt="test"
            height="100%"
            onMouseDownCapture={(e) => {
              if (start) {
                setStartX(e.nativeEvent.offsetX);
                setStartY(e.nativeEvent.offsetY);
              } else {
                setEndX(e.nativeEvent.offsetX);
                setEndY(e.nativeEvent.offsetY);
              }
            }}
          />
        </PrismaZoom>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            backgroundColor: "white",
            opacity: 0.95,
            borderRadius: "10px",
            height: "660px",
            width: "400px",
            position: "absolute",
            left: "70%",
            top: "50%",
            transform: "translate(-50%,-50%)",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <form onSubmit={handleSubmit(onSubmit)}>
              <ThemeProvider theme={theme}>
                <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                  <PersonIcon sx={{ mr: 1, my: 1 }} />
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
                  <PersonIcon sx={{ mr: 1, my: 1 }} />
                  <TextField
                    variant="standard"
                    label="Expected Time (Minutes)"
                    size="small"
                    autoComplete="off"
                    defaultValue={0}
                    {...register("time", { required: true })}
                  />
                </Box>
                <Space />
                <p style={{ margin: "0px" }}>
                  <i>
                    <MyLocationIcon sx={{ mr: 0, my: 0, fontSize: "18px" }} />
                    From ... ?
                  </i>
                </p>
                <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                  <Box>
                    <TextField
                      variant="standard"
                      label="Longitude"
                      size="small"
                      value={startX}
                      {...register("longitude", { required: true })}
                    />
                    <TextField
                      variant="standard"
                      label="Latitude"
                      size="small"
                      value={startY}
                      {...register("latitude", { required: true })}
                    />
                    <Button
                      sx={{
                        float: "right",
                        marginTop: "5px",
                      }}
                      variant="contained"
                      onClick={clickStartHandler}
                      size="small"
                    >
                      Set location
                    </Button>
                  </Box>
                </Box>
                <Space />
                <p style={{ margin: "0px" }}>
                  <i>
                    <LocationOnIcon sx={{ mr: 0, my: 0, fontSize: "20px" }} />{" "}
                    To ... ?
                  </i>
                </p>
                <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                  <Box>
                    <TextField
                      variant="standard"
                      label="Longitude"
                      size="small"
                      value={endX}
                      {...register("dest_longitude", { required: true })}
                    />
                    <TextField
                      variant="standard"
                      label="Latitude"
                      size="small"
                      value={endY}
                      {...register("dest_latitude", { required: true })}
                    />
                    <Button
                      sx={{
                        float: "right",
                        marginTop: "5px",
                      }}
                      variant="contained"
                      onClick={clickEndHandler}
                      size="small"
                    >
                      Set Location
                    </Button>
                  </Box>
                </Box>
                <Space />
                <Link href="/">
                  <Button sx={{ float: "left" }} variant="contained">
                    Back
                  </Button>
                </Link>
                <Button
                  sx={{ float: "right" }}
                  type="submit"
                  variant="contained"
                >
                  Next
                </Button>
              </ThemeProvider>
            </form>
          </div>
        </Box>
      </div>
    </>
  );
};

export default PassengerPageComponent;
