import React, { useState } from "react"
import axios from "axios";
import { Link } from "gatsby"
import Layout from "components/layout"
import { Input, TextArea } from "flwww";

const MyForm = () => {

	const [serverState, setServerState] = useState({
		submitting: false,
		status: null
	});
	const handleServerResponse = (ok, msg, form) => {
		setServerState({
			submitting: false,
			status: { ok, msg }
		});
		if (ok) {
			form.reset();
		}
	};
	const handleOnSubmit = e => {
		e.preventDefault();
		const form = e.target;
		setServerState({ submitting: true });
		axios({
			method: "post",
			url: "https://formsubmit.co/pahujapiyush1@gmail.com",
			data: new FormData(form)
		})
			.then(r => {
				handleServerResponse(true, "Thanks!", form);
			})
			.catch(r => {
				handleServerResponse(false, "error", form);
				console.log(r);
			});
	};
	return (
		<Layout>

			<div>


				<form id="formElem" onSubmit={handleOnSubmit}>

					<div className="form-group" style={{ width: "500px" }}>
						<Input type="text" name="name" placeholder="Name" className="ContactFormInput" id="name" required="required" />
						<Input type="email" name="email" placeholder="Email" className="ContactFormInput" id="email" required="required" />
						<Input type="text" name="phone-number" placeholder="Phone Number" className="ContactFormInput" id="phone-number" required="required" />
						<TextArea rows={4} name="message" id="message" placeholder="Message" style={{ marginTop: "0.5em", marginBottom: "0.5em", fontFamily: "'Inter var', sans-serif" }} />
					</div>

					<button type="submit" className="btn btn-primary" disabled={serverState.submitting}>
						Submit
           			</button>
					{serverState.status && (
						<p className={!serverState.status.ok ? "errorMsg" : ""}>
							{serverState.status.msg}
						</p>
					)}
				</form>

			</div>

		</Layout>

	);
};

export default MyForm;