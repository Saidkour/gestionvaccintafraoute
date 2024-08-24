const mongoose = require("mongoose");
function dumbyOrder(count = 25) {
  let result = [];
  for (let i = 0; i < count; i++) {
    const names = ["John", "Jane", "Alice", "Bob", "Doe", "Smith"];
    const idCards = [
      "jg23234",
      "hg21204",
      "jt29984",
      "ja29854",
      "hg98234",
      "jv29234",
    ];

    const targetPersons = ["John", "Jane", "Alice", "Bob", "Doe", "Smith"];
    const phones = ["1234567890", "0987654321", "4561237890", "7893214560"];
    const genders = ["male", "female"];
    const statuses = ["pending", "confirmed", "canceled", "done"];

    const randomName = names[Math.floor(Math.random() * names.length)];
    const randomLast = names[Math.floor(Math.random() * names.length)];
    const randomIdCard = idCards[Math.floor(Math.random() * idCards.length)];
    const randomTargetPerson =
      targetPersons[Math.floor(Math.random() * targetPersons.length)];
    const randomPhone = phones[Math.floor(Math.random() * phones.length)];
    const randomGender = genders[Math.floor(Math.random() * genders.length)];
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
    const randomVaccineId = "65ee53b6a71e2607b1647656";

    result.push({
      responsibleName: randomLast,
      responsibleLastName: randomName,
      responsibleIdCard: randomIdCard,
      childName: randomTargetPerson,
      childLastName: randomTargetPerson,
      responsiblePhone: randomPhone,
      birthday: "2000-01-01",
      gender: randomGender,
      status: randomStatus,
      vaccineId: "65ee53b6a71e2607b1647656",
    });
  }
  return result;
}

module.exports = dumbyOrder;
