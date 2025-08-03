import { NextResponse } from "next/server";

export async function GET() {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  const userData = {
    name: "Santhosh",
    referralCode: "santhoshssr455",
    totalDonations: 1750,
    level: "Silver Fundraiser",
    nextReward: "Gold Fundraiser Badge",
    progress: 70,
  };

  return NextResponse.json(userData);
}
