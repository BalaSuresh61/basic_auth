import { Profile } from "../services/profileService.js";

export const updateProfilePhoto = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        const filePath = req.file.filename; // only filename, not full path

        const result = await Profile(filePath, req.user.userId)

        return res.json({
            message: "Profile photo uploaded successfully",
            file: filePath
        });
    } catch (error) {
        console.error("Error in Upload Profile Photo ",error.message ?? error);
        return res.status(500).json({ message: error.message });
    }
};
