import React, { useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import { Paper, Grid, Button } from "@material-ui/core"
import CheckboxBlock from "./CheckBoxBlock"
import TargetSegment from "./TargetSegment"
import propertySegmentData from "../constants/propertySegmentData"
import casualtySegmentData from "../constants/casualtySegmentData"
import CapacityPerRisk from "./CapacityPerRisk"

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	paper: {
		padding: theme.spacing(1),
		textAlign: "center",
		color: theme.palette.text.secondary,
	},
	Button: {
		margin: theme.spacing(2),
	},
}))
const propertyBusinessOpt = [
	"Material Damage",
	"Business Interuption",
	"Goods in Transit",
	"Property Owners",
	"Real Estate",
]
const casualtyBusinessOpt = [
	"Employee Liability",
	"Public Liability",
	"Product Liability",
	"Cyber Liability",
]
export default function MainGrid() {
	const classes = useStyles()
	const [propertyData, setPropertyData] = useState(propertySegmentData)
	const [casualtyData, setCasualtyData] = useState(casualtySegmentData)

	const [propertyRisk, setPropertyRisk] = useState({})
	const [casualtyRisk, setCasualtyRisk] = useState({})

	const [propertySubClass, setPropertySubclass] = React.useState({})
	const [casualtySubClass, setCasultySubclass] = React.useState({})
	// console.log(propertySubClass)
	function BusinessSubClass() {
		return (
			<React.Fragment>
				<Grid item xs>
					<Paper elevation={3} className={classes.paper}>
						<h2>PROPERTY</h2>
						<CheckboxBlock
							title="Sub Class of Business"
							options={propertyBusinessOpt}
							data={propertySubClass}
							setData={setPropertySubclass}
						/>
					</Paper>
				</Grid>
				<Grid item xs>
					<Paper elevation={3} className={classes.paper}>
						<h2>CASUALTY</h2>
						<CheckboxBlock
							title="Sub Class of Business"
							options={casualtyBusinessOpt}
							data={casualtySubClass}
							setData={setCasultySubclass}
						/>
					</Paper>
				</Grid>
			</React.Fragment>
		)
	}
	const generateCapacity = () => {
		const temp1 = {}
		Object.keys(propertyData).forEach((key1) => {
			const temp = {}
			Object.keys(propertyData[key1]).forEach((key2) =>
				Object.keys(propertyData[key1][key2]).forEach((key3) =>
					Object.keys(propertyData[key1][key2][key3]).forEach((key4) => {
						if (propertyData[key1][key2][key3][key4] === true) {
							temp[key4] = {
								"£0 - £5m": false,
								"£5 - £10m": false,
								"£10 - £25m": false,
								"£25 - £50m": false,
								"£50 - £75m": false,
								"£75 - £100m": false,
							}
						}
					})
				)
			)
			if (Object.keys(temp).length > 0) temp1[key1] = temp
		})
		setPropertyRisk(temp1)

		const temp2 = {}
		Object.keys(casualtyData).forEach((key1) => {
			const temp = {}
			Object.keys(casualtyData[key1]).forEach((key2) =>
				Object.keys(casualtyData[key1][key2]).forEach((key3) =>
					Object.keys(casualtyData[key1][key2][key3]).forEach((key4) => {
						if (casualtyData[key1][key2][key3][key4] === true) {
							temp[key4] = {
								"£0 - £5m": false,
								"£5 - £10m": false,
								"£10 - £25m": false,
								"£25 - £50m": false,
								"£50 - £75m": false,
								"£75 - £100m": false,
							}
						}
					})
				)
			)
			if (Object.keys(temp).length > 0) temp2[key1] = temp
		})
		setCasualtyRisk(temp2)
	}
	const submitButton = () => {
		const riskAppetite = [
			{
				classOfBusiness: "Property",
				subClassOfBusiness: [],
			},
			{
				classofBusiness: "Casualty",
				subClassOfBusiness: [],
			},
		]
		// Property Data Filteration
		Object.keys(propertySubClass).forEach((subclass, i) => {
			riskAppetite[0].subClassOfBusiness.push({ name: subclass, territory: [] })
			riskAppetite[0].subClassOfBusiness[i]["territory"] = Object.keys(
				propertySubClass[subclass]["territory"]
			)
				.filter((ter) => propertySubClass[subclass]["territory"][ter] === true)
				.map((item) => ({ name: item }))

			riskAppetite[0].subClassOfBusiness[i]["targetSegment"] = []
			Object.keys(propertyRisk).forEach((prop, j) => {
				riskAppetite[0].subClassOfBusiness[i]["targetSegment"][j] = {
					name: prop,
					list: [],
				}

				riskAppetite[0].subClassOfBusiness[i]["targetSegment"][
					j
				].list = Object.keys(propertyRisk[prop]).map((subcat) => {
					return {
						name: subcat,
						capacity: Object.keys(propertyRisk[prop][subcat]).filter(
							(ter) => propertyRisk[prop][subcat][ter] === true
						),
					}
				})
			})
		})
		// Casualty Data Filteration

		Object.keys(casualtySubClass).forEach((subclass, i) => {
			riskAppetite[1].subClassOfBusiness.push({ name: subclass, territory: [] })
			riskAppetite[1].subClassOfBusiness[i]["territory"] = Object.keys(
				casualtySubClass[subclass]["territory"]
			)
				.filter((ter) => casualtySubClass[subclass]["territory"][ter] === true)
				.map((item) => ({ name: item }))

			riskAppetite[1].subClassOfBusiness[i]["targetSegment"] = []
			Object.keys(casualtyRisk).forEach((prop, j) => {
				riskAppetite[1].subClassOfBusiness[i]["targetSegment"][j] = {
					name: prop,
					list: [],
				}

				riskAppetite[1].subClassOfBusiness[i]["targetSegment"][
					j
				].list = Object.keys(casualtyRisk[prop]).map((subcat) => {
					return {
						name: subcat,
						capacity: Object.keys(casualtyRisk[prop][subcat]).filter(
							(ter) => casualtyRisk[prop][subcat][ter] === true
						),
					}
				})
			})
		})
		console.log(riskAppetite)
	}
	return (
		<div className={classes.root}>
			<Grid container spacing={1}>
				<Grid container item xs={12} spacing={3}>
					<Grid item xs>
						<Paper elevation={3} className={classes.paper}>
							<h2>Class of Business</h2>
						</Paper>
					</Grid>
				</Grid>
				<Grid container item xs={12} spacing={3}>
					<BusinessSubClass />
				</Grid>
				<Grid container item xs={12} spacing={3}>
					<Grid item xs>
						<Paper elevation={3} className={classes.paper}>
							<h2>Target Segment</h2>
						</Paper>
					</Grid>
				</Grid>
				<Grid container item xs={12} spacing={3}>
					<Grid item xs>
						<Paper elevation={3} className={classes.paper}>
							<h2>PROPERTY</h2>
							<hr />
							<TargetSegment data={propertyData} setData={setPropertyData} />
						</Paper>
					</Grid>
					<Grid item xs>
						<Paper elevation={3} className={classes.paper}>
							<h2>CASUALTY</h2>
							<hr />
							<TargetSegment data={casualtyData} setData={setCasualtyData} />
						</Paper>
					</Grid>
				</Grid>
				<Grid container item xs={12} spacing={3}>
					<Grid item xs>
						<Button
							className={classes.Button}
							variant="contained"
							color="primary"
							onClick={generateCapacity}
						>
							Capacity Risk
						</Button>
					</Grid>
				</Grid>
			</Grid>
			{(Object.keys(casualtyRisk).length !== 0 ||
				Object.keys(propertyRisk).length !== 0) && (
				<Grid container spacing={1}>
					<Grid container item xs={12} spacing={3}>
						<Grid item xs>
							<Paper elevation={3} className={classes.paper}>
								<h2>Capacity Per Risk</h2>
							</Paper>
						</Grid>
					</Grid>
					<Grid container item xs={12} spacing={3}>
						<Grid item xs>
							<Paper elevation={3} className={classes.paper}>
								<h2>PROPERTY</h2>
								<CapacityPerRisk
									riskData={propertyRisk}
									setRiskData={setPropertyRisk}
								/>
							</Paper>
						</Grid>
						<Grid item xs>
							<Paper elevation={3} className={classes.paper}>
								<h2>CASUALTY</h2>
								<CapacityPerRisk
									riskData={casualtyRisk}
									setRiskData={setCasualtyRisk}
								/>
							</Paper>
						</Grid>
					</Grid>
					<Grid container item xs={12} spacing={3}>
						<Grid item xs>
							<Button
								className={classes.Button}
								variant="contained"
								color="primary"
								onClick={submitButton}
							>
								Submit
							</Button>
						</Grid>
					</Grid>
				</Grid>
			)}
		</div>
	)
}
