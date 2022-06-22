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
import dynamic from "next/dynamic";
import { useForm } from "react-hook-form";
import { Alert } from "react-bootstrap";
import axios from "axios";
import { useRouter, withRouter } from "next/router";
import Clock from "react-live-clock";
import IconButton from "@mui/material/IconButton";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import EmojiPeopleIcon from "@mui/icons-material/EmojiPeople";

const PrismaZoom = dynamic(() => import("react-prismazoom"), { ssr: false });

const theme = createTheme({
  palette: {
    primary: {
      main: "#263238",
    },
    secondary: {
      main: "#ffffff",
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

const PassengerPageComponent = (props) => {
  const [startX, setStartX] = useState(337);
  const [startY, setStartY] = useState(337);
  const [endX, setEndX] = useState(337);
  const [endY, setEndY] = useState(337);
  const [start, setStart] = useState(true);
  const { id } = props.router.query;
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
    const hours = expected_time.getHours();
    const minutes = expected_time.getMinutes();
    const seconds = expected_time.getSeconds();
    if (id) {
      axios({
        method: "patch",
        url: `http://localhost:8080/customers/${id}`,
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
    } else {
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
    }
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <IconButton
          size="small"
          sx={{ float: "left", marginLeft: "10px" }}
          color="secondary"
          href="/Passenger"
        >
          <ArrowBackIosIcon />
          <h5>BACK</h5>
        </IconButton>
        <Clock
          format="HH:mm:ss"
          ticking={true}
          style={{
            position: "fixed",
            top: "0px",
            right: "0px",
            backgroundColor: "white",
            borderRadius: "20px",
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
            <EmojiPeopleIcon
              sx={{
                position: "absolute",
                left: `${startX}px`,
                top: `${startY}px`,
                transform: "translate(-50%, -195%)",
                color: "powderblue",
                pointerEvents: "none",
              }}
            />
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
              src="../erangel.jpg"
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
              height: "450px",
              width: "370px",
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
                  <FormControl sx={{ width: "80px", paddingRight: "10px" }}>
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
                  <AccessTimeIcon sx={{ mr: 1, my: 1 }} />
                  <TextField
                    sx={{ width: "80px" }}
                    variant="standard"
                    label="Time (sec)"
                    size="small"
                    autoComplete="off"
                    {...register("time", {
                      pattern: {
                        value: /^[0-9]+$/,
                      },
                      required: true,
                    })}
                  />
                </Box>
                {errors.time && (
                  <Alert variant="danger">
                    {errors.time?.type === "pattern" && (
                      <h6
                        style={{ color: "red", margin: "0px", float: "right" }}
                      >
                        Please enter number only
                      </h6>
                    )}
                  </Alert>
                )}
                {errors.time && (
                  <Alert variant="danger">
                    {errors.time?.type === "required" && (
                      <h6
                        style={{ color: "red", margin: "0px", float: "right" }}
                      >
                        Estimate time is required
                      </h6>
                    )}
                  </Alert>
                )}

                <Space />
                <p style={{ margin: "0px" }}>
                  <i>
                    <MyLocationIcon sx={{ mr: 0, my: 0, fontSize: "18px" }} />
                    From ... ?
                  </i>
                </p>
                <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                  <TextField
                    sx={{ paddingRight: "10px", width: "80px" }}
                    variant="standard"
                    label="Longitude"
                    size="small"
                    value={startX}
                  />
                  <TextField
                    sx={{ paddingRight: "10px", width: "80px" }}
                    variant="standard"
                    label="Latitude"
                    size="small"
                    value={startY}
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
                    Set
                  </Button>
                </Box>
                <Space />
                <p style={{ margin: "0px" }}>
                  <i>
                    <LocationOnIcon sx={{ mr: 0, my: 0, fontSize: "20px" }} />{" "}
                    To ... ?
                  </i>
                </p>
                <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                  <TextField
                    sx={{ paddingRight: "10px", width: "80px" }}
                    variant="standard"
                    label="Longitude"
                    size="small"
                    value={endX}
                  />
                  <TextField
                    sx={{ paddingRight: "10px", width: "80px" }}
                    variant="standard"
                    label="Latitude"
                    size="small"
                    value={endY}
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
                    Set
                  </Button>
                </Box>
                <Space />
                <Button
                  sx={{ float: "right" }}
                  type="submit"
                  variant="contained"
                >
                  Confirm
                </Button>
              </form>
            </div>
          </Box>
        </div>
      </ThemeProvider>
    </>
  );
};

export default withRouter(PassengerPageComponent);
