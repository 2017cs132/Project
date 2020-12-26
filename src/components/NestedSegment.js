import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import { List, ListItem, ListItemText, Collapse } from "@material-ui/core"
import { ExpandLess, ExpandMore } from "@material-ui/icons"
import SegmentCheckBoxes from "./SegmentCheckBoxes"

const useStyles = makeStyles((theme) => ({
	nested: {
		paddingLeft: theme.spacing(4),
	},
}))

export default function NestedSegment({ listTitle, data, setData }) {
	const classes = useStyles()
	const [open, setOpen] = React.useState(false)
	const handleClick = () => {
		setOpen(!open)
	}

	return (
		<>
			<ListItem button onClick={handleClick}>
				<ListItemText primary={listTitle} />
				{open ? <ExpandLess /> : <ExpandMore />}
			</ListItem>
			<Collapse in={open} timeout="auto" unmountOnExit>
				{Object.keys(data[listTitle]).map((level1Child, key) => (
					<List key={key} component="div" disablePadding>
						<ListItem button className={classes.nested}>
							<ListItemText primary={level1Child} />
						</ListItem>
						{Object.keys(data[listTitle][level1Child]).map(
							(level2Child) => (
								<ListItem key={key + level2Child}>
									<SegmentCheckBoxes
										title={level2Child}
										level0Child={listTitle}
										level1Child={level1Child}
										data={data}
										setData={setData}
									/>
								</ListItem>
							)
						)}
					</List>
				))}
			</Collapse>
		</>
	)
}
