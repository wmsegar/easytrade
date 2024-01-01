import { CardActions } from "@mui/material"
import Grid from "@mui/material/Unstable_Grid2"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { FormContainer, TextFieldElement } from "react-hook-form-mui"
import useStatusDisplay from "../../hooks/useStatusDisplay"
import StatusDisplay from "../StatusDisplay"
import { LoadingButton } from "@mui/lab"
import { useMutation } from "@tanstack/react-query"
import { useEffect } from "react"
import { SignupHandler } from "../../api/signup/types"

const formSchema = z
    .object({
        firstName: z.string().min(1, "First name is required"),
        lastName: z.string().min(1, "Last name is required"),
        login: z.string().min(1, "Login is required"),
        email: z.string().min(1, "Email is required").email("Invalid email"),
        address: z.string().min(1, "Address is required"),
        password: z.string().min(1, "Password is required"),
        repeatPassword: z.string().min(1, "Password is required"),
    })
    .refine((data) => data.password === data.repeatPassword, {
        message: "Passwords have to match",
        path: ["repeatPassword"],
    })

type FormData = z.infer<typeof formSchema>

const defaultValues: FormData = {
    firstName: "",
    lastName: "",
    login: "",
    email: "",
    address: "",
    password: "",
    repeatPassword: "",
}

type SignupFormProps = {
    submitHandler: SignupHandler
}

export default function SignupForm({ submitHandler }: SignupFormProps) {
    const formContext = useForm<FormData>({
        defaultValues,
        resolver: zodResolver(formSchema),
    })
    const { reset, watch } = formContext
    const { setError, setSuccess, resetStatus, statusContext } =
        useStatusDisplay()

    const { mutate, isLoading } = useMutation({
        mutationFn: async ({ repeatPassword, ...data }: FormData) => {
            const { error } = await submitHandler(data)
            if (error !== undefined) {
                throw error
            }
        },
        onMutate: resetStatus,
        onSuccess: () => {
            setSuccess("User created successfully. You may now login.")
            reset()
        },
        onError: setError,
    })

    useEffect(() => {
        const { unsubscribe } = watch((data, { type }) => {
            if (type === "change") {
                resetStatus()
            }
        })
        return unsubscribe
    }, [watch])

    return (
        <FormContainer
            onSuccess={async (data: FormData) => mutate(data)}
            formContext={formContext}
        >
            <Grid container rowSpacing={2} maxWidth={300}>
                <Grid xs={12}>
                    <TextFieldElement
                        name="firstName"
                        label="First name"
                        fullWidth
                    />
                </Grid>
                <Grid xs={12}>
                    <TextFieldElement
                        name="lastName"
                        label="Last name"
                        fullWidth
                    />
                </Grid>
                <Grid xs={12}>
                    <TextFieldElement name="login" label="Login" fullWidth />
                </Grid>
                <Grid xs={12}>
                    <TextFieldElement name="email" label="Email" fullWidth />
                </Grid>
                <Grid xs={12}>
                    <TextFieldElement
                        name="address"
                        label="Address"
                        fullWidth
                    />
                </Grid>
                <Grid xs={12}>
                    <TextFieldElement
                        name="password"
                        label="Password"
                        type="password"
                        fullWidth
                    />
                </Grid>
                <Grid xs={12}>
                    <TextFieldElement
                        name="repeatPassword"
                        label="Repeat password"
                        type="password"
                        fullWidth
                    />
                </Grid>
                <Grid xs={12}>
                    <CardActions sx={{ justifyContent: "center" }}>
                        <LoadingButton
                            loading={isLoading}
                            type="submit"
                            variant="outlined"
                        >
                            Sign up
                        </LoadingButton>
                    </CardActions>
                </Grid>
                <Grid xs={12}>
                    <StatusDisplay {...statusContext} />
                </Grid>
            </Grid>
        </FormContainer>
    )
}
