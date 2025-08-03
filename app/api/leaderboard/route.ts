import { NextResponse } from "next/server";

export async function GET() {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  const leaderboardData = [
    {
      rank: 1,
      name: "Nikhil",
      amount: 3250,
      level: "Gold Fundraiser",
    },
    {
      rank: 2,
      name: "Nithish",
      amount: 2890,
      level: "Gold Fundraiser",
    },
    {
      rank: 3,
      name: "Rithvik",
      amount: 2150,
      level: "Silver Fundraiser",
    },
    {
      rank: 4,
      name: "Santhosh",
      amount: 1750,
      level: "Silver Fundraiser",
      isCurrentUser: true,
    },
    {
      rank: 5,
      name: "Hemanth",
      amount: 1420,
      level: "Silver Fundraiser",
    },
    {
      rank: 6,
      name: "Goutham",
      amount: 1180,
      level: "Silver Fundraiser",
    },
    {
      rank: 7,
      name: "Krishna",
      amount: 950,
      level: "Bronze Fundraiser",
    },
    {
      rank: 8,
      name: "Siva",
      amount: 780,
      level: "Bronze Fundraiser",
    },
    {
      rank: 9,
      name: "Karthik",
      amount: 650,
      level: "Bronze Fundraiser",
    },
    {
      rank: 10,
      name: "Arjun",
      amount: 520,
      level: "Bronze Fundraiser",
    },
  ];

  return NextResponse.json(leaderboardData);
}
