// create a delete book form
router.get("/:id/delete", asyncHandler(async (req, res) => {
    const book = await Book.findByPk(req.params.id);
    if(book) {
      res.render("update-book", { book, title: "Delete Book" });
    } else {
      res.render("page-not-found");
    }
  }));
  router.post('/books/:id/delete', asyncHandler(async (req ,res) => {
    const book = await Book.findByPk(req.params.id);
    console.log(req.params.id)
    if(book) {
      await book.destroy();
      res.redirect("/");
    } else {
      res.render("page-not-found");
    }
    
  }));