const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const roleSchema = new Schema({
    role_id: {
        type: Number,
        unique: true,
    },
    role_name: {
        type: String,
        unique: true,
    },
});

const defaultRoles = [
    { role_id: 1, role_name: "admin" },
    { role_id: 2, role_name: "application_user" },
    { role_id: 3, role_name: "tester" },
];

roleSchema.statics.initDefaultRoles = async function() {
    const Role = this;

    for (let i = 0; i < defaultRoles.length; i++) {
        const role = defaultRoles[i];
        const existingRole = await Role.findOne({ role_id: role.role_id });

        if (!existingRole) {
            await Role.create(role);
        }
    }
};

const Role = mongoose.model("Role", roleSchema);

module.exports = Role;
