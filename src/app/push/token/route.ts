import { NextRequest } from "next/server";
import { beamsClient } from "../interests/route";

type TgetTokenPayload = {
	userId: string;
};
export async function GET(request: NextRequest) {
	const body = request.nextUrl.searchParams;

	const token = beamsClient.generateToken(body.get("user_id") as string);
	console.log(token);
	return Response.json(token);
}
