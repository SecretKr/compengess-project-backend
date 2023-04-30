const express = require("express");
const controller = require("../controller/controller");
const dataBaseController = require("../controller/dataBaseController")

const router = express.Router();

router.get("/auth_app", controller.authApp);
router.get("/access_token", controller.accessToken);
router.get("/get_profile_info", controller.getProfileInformation);
router.get("/get_courses", controller.getCourses);
router.get(
    "/get_course_assignments/:cv_cid",
    controller.getCourseAssignments
);
router.get("/logout", controller.logout);

router.get("/", dataBaseController.getItems);
router.post("/", dataBaseController.addItem);
router.delete("/:itemid", dataBaseController.deleteItem);

module.exports = router;