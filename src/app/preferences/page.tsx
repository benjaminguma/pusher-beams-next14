"use client";
import React, { useState } from "react";
import * as PusherPushNotifications from "@pusher/push-notifications-web";
import NotificationSettings from "../../../components/NotificationSettings";

function page() {
	const [loading, setLoading] = useState(false);
	const user = {
		userId: "01HENT8JYMTER8VWQ3CGM7CNGX",
	};
	const handleNotificationSettings = async (interests: string[], receivePersonalNotifications?: boolean) => {
		try {
			setLoading(true);
			const beamsClient = new PusherPushNotifications.Client({
				instanceId: process.env.NEXT_PUBLIC_PUSHER_BEAMS_INSTANCE_ID as string,
			});

			await beamsClient.start();

			await beamsClient.setDeviceInterests(interests);
			if (receivePersonalNotifications) {
				const tokenProvider = new PusherPushNotifications.TokenProvider({
					url: "http://localhost:3000/push/token",
				});
				await beamsClient.setUserId(user.userId, tokenProvider);
				console.log("user token set");
			}

			setLoading(false);
			alert("subscription successful!");
		} catch (error) {
			setLoading(false);
			console.error(error);
		}
	};

	const handleUnsubscribe = async () => {
		const beamsClient = new PusherPushNotifications.Client({
			instanceId: process.env.NEXT_PUBLIC_PUSHER_BEAMS_INSTANCE_ID as string,
		});

		await beamsClient.start();

		await beamsClient.clearDeviceInterests();
		await beamsClient.clearAllState();
	};

	return (
		<div>
			<NotificationSettings loading={loading} onSelectComplete={handleNotificationSettings} />
		</div>
	);
}

export default page;
