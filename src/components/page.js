import React, { useState } from "react";
import logo from "./logo.jpg";
import "./page.css";
import Select from "react-select";
import data from "./data.json";
import icon from "./icon.jpg";
import del from "./del.png";

const Content = () => {
	data.sort((a, b) => {
		let na = a.name.toLowerCase(),
			nb = b.name.toLowerCase();
		na = na.trim();
		nb = nb.trim();
		if (na < nb) {
			return -1;
		}
		if (na > nb) {
			return 1;
		}
		return 0;
	});

	const [options, setOptions] = useState(
		data.map((item) => ({
			value: item.name,
			label: (
				<div style={{ padding: "20px" }}>
					<img
						src={item.img}
						alt="None"
						className="logo img-fluid"
					></img>
					<h3>{item.name}</h3>
					<img
						src={icon}
						style={{ height: "20px", float: "left" }}
						alt="None"
					></img>
					<p>
						{item.des} • {item.email}
					</p>
				</div>
			),
		}))
	);

	const [selectedOptions, setSelectedOptions] = useState([]);

	let Values = [];
	let indices = [];

	const [csm, setcsm] = useState([]);

	const customStyles = {
		control: (provided) => ({
			...provided,
			width: "76.9vw",
		}),
		input: (provided) => ({
			...provided,
			fontSize: "25px",
		}),
		multiValue: (provided) => ({
			...provided,
			backgroundColor: "#d8dcfc",
			fontSize: "25px",
		}),
	};

	const addcsm = () => {
		let addedcsm = [];
		for (let item of selectedOptions) {
			indices.push(options.findIndex((x) => x.value === item.value));
			addedcsm.push(
				options[options.findIndex((x) => x.value === item.value)]
			);
		}
		const removezero = (value) => {
			return value !== 0;
		};
		let newoptions = options.slice();
		for (let item of indices) {
			newoptions[item] = 0;
		}
		newoptions = newoptions.filter(removezero);
		// let merged = [].concat.apply([], addedcsm);
		setcsm([...csm, ...addedcsm]);
		setOptions(newoptions);
		setSelectedOptions(null);
	};

	const handleChange = (options) => {
		Values = options.map((item) => ({
			value: item.value,
			label: item.value,
		}));
		setSelectedOptions(Values);
	};

	const Header = () => {
		return (
			<div>
				<img src={logo} alt="None" className="logo img-fluid"></img>
				<h2>YOUR SPOTTABL TEAM</h2>
				<p>Spottabl supports you all throughout</p>
			</div>
		);
	};

	const CSM = () => {
		return (
			<div className="csm">
				<h3>Customer Success Managers</h3>
				<div className="input-group mt-4">
					<Select
						isMulti
						styles={customStyles}
						defaultValue={selectedOptions}
						options={options}
						components={{ DropdownIndicator: () => null }}
						onChange={handleChange}
						placeholder="Add by name or email"
					/>
					<button
						type="button"
						className="btn btn-primary"
						style={{ backgroundColor: "#22309b" }}
						onClick={addcsm}
					>
						Add CSM
					</button>
				</div>
			</div>
		);
	};

	const delcsm = (event) => {
		let id = event.target.parentNode.querySelector("#index").textContent;
		let idx = csm.findIndex((x) => x.value === id);
		let newcsm = csm.slice();
		let newop = newcsm.splice(idx, 1);
		console.log(newop);
		let newops = options.slice();
		newops.push(newop[0]);
		newops.sort((a, b) => {
			let na = a.value.toLowerCase(),
				nb = b.value.toLowerCase();
			na = na.trim();
			nb = nb.trim();
			if (na < nb) {
				return -1;
			}
			if (na > nb) {
				return 1;
			}
			return 0;
		});
		setOptions([...newops]);
		setcsm([...newcsm]);
	};

	const ShowCSM = () => {
		if (csm.length !== 0) {
			return (
				<div className="mt-5">
					{csm.map((item, index) => {
						let idx = data.findIndex((x) => x.name === item.value);
						return (
							<div className="card" key={index}>
								<div className="p-4">
									<img
										src={data[idx].img}
										alt="None"
										className="logocsm img-fluid"
									></img>
									<img
										src={del}
										style={{ float: "right", cursor:"pointer" }}
										onClick={delcsm}
										alt="None"
									></img>
									<h4 id="index">{data[idx].name}</h4>
									
									<p>
										{data[idx].des}
										
									</p>
									
								</div>
							</div>
						);
					})}
				</div>
			);
		}
	};

	return (
		<div className="container" style={{ margin: 0 }}>
			<Header />
			<CSM />
			<ShowCSM />
		</div>
	);
};

export default Content;
