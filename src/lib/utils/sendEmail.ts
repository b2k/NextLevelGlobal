import { env } from '$env/dynamic/private';
import { Resend } from 'resend';

const resend = new Resend(env.RESEND_API_KEY);
resend.emails.send({
	from: 'onboarding@resend.dev',
	to: 'bmarquis65@me.com',
	subject: 'Hello World',
	html: '<p>Congrats on sending your <strong>first email</strong>!</p>'
});
