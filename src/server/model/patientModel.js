import mongoose from "mongoose";

const patientSchema = new mongoose.Schema({
    name: { type: String, default:"" },
    dob: { type: Date, default: Date.now },
    gender: { type: String, default: "" },
    address: { type: String, default:"" },
    contact_number: { type: String, default:"" },
    date_of_visit: { type: Date, default: Date.now },
    attrition: { type: String, default: "" },
    abrasion: { type: String, default: "" },
    erosion: { type: String, default: "" },
    abfraction: { type: String, default: "" },
    primary_dent: { type: String, default: "" },
    mixed_dent: { type: String, default: "" },
    permanent_dent: { type: String, default: "" },
    tooth_size: { type: String, default: "" },
    tooth_shape: { type: String, default: "" },
    tooth_struct: { type: String, default: "" },
    tooth_mp: { type: String, default: "" },
    lips_palate: { type: String, default: "" },
    soft_tissues: { type: String, default: "" },
    gingiva: { type: String, default: "" },
    jaw: { type: String, default: "" },
    opg: { type: String, default: "" },
    bitewing: { type: String, default: "" },
    cbct: { type: String, default: "" }
}, { timestamps: true });

const Patient = mongoose.model("Patient", patientSchema);

export default Patient;
