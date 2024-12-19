import { Box } from "@mui/material";
import LoginForm from "../components/Form/LoginForm"
import HeadBar from "../components/HeadBar/HeadBar";

const Login = () => {
    return (
        <>
            <HeadBar />
            <Box >
                <LoginForm />
            </Box>
        </>
    );
}



export default Login;