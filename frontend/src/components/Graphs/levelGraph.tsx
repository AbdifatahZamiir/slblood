import React from "react";
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
} from "recharts";
import _ from "lodash";

interface Props {
	donors: any;
}

const LevelGraph = ({ donors }: Props) => {
	const ids: number[] = [];
	donors.forEach((donor: any) => {
		const donorIds = [donor.bloodtypes.bloodname];

		ids.push(...donorIds);
	});

	const data = _.values(_.groupBy(ids)).map((d) => ({
		donorId: `Type ${d[0]}`,
		Donors: d.length,
	}));
	return (
		<BarChart
			width={690}
			height={300}
			data={data}
			margin={{
				top: 5,
				right: 30,
				left: 20,
				bottom: 5,
			}}
			barSize={20}
		>
			<XAxis
				dataKey="donorId"
				scale="point"
				padding={{ left: 10, right: 10 }}
			/>
			<YAxis />
			<Tooltip />
			<Legend />
			<CartesianGrid strokeDasharray="3 3" />
			<Bar
				dataKey="Donors"
				fill="#FF0000"
				background={{ fill: "#ccc" }}
			/>
		</BarChart>
	);
};

export default LevelGraph;
