import { WelcomeEmail } from "./WelcomeEmail";

export abstract class EmailSenderGateway {
	abstract send(email: WelcomeEmail): Promise<void>;
}
