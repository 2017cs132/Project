import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import { ListSubheader, List } from "@material-ui/core"
import NestedSegment from "./NestedSegment"

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
		justifyContent: "center",
	},
	list: {
		width: "100%",
		maxWidth: 360,
		backgroundColor: theme.palette.background.paper,
	},
	nested: {
		paddingLeft: theme.spacing(4),
	},
}))

export default function TargetSegment({ data, setData }) {
	const classes = useStyles()

	return (
		<div className={classes.root}>
			<List
				key="TargetSegment"
				component="nav"
				aria-labelledby="nested-list-subheader"
				subheader={
					<ListSubheader component="div" id="nested-list-subheader">
						Target Segment
					</ListSubheader>
				}
				className={classes.list}
			>
				{Object.keys(data).map((value, key) => (
					<NestedSegment
						listTitle={value}
						data={data}
						setData={setData}
						key={key}
					/>
				))}
			</List>
		</div>
	)
}
