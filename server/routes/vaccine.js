const express = require("express");
const router = express.Router();
const {
  getAllVaccine,
  updateVaccine,
  addVaccine,
  deleteVaccine,
  getActiveVaccine,
} = require("../controllers/vaccineController");

const { allowedRoles, auth } = require("../controllers/usersController");

router.post("/", auth, allowedRoles("doctor"), addVaccine);
router.get("/", auth, allowedRoles("doctor", "asistant"), getAllVaccine);
router.patch("/:id", auth, allowedRoles("doctor"), updateVaccine);
router.delete("/:id", auth, allowedRoles("doctor"), deleteVaccine);

router.get("/activeVaccines", getActiveVaccine);

module.exports = router;
