import Team from "../models/Team.js";
import cloudinary from "../config/cloudinary.js";

/*
CREATE TEAM MEMBER
*/
export const createTeam = async (req, res) => {
    try {

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Image is required",
            });
        }

        const { name, role } = req.body;

        const team = await Team.create({
            name: name.trim().replace(/\s+/g, " "),
            role,
            imageUrl: req.file.path,
            imagePublicId: req.file.filename,
        });

        res.status(201).json({
            success: true,
            data: team,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

/*
GET ALL TEAM MEMBERS
*/
export const getTeams = async (req, res) => {
    try {
        const teams = await Team.find().sort({ createdAt: -1 });

        res.json({
            success: true,
            count: teams.length,
            data: teams,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

/*
UPDATE TEAM MEMBER
*/
export const updateTeam = async (req, res) => {
    try {

        const team = await Team.findById(req.params.id);

        if (!team) {
            return res.status(404).json({
                success: false,
                message: "Team member not found"
            });
        }

        team.name = req.body.name;
        team.role = req.body.role;

        if (req.file) {

            // delete old image
            if (team.imagePublicId) {
                await cloudinary.uploader.destroy(team.imagePublicId);
            }

            // save new image
            team.imageUrl = req.file.path;
            team.imagePublicId = req.file.filename;
        }

        await team.save();

        res.json({
            success: true,
            data: team
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

/*
DELETE TEAM MEMBER
*/
export const deleteTeam = async (req, res) => {
    try {

        const team = await Team.findById(req.params.id);

        if (!team) {
            return res.status(404).json({
                success: false,
                message: "Team member not found",
            });
        }

        try {
            if (team.imagePublicId) {
                await cloudinary.uploader.destroy(team.imagePublicId);
            }
        } catch (cloudinaryError) {
            console.error("Cloudinary delete failed:", cloudinaryError);
        }

        await team.deleteOne();

        res.json({
            success: true,
            message: "Team member deleted",
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};