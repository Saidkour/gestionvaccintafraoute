const Vaccine = require("../models/Vaccine");
const asyncWrapper = require("express-async-wrapper");

exports.getAllVaccine = asyncWrapper(async (req, res) => {
  const vaccines = await Vaccine.find().sort({ createdAt: -1 });
  res.json({
    status: "success",
    vaccines,
  });
});

exports.getActiveVaccine = asyncWrapper(async (req, res) => {
  const vaccines = await Vaccine.find({ available: true }).sort({
    createdAt: -1,
  });
  const filterVaccine = vaccines.map((vac) => {
    return {
      id: vac.id,
      startAge: vac.startAge,
      lastAge: vac.lastAge,
      ageType: vac.ageType,
      dose: vac.dose,
      description: vac.description,
    };
  });
  res.json({ status: "success", activeVaccines: filterVaccine });
});


exports.addVaccine = asyncWrapper(async (req, res) => {
  const newVaccine = await Vaccine.create(req.body);
  res.json({
    status: "success",
    newVaccine,
  });
});

exports.updateVaccine = asyncWrapper(async (req, res) => {
  const id = req.params.id;
  const { available } = req.body;
  if (!(await Vaccine.findByIdAndUpdate(id, { available })))
    return res
      .status(404)
      .json({ status: "fail", message: "Vaccine not found" });

  res.json({
    status: "success",
  });
});

exports.deleteVaccine = asyncWrapper(async (req, res) => {
  const id = req.params.id;
  if (!(await Vaccine.findByIdAndDelete(id)))
    return res
      .status(404)
      .json({ status: "fail", message: "Vaccine not found" });

  res.json({
    status: "success",
  });
});
