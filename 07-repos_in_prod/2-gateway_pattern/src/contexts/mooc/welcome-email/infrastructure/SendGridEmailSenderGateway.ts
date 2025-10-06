import { Service } from "diod";

import { EmailSenderGateway } from "../domain/EmailSenderGateway";
import { WelcomeEmail } from "../domain/WelcomeEmail";

@Service()
export class SendGridEmailSenderGateway implements EmailSenderGateway {
	async send(_email: WelcomeEmail): Promise<void> {}
}
