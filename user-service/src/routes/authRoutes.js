const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const logger = require("../config/logger");

const router = express.Router();

// 🚀 Registracija uporabnika
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: "Vsa polja so obvezna" });
    }

    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ error: "Uporabnik že obstaja" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user = new User({ name, email, password: hashedPassword });

    await user.save();

    // ✅ Ustvarimo JWT žeton in ga vrnemo
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(201).json({ message: "Uporabnik uspešno registriran", token });
  } catch (error) {
    console.error("❌ Napaka pri registraciji:", error);
    res.status(500).json({ error: "Napaka na strežniku" });
  }
});

// 🚀 Prijava uporabnika
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Vsa polja so obvezna" });
    }

    // ✅ Preveri, ali uporabnik obstaja
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "Uporabnik ne obstaja" }); // 🔹 ODSTRANJEN "!"
    }

    // ✅ Preveri geslo
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Napačno geslo" }); // 🔹 ODSTRANJEN "!"
    }

    // ✅ Ustvari JWT žeton
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ token });
  } catch (error) {
    console.error("❌ Napaka pri prijavi:", error);
    res.status(500).json({ error: "Napaka na strežniku" });
  }
});

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      logger.warn("⚠️ Manjkajoči podatki pri registraciji");
      return res.status(400).json({ error: "Vsa polja so obvezna" });
    }

    let user = await User.findOne({ email });

    if (user) {
      logger.warn(`⚠️ Poskus registracije obstoječega uporabnika: ${email}`);
      return res.status(400).json({ error: "Uporabnik že obstaja" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user = new User({ name, email, password: hashedPassword });

    await user.save();
    logger.info(`✅ Uporabnik ${email} uspešno registriran`);

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(201).json({ message: "Uporabnik uspešno registriran", token });
  } catch (error) {
    logger.error("❌ Napaka pri registraciji: " + error.message);
    res.status(500).json({ error: "Napaka na strežniku" });
  }
});

module.exports = router;
