import Patient from "../model/patientModel.js";

export const fetch = async (req, res) => {
    try {
        const patients = await Patient.find();
        res.status(200).json(patients);
    } catch (error) {
        res.status(500).json({ error: error.message || "Failed to fetch patients." });
    }
};

export const createPatient = async (req, res) => {
    try {

        const { name, dob, gender, address, contact_number, date_of_visit, attrition, abrasion, erosion, abfraction, primary_dent, mixed_dent, permanent_dent, tooth_size, tooth_shape, tooth_struct, tooth_mp, lips_palate, soft_tissues, gingiva, jaw } = req.body;

        const opg = req.files?.opg ? req.files.opg[0].path : "";
        const bitewing = req.files?.bitewing ? req.files.bitewing[0].path : "";
        const cbct = req.files?.cbct ? req.files.cbct[0].path : "";

        const newPatient = new Patient({
            name,
            dob,
            gender,
            address,
            contact_number,
            date_of_visit,
            attrition,
            abrasion,
            erosion,
            abfraction,
            primary_dent,
            mixed_dent,
            permanent_dent,
            tooth_size,
            tooth_shape,
            tooth_struct,
            tooth_mp,
            lips_palate,
            soft_tissues,
            gingiva,
            jaw,
            opg,
            bitewing,
            cbct
        });

        await newPatient.save();
        res.status(201).json({ message: "Patient record created successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message || "Failed to create patient record." });
    }
};

export const update = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        if (req.files) {
            if (req.files["opg"]) updateData.opg = req.files["opg"][0].path;
            if (req.files["bitewing"]) updateData.bitewing = req.files["bitewing"][0].path;
            if (req.files["cbct"]) updateData.cbct = req.files["cbct"][0].path;
        }

        const updatedPatient = await Patient.findByIdAndUpdate(id, updateData, { new: true });

        if (!updatedPatient) {
            return res.status(404).json({ error: "Patient not found" });
        }

        res.status(200).json({ message: "Patient record updated successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message || "Failed to update patient record." });
    }
};

export const deletePatient = async (req, res) => {
    try {
        const { name } = req.params;
        const deletedPatient = await Patient.findOne(name);

        if (!deletedPatient) {
            return res.status(404).json({ error: "Patient not found" });
        }

        res.status(200).json({ message: "Patient record deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message || "Failed to delete patient record." });
    }
};