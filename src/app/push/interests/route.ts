import { NextRequest } from "next/server";

import PushNotifications from "@pusher/push-notifications-server";

export const beamsClient = new PushNotifications({
	instanceId: <string>process.env.NEXT_PUBLIC_PUSHER_BEAMS_INSTANCE_ID,
	secretKey: <string>process.env.PUSHER_BEAMS_INSTANCE_PRIMARY_KEY,
});

type TinterestPayload = {
	interests: string[];
};
export async function POST(request: NextRequest) {
	const body: TinterestPayload = await request.json();
	console.log({ body });

	const token = await beamsClient.publishToInterests(body.interests, {
		web: {
			notification: {
				title: "tech news",
				body: "something techy  in town",
				icon: "https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
				deep_link: "http://localhost:3000/interests",
				hide_notification_if_site_has_focus: false,
			},
		},
	});
	return Response.json(token);
}
