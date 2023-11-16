import React, { LegacyRef, useRef, useState } from "react";

const availableInterests = ["technology", "food", "pets"];
type INotificationSettingsProps = {
	onSelectComplete(interests: string[], receivePersonalNotifications?: boolean): Promise<void>;
	loading: boolean;
};

function NotificationSettings({ loading, onSelectComplete }: INotificationSettingsProps) {
	const [selectedInterests, setSelectedInterests] = useState<Map<string, boolean>>(new Map());
	const checkboxRef = useRef<HTMLInputElement>(null);

	const handleAddInerest = (interest: string) => {
		const s = new Map(selectedInterests);
		if (s.has(interest)) {
			s.delete(interest);
		} else {
			s.set(interest, true);
		}

		return setSelectedInterests(new Map(s));
	};

	return (
		<section className='grid-txt-2 not-s-sec'>
			<div className='u-center'>
				<h1>Notification settings</h1>
			</div>
			<div>
				<p>Select interests</p>
				<aside className='tags-con'>
					{availableInterests.map((int, key) => (
						<button key={key} onClick={() => handleAddInerest(int)} className='tag '>
							{int}
							&nbsp; &nbsp;
							{selectedInterests.get(int) ? "✅" : "➕"}
						</button>
					))}
				</aside>
			</div>
			<div className='grid-txt-2'>
				<div>
					<label htmlFor='x' className='flexi gap-15'>
						<input
							ref={checkboxRef}
							type='checkbox'
							id='x'
							style={{
								width: 20,
								height: 20,
							}}
						/>
						<span>Receive personal notifications?</span>
					</label>
				</div>
				<button
					disabled={loading}
					className='btn_pri btn_lg'
					onClick={() =>
						onSelectComplete([...selectedInterests.keys()], Boolean(checkboxRef.current?.checked))
					}
				>
					{" "}
					{loading ? "Processing..." : "Subscribe"}
				</button>
			</div>
		</section>
	);
}

export default NotificationSettings;
