const express = require("express");
const router = express.Router();
const db = require("../../database.js");

router.post('/maize-data/:id', async (req, res) => {
    const { id } = req.params;  // Extract user_id from URL parameter
    const { maize_details } = req.body;  // Extract maize_details from the request body

    try {
        // First, check if there's existing data for the given user_id
        const result = await db.query(
            'SELECT * FROM maize_data WHERE user_id = $1',
            [id]
        );

        let maizeDataResult;

        if (result.rows.length > 0) {
            // If the data already exists, we need to append new maize_details

            // Retrieve the existing maize_details (which is an array of objects)
            const existingMaizeDetails = result.rows[0].maize_details;

            // Append the new maize_details to the existing array
            const updatedMaizeDetails = [
                maize_details,          // Append the new maize_details
                ...existingMaizeDetails   // Keep the old maize_details
            ];

            // Update the record with the new maize_details
            const updateResult = await db.query(
                'UPDATE maize_data SET maize_details = $1 WHERE user_id = $2 RETURNING *',
                [updatedMaizeDetails, id]  // Directly pass the array without JSON.stringify
            );
            maizeDataResult = updateResult;
        } else {
            // If no data exists for the user, insert a new record with the maize_details as an array
            const insertResult = await db.query(
                'INSERT INTO maize_data (user_id, maize_details) VALUES ($1, $2) RETURNING *',
                [id, [maize_details]]  // Insert maize_details as an array of objects
            );
            maizeDataResult = insertResult;
        }

        // Now, update the uploadCount in the users table
        const updateUploadCount = await db.query(
            'UPDATE users SET uploadCount = uploadCount + 1 WHERE id = $1 RETURNING *',
            [id]  // Increment the uploadCount by 1
        );

        if (updateUploadCount.rows.length > 0) {
            // Send the success response
            res.status(200).json({
                success: true,
                data: maizeDataResult.rows[0].maize_details, // Return the maize data record
                uploadCount: updateUploadCount.rows[0].uploadCount // Return the updated uploadCount
            });
        } else {
            res.status(400).json({
                success: false,
                message: 'Failed to update upload count'
            });
        }
    } catch (err) {
        console.error('Error updating or inserting data:', err);
        res.status(500).json({ success: false, error: err });
    }
});

router.get("/get-maize-data", async (req, res) => {
    const user = req.user;
    if (!user) return res.status(401).json({ success: false, error: "user is not authenticated" });
    const id = user.id;
    try {
        const result = await db.query(
            'SELECT * FROM maize_data WHERE user_id = $1',
            [id]
        );
        if (!result.rows[0]) return res.status(200).json({ success: true, data: {} });
        return res.status(200).json({ success: true, data: result.rows[0].maize_details });
    } catch (error) {
        console.error(error)
        return res.status(500).json({ success: false, error });
    }
})

module.exports = router;