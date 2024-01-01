import Grid from "@mui/system/Unstable_Grid/Grid"
import { useNavigate, useParams, useRouteLoaderData } from "react-router-dom"
import FullInstrumentCard from "../../components/instrument/FullInstrumentCard"
import InstrumentTransactions from "../../components/instrument/InstrumentTransactions"
import { InstrumentProvider } from "../../contexts/InstrumentContext/context"
import { useAuthUser } from "../../contexts/UserContext/context"
import { buy, quickBuy, sell, quickSell } from "../../api/transaction/trades"
import { Instrument as InstrumentType } from "../../api/instrument/types"
import { useEffectOnce } from "usehooks-ts"
import { LoaderIds } from "../../router"
import { useInstrumentsQuery } from "../../contexts/QueryContext/instrument/hooks"

export default function Instrument() {
    const { id } = useParams()
    const navigate = useNavigate()
    const { userId } = useAuthUser()
    const instrumentData = useRouteLoaderData(
        LoaderIds.instruments
    ) as InstrumentType[]

    const instruments = useInstrumentsQuery(
        userId,
        instrumentData
    ).data as InstrumentType[]

    const instrument = instruments.find(
        x => x.id == id
    )

    useEffectOnce(() => {
        if (instrument === undefined) {
            navigate("/instruments")
        }
    })
    if (instrument === undefined) {
        return <></>
    }

    return (
        <InstrumentProvider
            userId={userId}
            instrument={instrument}
            quickBuyHandler={quickBuy}
            quickSellHandler={quickSell}
            sellHandler={sell}
            buyHandler={buy}
        >
            <Grid container rowSpacing={3}>
                <Grid xs={12} md={10} mdOffset={1}>
                    <FullInstrumentCard />
                </Grid>
                <Grid xs={12} md={10} mdOffset={1}>
                    <InstrumentTransactions />
                </Grid>
            </Grid>
        </InstrumentProvider>
    )
}
