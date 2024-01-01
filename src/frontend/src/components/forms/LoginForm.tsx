import { CardActions } from "@mui/material"
import Grid from "@mui/material/Unstable_Grid2"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { FormContainer, TextFieldElement } from "react-hook-form-mui"
import { useEffect } from "react"
import { LoginHandler } from "../../api/login/types"
import useStatusDisplay from "../../hooks/useStatusDisplay"
import { useMutation } from "@tanstack/react-query"
import StatusDisplay from "../StatusDisplay"
import { LoadingButton } from "@mui/lab"
import { logoutInvalidateQuery } from "../../contexts/QueryContext/user/queries"
import { queryClient } from "../../contexts/QueryContext/QueryContext"

const formSchema = z.object({
    login: z.string().min(1, "Login is required"),
    password: z.string().min(1, "Password is required"),
})

type FormData = z.infer<typeof formSchema>

const defaultValues: FormData = {
    login: "",
    password: "",
}

type LoginFormProps = {
    submitHandler: LoginHandler
}

export default function LoginForm({ submitHandler }: LoginFormProps) {
    const formContext = useForm<FormData>({
        defaultValues,
        resolver: zodResolver(formSchema),
    })
    const { watch } = formContext
    const { setError, resetStatus, statusContext } = useStatusDisplay()

    const { mutate, isLoading } = useMutation({
        mutationFn: async ({ login, password }: FormData) => {
            const { error } = await submitHandler(login, password)
            if (error !== undefined) {
                throw error
            }
        },
        onMutate: resetStatus,
        onError: setError,
    })

    useEffect(() => {
        const { unsubscribe } = watch(() => {
            resetStatus()
        })
        return unsubscribe
    }, [watch])

    return (
        <Grid container spacing={2}>
            <FormContainer
                onSuccess={async (data: FormData) => mutate(data)}
                formContext={formContext}
            >
                <Grid>
                    <TextFieldElement id="login" name="login" label="Login" />
                </Grid>
                <Grid>
                    <TextFieldElement
                        id="password"
                        name="password"
                        label="Password"
                        type="password"
                    />
                </Grid>
                <Grid>
                    <CardActions sx={{ justifyContent: "center" }}>
                        <LoadingButton
                            id="submitButton"
                            loading={isLoading}
                            type="submit"
                            variant="outlined"
                        >
                            Login
                        </LoadingButton>
                    </CardActions>
                </Grid>
                <Grid>
                    <StatusDisplay {...statusContext} />
                </Grid>
            </FormContainer>
        </Grid>
    )
}
