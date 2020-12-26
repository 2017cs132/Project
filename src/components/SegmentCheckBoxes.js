import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import {
	FormLabel,
	FormControl,
	FormGroup,
	FormControlLabel,
	Checkbox,
} from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
		justifyContent: "center",
	},
	formControl: {
		margin: theme.spacing(2),
	},
	formLabel: {
		paddingBottom: theme.spacing(1),
	},
}))

export default function SegmentCheckBoxes({
	title,
	level0Child,
	level1Child,
	data,
	setData,
}) {
	const classes = useStyles()
	const checkedBoxData = data[level0Child][level1Child][title]

	return (
		<>
			<div className={classes.root}>
				<FormControl component="fieldset" className={classes.formControl}>
					<FormLabel className={classes.formLabel} component="legend">
						<b>{title}</b>
					</FormLabel>
					<FormGroup>
						{Object.keys(checkedBoxData).map((option, key) => (
							<FormControlLabel
								key={key}
								control={
									<Checkbox
										key={key}
										checked={checkedBoxData[option]}
										onChange={(event) => {
											let temp = { ...data }
											temp[level0Child][level1Child][title][option] =
												event.target.checked
											setData(temp)
										}}
										name={option}
									/>
								}
								label={option}
							/>
						))}
					</FormGroup>
				</FormControl>
			</div>
		</>
	)
}
