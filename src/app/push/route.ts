import { NextRequest } from "next/server";
import { beamsClient } from "./interests/route";

export async function POST(request: NextRequest) {
	const body: {
		users: string[];
		// string of user ids
	} = await request.json();

	const token = beamsClient.publishToUsers(body.users, {
		web: {
			time_to_live: 2419200,
			notification: {
				title: "Welcome abord!",
				body: "hello human",
				icon: "https://res.cloudinary.com/dqydioa17/image/upload/v1677233529/c8kkir3wrgksf1yjqxug.jpg",
				deep_link: "http://localhost:3000",
				hide_notification_if_site_has_focus: false,
			},
		},
	});
	return Response.json(token);
}
