import { Card, CardContent, Link, Stack } from "@mui/material"
import { Link as RouterLink } from "react-router-dom"
import { signup } from "../../api/signup/signup"
import SignupForm from "../../components/forms/SignupForm"

export default function Signup() {
    return (
        <Card
            sx={{
                width: "30%",
                margin: "auto",
                padding: 2,
                minWidth: "300px",
            }}
        >
            <CardContent>
                <Stack spacing={2} alignItems="center" justifyContent="center">
                    <SignupForm submitHandler={signup} />

                    <Link component={RouterLink} to="/login">
                        Log in
                    </Link>
                </Stack>
            </CardContent>
        </Card>
    )
}
