function planBudget({
  totalBudget,
  days,
  members,
  destinationTier = "mid",
}) {
  const basePercent = {
    budget: {
      stay: 0.4,
      food: 0.3,
      transport: 0.2,
      buffer: 0.1,
    },

    mid: {
      stay: 0.5,
      food: 0.25,
      transport: 0.15,
      buffer: 0.1,
    },

    premium: {
      stay: 0.6,
      food: 0.2,
      transport: 0.12,
      buffer: 0.08,
    },
  };

  const percentage =
    basePercent[destinationTier] || basePercent.mid;

  const breakdown = {
    stay: Math.round(totalBudget * percentage.stay),
    food: Math.round(totalBudget * percentage.food),
    transport: Math.round(
      totalBudget * percentage.transport
    ),
    buffer: Math.round(totalBudget * percentage.buffer),
  };

  const perNightStayBudget = Math.round(
    breakdown.stay / days
  );

  const perPersonFoodPerDay = Math.round(
    breakdown.food / (days * members)
  );

  return {
    breakdown,
    perNightStayBudget,
    perPersonFoodPerDay,
  };
}

module.exports = {
  planBudget,
};