import { Service } from "diod";

import { EmailSenderGateway } from "../../domain/EmailSenderGateway";
import { WelcomeEmail } from "../../domain/WelcomeEmail";

@Service()
export class WelcomeEmailSender {
	constructor(private readonly gateway: EmailSenderGateway) {}

	async send(name: string, email: string): Promise<void> {
		const welcomeEmail = WelcomeEmail.create(name, email);

		await this.gateway.send(welcomeEmail);
	}
}
