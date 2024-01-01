import Grid from "@mui/system/Unstable_Grid"
import VersionsTable from "../components/version/VersionsTable"
import { useVersionsQuery } from "../contexts/QueryContext/version/hooks"
import { Box, CircularProgress } from "@mui/material"
import { getFrontendVersion } from "../api/version/versions"

export default function Version() {
    const { isLoading, data: versions } = useVersionsQuery()
    if (isLoading) {
        return (
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="70vh"
            >
                <CircularProgress color="inherit" />
            </Box>
        )
    }
    return (
        <Grid container>
            <Grid lgOffset={2} lg={8} mdOffset={1} md={10} xsOffset={0} xs={12}>
                <VersionsTable
                    versions={[getFrontendVersion(), ...(versions ?? [])]}
                />
            </Grid>
        </Grid>
    )
}
