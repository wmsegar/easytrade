import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Chip,
    Stack,
    Tooltip,
    Typography,
} from "@mui/material"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import Grid from "@mui/material/Unstable_Grid2"
import { LoadingButton } from "@mui/lab"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { featureFlagKeys } from "../../contexts/QueryContext/featureFlag/queries"
import { handleFlagToggle } from "../../api/featureFlags/problemPatterns"
import { Dispatch } from "react"
import { Action } from "./FeatureFlagList"
import { useConfigFlagsQuery } from "../../contexts/QueryContext/featureFlag/hooks"
import { ConfigDefaults } from "../../api/featureFlags/types"

export default function FeatureFlagItem({
    flagId,
    name,
    description,
    enabled,
    expanded,
    dispatchHandler,
}: {
    flagId: string
    name: string
    description?: string
    enabled: boolean
    expanded: boolean
    dispatchHandler: Dispatch<Action>
}) {
    const queryClient = useQueryClient()
    const { mutate, isLoading } = useMutation({
        mutationFn: async () => {
            const { error } = await handleFlagToggle(flagId, !enabled)
            if (error !== undefined) {
                throw error
            }
        },
        onMutate: () => {
            return { enabled: !enabled }
        },
        onSuccess: async (data, vars, context) => {
            await queryClient.invalidateQueries({
                queryKey: featureFlagKeys.problemPatterns,
                exact: true,
            })
            dispatchHandler({
                type: "success",
                msg: `Flag ${name} ${
                    context?.enabled ? "enabled" : "disabled"
                } successfully.`,
            })
        },
        onError: async (error: string, vars, context) => {
            console.error(error)
            dispatchHandler({
                type: "error",
                msg: `Error while ${
                    context?.enabled ? "enabling" : "disabling"
                } flag ${name}: ${error}.`,
            })
        },
    })

    const { data: config } = useConfigFlagsQuery()

    const displayName = name
        .split("_")
        .map(([head, ...tail]) => `${head.toUpperCase()}${tail.join("")}`)
        .join(" ")

    return (
        <Accordion
            expanded={expanded}
            onChange={() => dispatchHandler({ type: "expand", target: name })}
        >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Stack
                    sx={{ width: "100%", mr: 2 }}
                    direction={"row"}
                    alignContent={"center"}
                    alignItems={"center"}
                    justifyContent={"space-between"}
                >
                    <Typography>{displayName}</Typography>
                    <Chip
                        label={enabled ? "enabled" : "disabled"}
                        color={enabled ? "success" : "default"}
                    />
                </Stack>
            </AccordionSummary>
            <AccordionDetails>
                <Grid container spacing={2}>
                    <Grid xs={10}>
                        <Typography>
                            {description ??
                                "There is no description for this flag currently."}
                        </Typography>
                    </Grid>
                    <Grid
                        xs={2}
                        justifyContent={"right"}
                        display={"flex"}
                        alignContent={"flex-start"}
                        alignItems={"flex-start"}
                    >
                        <Tooltip
                            title="Managing flags on frontend has been disabled in this environment"
                            disableHoverListener={config?.featureFlagManagement}
                        >
                            <span>
                                <LoadingButton
                                    onClick={() => mutate()}
                                    loading={isLoading}
                                    variant="outlined"
                                    color={enabled ? "error" : "success"}
                                    disabled={!config?.featureFlagManagement}
                                >
                                    {enabled ? "Disable" : "Enable"}
                                </LoadingButton>
                            </span>
                        </Tooltip>
                    </Grid>
                </Grid>
            </AccordionDetails>
        </Accordion>
    )
}
