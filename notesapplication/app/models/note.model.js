module.exports = mongoose => {
    const Note = mongoose.model(
      "note",
      mongoose.Schema(
        {
          title: String,
          description: String
        },
        { timestamps: true }
      )
    );
    return Note;
  };