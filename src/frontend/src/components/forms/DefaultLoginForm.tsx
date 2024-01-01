import { zodResolver } from "@hookform/resolvers/zod"
import { Button, CardActions } from "@mui/material"
import Grid from "@mui/material/Unstable_Grid2"
import { useForm } from "react-hook-form"
import { FormContainer, SelectElement } from "react-hook-form-mui"
import { z } from "zod"
import { PresetUser } from "../../api/user/types"

const formSchema = z.object({
    userId: z.string(),
})

type FormData = z.infer<typeof formSchema>

interface DefaultLoginFormProps {
    submitHandler: (data: FormData) => void
    users: PresetUser[]
}

export default function DefaultLoginForm({
    submitHandler,
    users,
}: DefaultLoginFormProps) {
    const formContext = useForm<FormData>({
        defaultValues: {
            userId: users[0]?.id,
        },
        resolver: zodResolver(formSchema),
    })

    const { watch } = formContext

    function onSubmit(data: FormData) {
        submitHandler(data)
    }

    return (
        <Grid container spacing={2}>
            <FormContainer onSuccess={onSubmit} formContext={formContext}>
                <Grid>
                    <SelectElement
                        label="User"
                        name="userId"
                        fullWidth
                        options={users.map(({ id, firstName, lastName }) => ({
                            id: id,
                            label: `${firstName} ${lastName}`,
                        }))}
                        sx={{
                            minWidth: "150px",
                        }}
                        disabled={users.length === 0}
                    />
                </Grid>
                <Grid>
                    <CardActions sx={{ justifyContent: "center" }}>
                        <Button
                            type="submit"
                            variant="outlined"
                            disabled={users.length === 0}
                        >
                            Log in as{" "}
                            {users.find((user) => user.id === watch("userId"))
                                ?.firstName ?? "User"}
                        </Button>
                    </CardActions>
                </Grid>
            </FormContainer>
        </Grid>
    )
}
