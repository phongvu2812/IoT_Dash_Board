const express = require("express"),
   router = express.Router();

const dataService = require("../services/dataService");

router.get("/", async (req, res) => {
   const data = await dataService.getAllData();
   res.send(data);
});

router.get("/temp", async (req, res) => {
   const data = await dataService.getTempByTime();
   res.send(data[0]);
});
router.get("/hum", async (req, res) => {
   const data = await dataService.getHumByTime();
   res.send(data[0]);
});
router.get("/bright", async (req, res) => {
   const data = await dataService.getBrightByTime();
   res.send(data[0]);
});
router.get("/latest", async (req, res) => {
   const data = await dataService.getLatestData();
   res.send(data[0]);
});
router.get("/ten", async (req, res) => {
   const data = await dataService.get10Data();
   res.send(data);
});
// router.delete("/:id", async (req, res) => {
//    const affectedRows = await dataService.deleteDataById(req.params.id);
//    if (affectedRows == 0) res.status(404).json("no data with given id: " + req.params.id);
//    else res.send("deleted successfully");
// });

module.exports = router;
