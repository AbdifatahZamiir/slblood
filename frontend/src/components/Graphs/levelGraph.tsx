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
	bloodtypes: any;
}

const LevelGraph = ({ bloodtypes }: Props) => {
	const ids: number[] = [];
	bloodtypes.forEach((bloodtype: any) => {
		const bloodtypeIds = [bloodtype.bloodtypeId];
		ids.push(...bloodtypeIds);
	});

	const data = _.values(_.groupBy(ids)).map((d) => ({
		bloodtypeId: `level ${d[0]}`,
		bloodtypes: d.length,
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
				dataKey="bloodtypeId"
				scale="point"
				padding={{ left: 10, right: 10 }}
			/>
			<YAxis />
			<Tooltip />
			<Legend />
			<CartesianGrid strokeDasharray="3 3" />
			<Bar
				dataKey="bloodtypes"
				fill="#1e88e5"
				background={{ fill: "#ccc" }}
			/>
		</BarChart>
	);
};

export default LevelGraph;
