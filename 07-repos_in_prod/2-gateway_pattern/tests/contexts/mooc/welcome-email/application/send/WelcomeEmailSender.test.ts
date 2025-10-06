import { WelcomeEmailSender } from "../../../../../../src/contexts/mooc/welcome-email/application/send/WelcomeEmailSender";
import { WelcomeEmail } from "../../../../../../src/contexts/mooc/welcome-email/domain/WelcomeEmail";
import { WelcomeEmailMother } from "../../domain/WelcomeEmailMother";
import { MockEmailSenderGateway } from "../../infrastructure/MockEmailSenderGateway";

describe("WelcomeEmailSender should", () => {
	const gateway = new MockEmailSenderGateway();
	const sender = new WelcomeEmailSender(gateway);

	it("send a welcome email", async () => {
		const welcomeEmail = WelcomeEmailMother.create();

		const expectedEmail = WelcomeEmail.create(
			welcomeEmail.name,
			welcomeEmail.email,
		);

		gateway.shouldSend(expectedEmail);

		await sender.send(welcomeEmail.name, welcomeEmail.email);
	});
});
