import mongoose from "mongoose";
const UserSchema = new mongoose.Schema({
  name: { type: String, required: [true, "a name should be there"] },
  email: {
    type: String,
    unique: true,
    validate: [
      (val) => {
        return val.includes("@");
      },
      "invalid email",
    ],
  },
  password: { type: String, required: true },
});
const UserModel = mongoose.model("User", UserSchema);
export default UserModel;
