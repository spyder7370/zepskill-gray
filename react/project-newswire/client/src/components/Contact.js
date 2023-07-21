import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Alert from 'react-bootstrap/Alert';

const Contact = () => {
	const formik = useFormik({
		initialValues: {
			subject: '',
			content: '',
			email: ''
		},
		validationSchema: Yup.object({
			subject: Yup.string().max(30, 'Must be 15 characters or less').required('Subject is required'),
			content: Yup.string().required('News body is required'),
			email: Yup.string().email('Must be a valid email').required('Email is required')
		}),
		onSubmit: (values) => {
			console.log(values);
		}
	});
	return (
		<div className="row">
			<div className="col-lg-6 mx-auto">
				<form onSubmit={formik.handleSubmit}>
					<div className="mb-4">
						<label className="form-label" htmlFor="subject">
							Email Subject
						</label>
						<input className="form-control" id="subject" type="text" {...formik.getFieldProps('subject')} />
						{formik.touched.subject && formik.errors.subject ? (
							<Alert className="mt-3" variant={'danger'}>
								{formik.errors.subject}
							</Alert>
						) : null}
					</div>

					<div className="mb-4">
						<label className="form-label" htmlFor="content">
							Content
						</label>
						<input className="form-control" id="content" type="text" {...formik.getFieldProps('content')} />
						{formik.touched.content && formik.errors.content ? (
							<Alert className="mt-3" variant={'danger'}>
								{formik.errors.content}
							</Alert>
						) : null}
					</div>

					<div className="mb-4">
						<label className="form-label" htmlFor="email">
							Email Address
						</label>
						<input className="form-control" id="email" type="text" {...formik.getFieldProps('email')} />
						{formik.touched.email && formik.errors.email ? (
							<Alert className="mt-3" variant={'danger'}>
								{formik.errors.email}
							</Alert>
						) : null}
					</div>

					<button className="btn btn-primary" type="submit">
						Submit
					</button>
				</form>
			</div>
		</div>
	);
};

export default Contact;
