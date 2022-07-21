module.exports = mongoose => {
    const Student = mongoose.model(
      "student",
      mongoose.Schema(
        {
            firstName: String,
            lastName: String,
            email: String,
            dateOfBirth: Date,
            mobile: Number,
            status: Boolean,
            password: String,
            accountType: String,
        },
        { timestamps: true }
      )
    );
    return Student;
  };