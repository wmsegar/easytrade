import {
    DataGrid,
    GridColDef,
    GridRenderCellParams,
    GridToolbarColumnsButton,
    GridToolbarContainer,
    GridToolbarFilterButton,
    GridToolbarQuickFilter,
    GridValueFormatterParams,
    GridValueGetterParams,
} from "@mui/x-data-grid"
import { Stack, Typography } from "@mui/material"
import { Transaction } from "../api/transaction/types"
import { Formatter } from "../contexts/FormatterContext/types"
import { useFormatter } from "../contexts/FormatterContext/context"
import CheckIcon from "@mui/icons-material/Check"
import CloseIcon from "@mui/icons-material/Close"
import AutorenewIcon from "@mui/icons-material/Autorenew"
import { Instrument } from "../api/instrument/types"

function getCoulmnData(
    priceFormatter: Formatter<number>,
    dateFormatter: Formatter<number>
): GridColDef<Transaction>[] {
    return [
        {
            field: "actionType",
            headerName: "Buy/Sell",
            type: "singleSelect",
            valueOptions: ["BUY", "SELL"],
            flex: 1,
            align: "center",
            headerAlign: "center",
        },
        {
            field: "status",
            headerName: "Status",
            type: "singleSelect",
            valueOptions: ["ACTIVE", "SUCCESS", "FAIL"],
            flex: 1.5,
            align: "center",
            headerAlign: "center",
            renderCell: (params: GridRenderCellParams<any, String>) => (
                <Stack direction={"row"}>
                    {params.value === "ACTIVE" ? (
                        <AutorenewIcon fontSize="small" color="info" />
                    ) : params.value === "SUCCESS" ? (
                        <CheckIcon fontSize="small" color="success" />
                    ) : (
                        <CloseIcon fontSize="small" color="error" />
                    )}
                    <Typography
                        variant="body2"
                        color={
                            params.value === "ACTIVE"
                                ? "info.main"
                                : params.value === "SUCCESS"
                                ? "success.main"
                                : "error.main"
                        }
                    >
                        {params.value}
                    </Typography>
                </Stack>
            ),
        },
        {
            field: "instrumentName",
            headerName: "Instrument",
            flex: 2,
            align: "center",
            headerAlign: "center",
        },
        { field: "amount", headerName: "Amount", type: "number", flex: 1.5 },
        {
            field: "price",
            headerName: "Price",
            type: "number",
            flex: 2,
            valueFormatter: ({ value }: GridValueFormatterParams<number>) =>
                priceFormatter(value),
        },
        {
            field: "total",
            headerName: "Total",
            type: "number",
            flex: 2,
            valueGetter: ({
                row: { amount, price },
            }: GridValueGetterParams<Transaction>) => amount * price,
            valueFormatter: ({ value }: GridValueFormatterParams<number>) =>
                priceFormatter(value),
        },
        {
            field: "endTime",
            headerName: "End time",
            type: "dateTime",
            flex: 2,
            align: "center",
            headerAlign: "center",
            valueGetter: ({
                row: { endTime },
            }: GridValueGetterParams<Transaction>) => new Date(endTime),
            valueFormatter: ({ value }: GridValueFormatterParams<Date>) =>
                dateFormatter(value.getTime()),
        },
    ]
}

function CustomToolbar() {
    return (
        <Stack justifyContent="center" alignItems="center" sx={{ m: 1 }}>
            <Typography variant="h6">Transactions</Typography>
            <GridToolbarContainer
                sx={{
                    width: "100%",
                }}
            >
                <GridToolbarColumnsButton />
                <GridToolbarFilterButton />
                <GridToolbarQuickFilter />
            </GridToolbarContainer>
        </Stack>
    )
}

type TransactionsTableProps = {
    transactions: Transaction[]
    instruments: Instrument[]
    disableVirtualization?: boolean
}

export default function TransactionsTable({
    transactions,
    instruments,
    disableVirtualization = false,
}: TransactionsTableProps) {
    const { formatCurrency, formatDate } = useFormatter()
    transactions = transactions.map(transaction => {
        const instrument = instruments.find(x => x.id == transaction.instrumentName)
        if(instrument != undefined) {
            transaction.instrumentName = instrument.name
        }
        return transaction;
    });
    return (
        <DataGrid
            rows={transactions}
            columns={getCoulmnData(formatCurrency, formatDate)}
            slots={{ toolbar: CustomToolbar }}
            autoHeight={true}
            initialState={{
                pagination: { paginationModel: { pageSize: 5 } },
            }}
            pageSizeOptions={[5, 10, 25]}
            disableVirtualization={disableVirtualization}
        />
    )
}


