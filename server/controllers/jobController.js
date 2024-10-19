const Job = require('../models/Job');

exports.postJob = async (req, res) => {
    const { title, description, experience, candidates } = req.body;
    try {
        const newJob = new Job({
            title,
            description,
            experience,
            candidates: candidates.split(','),
            postedBy: req.user.id
        });
        await newJob.save();
        res.status(201).json({ message: 'Job posted successfully' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
