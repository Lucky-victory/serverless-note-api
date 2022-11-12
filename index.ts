fetch("/api/notes")
  .then((res) => res.json())
  .then((notes) => {
    console.log("=".repeat(10));
    console.log(notes);
    console.log("-".repeat(10));
  });
