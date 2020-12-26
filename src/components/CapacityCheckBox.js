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
	},
	formControl: {
		margin: theme.spacing(2),
	},
	formLabel: {
		paddingBottom: theme.spacing(1),
	},
	formGroup: {
		justifySelf: "center",
	},
	formControlLabel: {
		justifySelf: "center",
	},
}))

export default function CapacityCheckBox({
	title,
	options,
	key1,
	data,
	setData,
}) {
	const classes = useStyles()
	return (
		<>
			<div className={classes.root}>
				<FormControl component="fieldset" className={classes.formControl}>
					<FormLabel className={classes.formLabel} component="legend">
						<b>{title}</b>
					</FormLabel>
					<FormGroup className={classes.formGroup}>
						{Object.keys(data[key1][title]).map((option, key) => (
							<FormControlLabel
								className={classes.formControlLabel}
								key={key}
								control={
									<Checkbox
										key={key}
										checked={data[key1][title][option]}
										onChange={(event) => {
											const temp = { ...data }
											temp[key1][title][option] = event.target.checked
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
