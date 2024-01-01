import {
    Backdrop,
    Card,
    CircularProgress,
    IconButton,
    Stack,
    Typography,
} from "@mui/material"
import FeatureFlagList from "../components/featureFlags/FeatureFlagList"
import Grid from "@mui/system/Unstable_Grid"
import { useProblemFlagsQuery } from "../contexts/QueryContext/featureFlag/hooks"
import ReplayIcon from "@mui/icons-material/Replay"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { featureFlagKeys } from "../contexts/QueryContext/featureFlag/queries"
import { delay } from "../api/util"

export default function FeatureFlags() {
    const { data: flags } = useProblemFlagsQuery()
    const queryClient = useQueryClient()
    const { mutate, isLoading } = useMutation({
        mutationFn: async () => {
            await Promise.all([
                delay(500),
                queryClient.refetchQueries({ queryKey: featureFlagKeys.all }),
            ])
        },
    })

    return (
        <>
            <Grid container>
                <Grid smOffset={1} sm={10}>
                    <Stack direction="column" spacing={2}>
                        <Card sx={{ padding: 2 }}>
                            <Typography>
                                Feature flags (or problem patterns) are used to
                                enable or disable specific problem simulation in
                                EasyTrade application. Each feature flag
                                (problem pattern) comes with its own description
                                of what parts of the application are affected
                                and what symptoms should be expected.
                            </Typography>
                        </Card>
                        <Stack
                            sx={{ width: "100%" }}
                            direction="row"
                            justifyContent={"right"}
                        >
                            <IconButton onClick={() => mutate()}>
                                <ReplayIcon />
                            </IconButton>
                        </Stack>
                        <FeatureFlagList featureFlags={flags ?? []} />
                    </Stack>
                </Grid>
            </Grid>
            <Backdrop
                open={isLoading}
                sx={{
                    color: "#fff",
                }}
            >
                <CircularProgress />
            </Backdrop>
        </>
    )
}
