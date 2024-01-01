import Grid from "@mui/system/Unstable_Grid/Grid"
import InstrumentsGrid from "../../components/instrument/InstrumentsGrid"
import { useAuthUser } from "../../contexts/UserContext/context"
import { useRouteLoaderData } from "react-router-dom"
import { Instrument } from "../../api/instrument/types"
import { LoaderIds } from "../../router"
import { useInstrumentsQuery } from "../../contexts/QueryContext/instrument/hooks"

export default function InstrumentsPage() {
    const { userId } = useAuthUser()
    const instrumentData = useRouteLoaderData(
        LoaderIds.instruments
    ) as Instrument[]

    const instruments = useInstrumentsQuery(
        userId,
        instrumentData
    ).data as Instrument[]


    return (
        <Grid container sx={{ margin: 1 }}>
            <Grid xs={12} md={10} mdOffset={1} xl={8} xlOffset={2}>
                <InstrumentsGrid instruments={instruments} />
            </Grid>
        </Grid>
    )
}
