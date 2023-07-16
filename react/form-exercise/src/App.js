import React, { useState } from 'react';

const App = () => {
	// const [ firstName, setFirstName ] = useState('');
	// const [ lastName, setLastName ] = useState('');
	// const [ email, setEmail ] = useState('');

	const [ userDetails, setUserDetails ] = useState({
		firstName: '',
		lastName: '',
		email: ''
	});

	// const updateFirstName = (event) => {
	// 	// setFirstName(event.target.value);
	// 	setUserDetails({
	// 		...userDetails,
	// 		firstName: event.target.value
	// 	});
	// };
	// const updateLastName = (event) => {
	// 	// setLastName(event.target.value);
	// 	setUserDetails({
	// 		...userDetails,
	// 		lastName: event.target.value
	// 	});
	// };
	// const updateEmail = (event) => {
	// 	// setEmail(event.target.value);
	// 	setUserDetails({
	// 		...userDetails,
	// 		email: event.target.value
	// 	});
	// };
	const updateUserDetails = (event) => {
		// setUserDetails({
		// 	firstName,
		// 	lastName,
		// 	email
		// });
		if (event.target.className === 'firstName') {
			setUserDetails({
				lastName: userDetails.lastName,
				email: userDetails.email,
				firstName: event.target.value
			});
		} else if (event.target.className === 'lastName') {
			setUserDetails({
				firstName: userDetails.firstName,
				email: userDetails.email,
				lastName: event.target.value
			});
		} else if (event.target.className === 'email') {
			setUserDetails({
				firstName: userDetails.firstName,
				lastName: userDetails.lastName,
				email: event.target.value
			});
		}

		/*
            const {value, className} = event.target;
            setUserDetails({
				...userDetails,
                [className]: value
			});
        */
	};
	const formSubmitHandler = (event) => {
		event.preventDefault();
		console.log(userDetails.firstName, userDetails.lastName, userDetails.email);
	};
	return (
		<React.Fragment>
			<div className="container">
				<h1>
					Hello {userDetails.firstName} {userDetails.lastName}
				</h1>
				<div>{userDetails.email}</div>
				<form onSubmit={formSubmitHandler}>
					<input
						className="firstName"
						value={userDetails.firstName}
						onChange={updateUserDetails}
						placeholder="first name"
					/>
					<input
						className="lastName"
						value={userDetails.lastName}
						onChange={updateUserDetails}
						placeholder="last name"
					/>
					<input
						className="email"
						value={userDetails.email}
						onChange={updateUserDetails}
						placeholder="email"
					/>
					<button>submit</button>
				</form>
			</div>
		</React.Fragment>
	);
};

export default App;
