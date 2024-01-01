import { zodResolver } from "@hookform/resolvers/zod"
import {
    Button,
    CardActions,
    IconButton,
    InputAdornment,
    TextField,
    Typography,
} from "@mui/material"
import { useForm } from "react-hook-form"
import {
    CheckboxElement,
    FormContainer,
    SelectElement,
    TextFieldElement,
} from "react-hook-form-mui"
import { z } from "zod"
import isCreditCard from "validator/lib/isCreditCard"
import { useEffect } from "react"
import { NumberFormField } from "../NumberFormField"
import CheckboxLabel from "../CheckboxLabel"
import { useAuthUserData } from "../../contexts/UserContext/hooks"
import Grid from "@mui/material/Unstable_Grid2"
import StatusDisplay from "../StatusDisplay"
import useStatusDisplay from "../../hooks/useStatusDisplay"
import { LoadingButton } from "@mui/lab"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useAuthUser } from "../../contexts/UserContext/context"
import { WithdrawHandler } from "../../api/creditCard/withdraw/types"
import { Edit } from "@mui/icons-material"
import { balanceInvalidateQuery } from "../../contexts/QueryContext/user/queries"

const formSchema = z.object({
    amount: z
        .number({ required_error: "Amount is required" })
        .positive("Amount must be greater than 0"),
    cardholderName: z.string().min(1, "Cardholder name is required"),
    address: z.string().min(1, "Address is required"),
    email: z.string().min(1, "Email is required").email("Invalid email"),
    cardNumber: z
        .string()
        .min(1, "Card number is required")
        .refine(isCreditCard, "Invalid credit card number"),
    cardType: z.string().min(1, "Must set card type"),
    agreementCheck: z
        .boolean()
        .refine((checked) => checked, "Must agree to terms and conditions"),
})

export type FormData = z.infer<typeof formSchema>

const defaultValues: FormData = {
    amount: 0,
    cardholderName: "",
    address: "",
    email: "",
    cardNumber: "",
    cardType: "",
    agreementCheck: false,
}

type DepositFormProps = {
    submitHandler: WithdrawHandler
}

export default function WithdrawForm({ submitHandler }: DepositFormProps) {
    const authUserData = useAuthUserData()
    const user = authUserData.user, balance = authUserData.balance
    const { userId } = useAuthUser()

    const formContext = useForm<FormData>({
        defaultValues,
        resolver: zodResolver(formSchema),
        resetOptions: {
            keepDefaultValues: true,
        },
    })
    const { watch, reset, setValue, getValues } = formContext

    const { setError, setSuccess, resetStatus, statusContext } =
        useStatusDisplay()

    function autofillForm() {
        if (getValues().amount === defaultValues.amount) {
            setValue("amount", 1000, {
                shouldValidate: true,
            })
        }
        setValue("cardholderName", user?.firstName + " " + user?.lastName, {
            shouldValidate: true,
        })
        setValue("address", user?.address ?? "Kochweg 4 01510 Kronach", {
            shouldValidate: true,
        })
        setValue("email", user?.email ?? "mockemail@mail.com", {
            shouldValidate: true,
        })
        setValue("cardNumber", "2293562484488276", {
            shouldValidate: true,
        })
        setValue("cardType", "visaDebit", {
            shouldValidate: true,
        })
        setValue("agreementCheck", true, {
            shouldValidate: true,
        })
    }

    function autofillCardNumber() {
        setValue("cardNumber", "2293562484488276", {
            shouldValidate: true,
        })
    }

    const queryClient = useQueryClient()
    const { mutate, isLoading } = useMutation({
        mutationFn: async ({
            cardholderName: name,
            agreementCheck,
            ...rest
        }: FormData) => {
            const { error } = await submitHandler({
                name,
                accountId: Number(userId),
                ...rest,
            })
            if (error !== undefined) {
                throw error
            }
        },
        onMutate: resetStatus,
        onSuccess: () => {
            setSuccess("Withdraw successful")
            balanceInvalidateQuery(queryClient)
            reset()
        },
        onError: setError,
    })

    useEffect(() => {
        const { unsubscribe } = watch(() => {
            resetStatus()
        })
        return unsubscribe
    }, [watch])

    return (
        <Grid container rowSpacing={2}>
            <FormContainer
                onSuccess={async (data: FormData) => mutate(data)}
                formContext={formContext}
            >
                <Grid>
                    <TextField
                        name="balance"
                        label="Current balance"
                        value={balance?.value ?? 'Loading...'}
                        disabled
                        fullWidth
                    />
                </Grid>
                <Grid>
                    <NumberFormField
                        id="amount"
                        name="amount"
                        label="Amount"
                        type="number"
                        required
                        autoFocus
                        fullWidth
                    />
                </Grid>
                <Grid>
                    <TextFieldElement
                        id="cardholderName"
                        name="cardholderName"
                        label="Cardholder name"
                        required
                        fullWidth
                    />
                </Grid>
                <Grid>
                    <TextFieldElement
                        id="address"
                        name="address"
                        label="Address"
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
                    <TextFieldElement
                        id="cardNumber"
                        name="cardNumber"
                        label="Card number"
                        required
                        fullWidth
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={autofillCardNumber}
                                        edge="end"
                                    >
                                        <Edit />
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>
                <Grid>
                    <SelectElement
                        id="cardType"
                        label="Card type"
                        name="cardType"
                        required
                        fullWidth
                        options={[
                            {
                                id: "visaDebit",
                                label: "Visa Debit",
                            },
                            {
                                id: "visaCredit",
                                label: "Visa Credit",
                            },
                            {
                                id: "mastercard",
                                label: "Mastercard",
                            },
                            {
                                id: "americanExpress",
                                label: "American Express",
                            },
                        ]}
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
                            loading={isLoading}
                            type="submit"
                            variant="outlined"
                        >
                            Withdraw
                        </LoadingButton>
                        <Button
                            type="button"
                            variant="outlined"
                            onClick={autofillForm}
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
