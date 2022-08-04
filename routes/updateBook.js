/* Edit book form. */
router.get("/books/:id", asyncHandler(async(req, res) => {
    const book = await Book.findByPk(req.params.id);
    if(book) {
      res.render("update-book", { book, title: book.title})
    } else {
      res.render("page-not-found")
    }
    
  }));
  
  /* Update a book. */
  router.post('/books/:id', asyncHandler(async (req, res) => {
    let book;
    try {
      book = await Book.findByPk(req.params.id);
      if(book) {
        await book.update(req.body);
        res.redirect("/");
      } else {
        res.render("page-not-found");
      }
    } catch (error) {
      if(error.name === "SequelizeValidationError") { // checking the error
        book = await Book.build(req.body);
        res.render("update-book", { book, errors: error.errors, title: "Update Book" })
      } else {
        throw error; // error caught in the asyncHandler's catch block
      }
    }
    
  }));