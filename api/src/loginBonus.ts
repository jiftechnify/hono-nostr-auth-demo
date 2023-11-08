export type LoginBonusCount = {
  total: number;
  consecutive: number;
};

export type LoginBonusData = {
  lastLoginDay: number;
  count: LoginBonusCount;
};

export const updateLoginCount = (
  prevBonus: LoginBonusData | undefined,
  currDay: number
): LoginBonusCount | undefined => {
  if (prevBonus === undefined) {
    return {
      total: 1,
      consecutive: 1,
    };
  }

  const { total: prevTotal, consecutive: prevConsec } = prevBonus.count;

  if (prevBonus.lastLoginDay === currDay) {
    // already logged in today
    return undefined;
  }
  if (prevBonus.lastLoginDay === currDay - 1) {
    // a consecutive login
    return {
      total: prevTotal + 1,
      consecutive: prevConsec + 1,
    };
  }
  // not a consecutive login
  return {
    total: prevTotal + 1,
    consecutive: 1,
  };
};
