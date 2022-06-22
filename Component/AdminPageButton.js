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
      main: "#66686b",
    },
    secondary: {
      main: "#ffffff",
    },
  },
});

export const AdminPageButton = () => {
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
            width: "300px",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <Box
            sx={{
              "& button": { m: 2 },
              backgroundColor: "rgb(255,255,255,0.6)",
              borderRadius: "10px",
              height: "180px",
              width: "280px",
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
              <Link href="/Admin/request-list">
                <Button
                  variant="contained"
                  fullWidth
                  startIcon={<ViewListIcon />}
                >
                  Request List
                </Button>
              </Link>
              <Link href="/Admin/driver-list">
                <Button
                  variant="contained"
                  fullWidth
                  startIcon={<ViewListIcon />}
                >
                  Driver List
                </Button>
              </Link>
            </div>
          </Box>
        </div>
      </ThemeProvider>
    </>
  );
};

export default AdminPageButton;
