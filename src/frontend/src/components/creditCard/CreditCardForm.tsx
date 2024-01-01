import { useForm } from "react-hook-form"
import { z } from "zod"
import Grid from "@mui/material/Unstable_Grid2"
import {
    CheckboxElement,
    FormContainer,
    SelectElement,
    TextFieldElement,
} from "react-hook-form-mui"
import { Button, CardActions, Typography } from "@mui/material"
import { LoadingButton } from "@mui/lab"
import { useAuthUser } from "../../contexts/UserContext/context"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import useStatusDisplay from "../../hooks/useStatusDisplay"
import StatusDisplay from "../StatusDisplay"
import CheckboxLabel from "../CheckboxLabel"
import { zodResolver } from "@hookform/resolvers/zod"
import { useAuthUserData } from "../../contexts/UserContext/hooks"
import { orderCreditCard } from "../../api/creditCard/order"
import { CreditCardLevel } from "../../api/backend/creditCard"
import { newCardOrderInvalidateQuery } from "../../contexts/QueryContext/creditCard/queries"

const formSchema = z.object({
    name: z.string().min(1, "Cardholder name is required."),
    address: z.string().min(1, "Cardholder address is required."),
    email: z
        .string()
        .min(1, "Email is required.")
        .email("Provide a valid email"),
    type: z.string().min(1, "Card type is required."),
    agreementCheck: z
        .boolean()
        .refine((checked) => checked, "Must agree to terms and conditions"),
})

type FormData = z.infer<typeof formSchema>

export default function CreditCardForm() {
    const { userId } = useAuthUser()
    const authUserData = useAuthUserData()
    const user = authUserData.user, balance = authUserData.balance
    const formContext = useForm<FormData>({
        defaultValues: {
            name: "",
            address: "",
            type: "",
            agreementCheck: false,
        },
        resolver: zodResolver(formSchema),
    })
    const { setError, setSuccess, resetStatus, statusContext } =
        useStatusDisplay()

    function autofill() {
        if (user === undefined) {
            setError("Couldn't get proper data to fill form.")
            return
        }
        const { setValue } = formContext
        setValue("name", `${user.firstName} ${user.lastName}`, {
            shouldValidate: true,
        })
        setValue("address", user.address, { shouldValidate: true })
        setValue("type", "silver", { shouldValidate: true })
        setValue("email", user.email, { shouldValidate: true })
        setValue("agreementCheck", true, { shouldValidate: true })
    }
    const queryClient = useQueryClient()
    const { mutate, isLoading } = useMutation({
        mutationFn: async ({ address, name, type, email }: FormData) => {
            const cardLevel = type as CreditCardLevel
            const response = await orderCreditCard(userId, {
                cardLevel,
                email,
                name,
                shippingAddress: address,
            })
            if (response.type === "error") {
                throw response.error
            }
            return { orderId: response.creditCardOrderId }
        },
        onMutate: resetStatus,
        onSuccess: async ({ orderId }) => {
            setSuccess(`Card orderred successfully. Order ID: ${orderId}`)
            formContext.reset()
            await newCardOrderInvalidateQuery(queryClient)
        },
        onError: setError,
    })

    return (
        <Grid container rowSpacing={2}>
            <FormContainer
                formContext={formContext}
                onSuccess={(data: FormData) => mutate(data)}
            >
                <Grid>
                    <TextFieldElement
                        id="name"
                        name="name"
                        label="Cardholder name"
                        required
                        fullWidth
                    />
                </Grid>
                <Grid>
                    <TextFieldElement
                        id="address"
                        name="address"
                        label="Cardholder address"
                        required
                        fullWidth
                    />
                </Grid>
                <Grid>
                    <TextFieldElement
                        id="email"
                        name="email"
                        label="Email"
                        required
                        fullWidth
                    />
                </Grid>
                <Grid>
                    <SelectElement
                        id="type"
                        name="type"
                        label="Card type"
                        required
                        fullWidth
                        options={[
                            { id: "silver", label: "Silver" },
                            { id: "gold", label: "Gold" },
                            { id: "platinum", label: "Platinum" },
                        ]}
                        sx={{ minWidth: "150px" }}
                    />
                </Grid>
                <Grid>
                    <CheckboxElement
                        id="agreement"
                        name="agreementCheck"
                        label={
                            <CheckboxLabel
                                text="Agree to terms and conditions *"
                                hasErrors={
                                    !!formContext.formState.errors
                                        .agreementCheck
                                }
                            />
                        }
                        required
                    />
                </Grid>
                <Grid>
                    <Typography variant="body2">* Required field</Typography>
                </Grid>
                <Grid>
                    <CardActions sx={{ justifyContent: "center" }}>
                        <LoadingButton
                            id="submitButton"
                            type="submit"
                            variant="outlined"
                            loading={isLoading}
                        >
                            Order card
                        </LoadingButton>
                        <Button
                            type="button"
                            variant="outlined"
                            onClick={autofill}
                        >
                            Autofill
                        </Button>
                    </CardActions>
                </Grid>
                <Grid>
                    <StatusDisplay {...statusContext} />
                </Grid>
            </FormContainer>
        </Grid>
    )
}
