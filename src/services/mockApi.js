// Mock API service to simulate backend calls
export const mockApiService = {
  getUserData: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          name: "Alex Johnson",
          referralCode: "alexjohnson2025",
          totalDonations: 1750,
          level: "Silver Fundraiser",
          nextReward: "Gold Fundraiser Badge",
          progress: 70,
        })
      }, 500)
    })
  },

  getLeaderboard: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            rank: 1,
            name: "Sarah Chen",
            amount: 3250,
            level: "Gold Fundraiser",
          },
          {
            rank: 2,
            name: "Michael Rodriguez",
            amount: 2890,
            level: "Gold Fundraiser",
          },
          {
            rank: 3,
            name: "Emily Davis",
            amount: 2150,
            level: "Silver Fundraiser",
          },
          {
            rank: 4,
            name: "Alex Johnson",
            amount: 1750,
            level: "Silver Fundraiser",
            isCurrentUser: true,
          },
          {
            rank: 5,
            name: "David Kim",
            amount: 1420,
            level: "Silver Fundraiser",
          },
          {
            rank: 6,
            name: "Jessica Brown",
            amount: 1180,
            level: "Silver Fundraiser",
          },
          {
            rank: 7,
            name: "Ryan Wilson",
            amount: 950,
            level: "Bronze Fundraiser",
          },
          {
            rank: 8,
            name: "Amanda Taylor",
            amount: 780,
            level: "Bronze Fundraiser",
          },
          {
            rank: 9,
            name: "James Anderson",
            amount: 650,
            level: "Bronze Fundraiser",
          },
          {
            rank: 10,
            name: "Lisa Martinez",
            amount: 520,
            level: "Bronze Fundraiser",
          },
        ])
      }, 500)
    })
  },
}
