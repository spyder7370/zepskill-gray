const nodemailer = require('nodemailer');
const Mailgen = require('mailgen');

const mailGenerator = new Mailgen({
	theme: 'cerberus',
	product: {
		name: 'NewsWire',
		link: 'http://localhost:3000'
	}
});
const transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: process.env.EMAIL,
		pass: process.env.EMAIL_PASS
	}
});

module.exports.sendEmail = async (userObj) => {
	try {
		const email = {
			body: {
				intro: [ `someone sent you a message`, `user_email: ${userObj.email}`, `subject: ${userObj.subject}` ],
				outro: `body: ${userObj.content}`
			}
		};
		const emailBody = mailGenerator.generate(email);
		const mailOptions = {
			from: process.env.EMAIL,
			to: process.env.EMAIL,
			subject: 'email from newswire website',
			html: emailBody
		};
		await transporter.sendMail(mailOptions);
	} catch (error) {
		console.log(error);
		throw error;
	}
};
