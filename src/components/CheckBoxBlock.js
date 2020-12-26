import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import {
	Input,
	InputLabel,
	MenuItem,
	FormControl,
	ListItemText,
	Select,
	Checkbox,
	Chip,
} from "@material-ui/core"
import CheckboxesGroup from "./CheckBoxesGroup"

const useStyles = makeStyles((theme) => ({
	formControl: {
		margin: theme.spacing(1),
		minWidth: 200,
		maxWidth: 300,
	},
	chips: {
		display: "flex",
		flexWrap: "wrap",
	},
	chip: {
		margin: 2,
	},
	noLabel: {
		marginTop: theme.spacing(3),
	},
	territories: {
		display: "flex",
		flexWrap: "wrap",
	},
}))

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			minwidth: 250,
		},
	},
}
const territories = {
	"UK & Northern Ireland": false,
	EMEA: false,
	"Europe ex EU": false,
	US: false,
	APAC: false,
	Worldwide: false,
}
export default function CheckboxBlock({ title, options, data, setData }) {
	const classes = useStyles()
	// const [subClass, setsubClass] = React.useState(Object.keys(data))
	const handleChange = (event) => {
		let temp = { ...data }
		event.target.value.forEach(
			(sub) =>
				(temp[sub] = {
					territory: {
						"UK & Northern Ireland": false,
						EMEA: false,
						"Europe ex EU": false,
						US: false,
						APAC: false,
						Worldwide: false,
					},
				})
		)
		setData(temp)
	}
	return (
		<>
			<div>
				<FormControl className={classes.formControl}>
					<InputLabel id="demo-mutiple-chip-label">{title}</InputLabel>
					<Select
						labelId="demo-mutiple-chip-label"
						id="demo-mutiple-chip"
						multiple
						value={Object.keys(data)}
						onChange={handleChange}
						input={<Input id={options[0]} />}
						renderValue={(selected) => (
							<div className={classes.chips}>
								{selected.map((value) => (
									<Chip key={value} label={value} className={classes.chip} />
								))}
							</div>
						)}
						MenuProps={MenuProps}
					>
						{options.map((name) => (
							<MenuItem key={name} value={name}>
								<Checkbox checked={Object.keys(data).indexOf(name) > -1} />
								<ListItemText primary={name} />
							</MenuItem>
						))}
					</Select>
				</FormControl>
			</div>
			{Object.keys(data).length !== 0 && (
				<div>
					<hr />
					<h3>Territories</h3>
					<hr />
					<div className={classes.territories}>
						{Object.keys(data).map((subclass, key) => (
							<CheckboxesGroup
								key={key}
								title={subclass}
								options={territories}
								data={data}
								setData={setData}
							/>
						))}
					</div>
				</div>
			)}
		</>
	)
}
