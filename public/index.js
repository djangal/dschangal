if (window.netlifyIdentity) {
  window.netlifyIdentity.on("init", (user) => {
    if (!user) {
      window.netlifyIdentity.on("login", () => {
        document.location.href = "/admin/";
      });
    }
  });
}

// setTimeout(() => {
//   var rellax = new Rellax("img", {
//     speed: 2,
//     center: false,
//     wrapper: null,
//     round: true,
//     vertical: true,
//     horizontal: false,
//   });
// }, 1000);
