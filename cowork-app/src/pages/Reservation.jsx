import { Box } from "@mui/material";
import ReservationForm from "../components/Form/ReservationForm";
import HeadBar from "../components/HeadBar/HeadBar";
import { useAuth } from "../utils/auth/useAuth";


const Reservation = () => {

  return (
    <>
      <HeadBar />
      <Box sx={{ mt: 10 }}>
        <ReservationForm />
      </Box>
    </>
  );
}


export default Reservation;