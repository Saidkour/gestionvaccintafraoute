function vaccineDumby(count = 10) {
  const descriptions = [
    "mRNA vaccine",
    "Viral vector vaccine",
    "Protein vaccine",
    "DNA vaccine",
  ];
  const doses = ["10Mg", "30Mg", "50Mg", "20Mg"];
  const availability = [true, false];
  const ageTypes = ["day", "week", "month", "year"];

  let result = [];
  for (let i = 0; i < count; i++) {
    const randomDescription =
      descriptions[Math.floor(Math.random() * descriptions.length)];
    const randomDose = doses[Math.floor(Math.random() * doses.length)];
    const randomAvailability =
      availability[Math.floor(Math.random() * availability.length)];
    const randomAgeType = ageTypes[Math.floor(Math.random() * ageTypes.length)];
    const startAge = Math.floor(Math.random() * 100);
    const lastAge = startAge + Math.floor(Math.random() * (100 - startAge));

    result.push({
    
      startAge: startAge,
      lastAge: lastAge,
      ageType: randomAgeType,
      description: randomDescription,
      dose: randomDose,
      available: randomAvailability,
      createdAt: new Date(),
    });
  }
  return result;
}

module.exports = vaccineDumby;
