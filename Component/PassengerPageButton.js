import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Link from "next/link";
import ViewListIcon from "@mui/icons-material/ViewList";
import IconButton from "@mui/material/IconButton";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

const theme = createTheme({
  palette: {
    primary: {
      main: "#8d6e63",
    },
    secondary: {
      main: "#ffffff",
    },
  },
});

export const PassengerPageButton = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <IconButton
          size="small"
          sx={{ float: "left", marginLeft: "10px" }}
          color="secondary"
          href="/"
        >
          <ArrowBackIosIcon />
          <h5>BACK</h5>
        </IconButton>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <Box
            sx={{
              "& button": { m: 2 },
              backgroundColor: "#ffecb3",
              opacity: [1.0, 1.0, 0.95],
              borderRadius: "10px",
              height: "180px",
              width: "350px",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "42%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <Link href="/Passenger/register">
                <Button
                  variant="contained"
                  fullWidth
                  startIcon={<ViewListIcon />}
                >
                  Create Request
                </Button>
              </Link>
              <Link href="/Passenger/update">
                <Button
                  variant="contained"
                  fullWidth
                  startIcon={<ViewListIcon />}
                >
                  Update Request
                </Button>
              </Link>
            </div>
          </Box>
        </div>
      </ThemeProvider>
    </>
  );
};

export default PassengerPageButton;
