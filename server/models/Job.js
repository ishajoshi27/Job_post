const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    experience: { type: String, required: true },
    candidates: [{ type: String }],
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
    endDate: { type: Date }
});

module.exports = mongoose.model('Job', JobSchema);
