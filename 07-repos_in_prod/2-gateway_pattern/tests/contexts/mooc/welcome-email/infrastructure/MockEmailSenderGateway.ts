import { EmailSenderGateway } from "../../../../../src/contexts/mooc/welcome-email/domain/EmailSenderGateway";
import { WelcomeEmail } from "../../../../../src/contexts/mooc/welcome-email/domain/WelcomeEmail";

export class MockEmailSenderGateway implements EmailSenderGateway {
	private readonly mockSend = jest.fn();

	async send(email: WelcomeEmail): Promise<void> {
		expect(this.mockSend).toHaveBeenCalledWith(email);

		return Promise.resolve();
	}

	shouldSend(email: WelcomeEmail): void {
		this.mockSend(email);
	}
}
