import { fail } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import { BrevoClient } from '@getbrevo/brevo';

const brevo = new BrevoClient({
	apiKey: env.BREVO_API_KEY,

	maxRetries: 3 // Default: 2
});

function clean(value: FormDataEntryValue | null) {
	return String(value ?? '').trim();
}

export const actions = {
	default: async ({ request, getClientAddress }) => {
		const form = await request.formData();

		const name = clean(form.get('name'));
		const email = clean(form.get('email'));
		const phone = clean(form.get('phone'));
		const message = clean(form.get('message'));

		// Spam reduction
		const website = clean(form.get('website')); // honeypot
		const startedAt = Number(clean(form.get('startedAt')));
		const elapsedMs = Date.now() - startedAt;

		if (website || !startedAt || elapsedMs < 3000) {
			return fail(400, { success: false });
		}

		const errors: Record<string, string> = {};

		if (!name) errors.name = 'Name is required.';

		if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
			errors.email = 'A valid email is required.';
		}

		if (!message) errors.message = 'Message is required.';

		if (Object.keys(errors).length) {
			return fail(400, {
				errors,
				values: { name, email, phone, message, website, startedAt }
			});
		}

		const ip = getClientAddress();

		try {
			const result = await brevo.transactionalEmails.sendTransacEmail({
				subject: `Next Level Global Contact: ${name}`,
				textContent: 'Hello world!',
				sender: { name: 'Sender', email: 'sender@example.com' },
				to: [{ email: 'recipient@example.com' }]
			});
			try {
			} catch (err) {
				if (err instanceof UnauthorizedError) {
					console.error('Invalid API key');
				} else if (err instanceof TooManyRequestsError) {
					const retryAfter = err.rawResponse.headers['retry-after'];
					console.error(`Rate limited. Retry after ${retryAfter} seconds`);
				} else if (err instanceof BrevoError) {
					console.error(`API Error ${err.statusCode}:`, err.message);
				}
			}
			const sendSmtpEmail = new brevo.SendSmtpEmail();

			sendSmtpEmail.sender = {
				name: 'Next Level Global',
				email: 'info@nextlevelglobal.org'
			};

			sendSmtpEmail.to = [{ email: 'info@nextlevelglobal.org' }];

			sendSmtpEmail.replyTo = {
				email,
				name
			};

			sendSmtpEmail.subject = `Next Level Global Contact: ${name}`;

			sendSmtpEmail.textContent = [
				`Name: ${name}`,
				`Email: ${email}`,
				`Phone: ${phone || 'Not provided'}`,
				`IP: ${ip}`,
				'',
				message
			].join('\n');

			sendSmtpEmail.htmlContent = `
				<h2>Next Level Global Contact Form</h2>

				<p><strong>Name:</strong> ${escapeHtml(name)}</p>
				<p><strong>Email:</strong> ${escapeHtml(email)}</p>
				<p><strong>Phone:</strong> ${escapeHtml(phone || 'Not provided')}</p>
				<p><strong>IP:</strong> ${escapeHtml(ip)}</p>

				<hr />

				<p>${escapeHtml(message).replace(/\n/g, '<br />')}</p>
			`;

			await apiInstance.sendTransacEmail(sendSmtpEmail);

			return { success: true };
		} catch (error) {
			console.error('Brevo error', error);

			return fail(500, {
				values: { name, email, phone, message },
				message: 'Sorry, your message could not be sent. Please try again.'
			});
		}
	}
};

function escapeHtml(value: string) {
	return value
		.replaceAll('&', '&amp;')
		.replaceAll('<', '&lt;')
		.replaceAll('>', '&gt;')
		.replaceAll('"', '&quot;')
		.replaceAll("'", '&#039;');
}
