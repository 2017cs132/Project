import React from "react"
import CapacityCheckBox from "./CapacityCheckBox"

export default function CapacityPerRisk({ riskData, setRiskData }) {
	return (
		<>
			<hr />
			{Object.keys(riskData).map((key1) => (
				<div key={key1}>
					<h3>{key1}</h3>
					{Object.keys(riskData[key1]).map((item, key) => (
						<CapacityCheckBox
							title={item}
							key1={key1}
							key={key}
							options={riskData[key1][item]}
							data={riskData}
							setData={setRiskData}
						/>
					))}
				</div>
			))}
		</>
	)
}
