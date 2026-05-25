import { fail } from '@sveltejs/kit';
import { Resend } from 'resend';
import { env } from '$env/dynamic/private';

//const resend = new Resend(env.RESEND_ONBOARD_KEY);
const resend = new Resend(env.RESEND_API_KEY);

function clean(value: FormDataEntryValue | null) {
	return String(value ?? '').trim();
}

export const actions = {
	default: async ({
		request,
		getClientAddress
	}: {
		request: Request;
		getClientAddress: () => string;
	}) => {
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
			return fail(400, { errors, values: { name, email, phone, message } });
		}

		const ip = getClientAddress();

		const { error } = await resend.emails.send({
			from: 'Next Level Global <onboarding@resend.dev>',
			to: ['genebrush@att.net', 'bmarquis5@me.com'],
			replyTo: email,
			subject: `Next Level Global Contact: ${name}`,
			text: [
				`Name: ${name}`,
				`Email: ${email}`,
				`Phone: ${phone || 'Not provided'}`,
				`IP: ${ip}`,
				'',
				message
			].join('\n'),
			html: `
				<h2>Next Level Global Contact Form</h2>
				<p><strong>Name:</strong> ${escapeHtml(name)}</p>
				<p><strong>Email:</strong> ${escapeHtml(email)}</p>
				<p><strong>Phone:</strong> ${escapeHtml(phone || 'Not provided')}</p>
				<p><strong>IP:</strong> ${escapeHtml(ip)}</p>
				<hr />
				<p>${escapeHtml(message).replace(/\n/g, '<br />')}</p>
			`
		});

		if (error) {
			console.error('Resend error', error);
			return fail(500, {
				values: { name, email, phone, message },
				message: 'Sorry, your message could not be sent. Please try again.'
			});
		}

		return { success: true };
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
