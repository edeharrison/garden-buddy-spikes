const hello = null;

new Promise((resolveOuter) => {
  resolveOuter(
    new Promise((resolveInner) => {
      setTimeout(resolveInner, 1000);
    })
  );
});


// go to https://www.alphr.com/use-prettier-vs-code/

// it has a super easy set of instructions 
// for installing and automatically formatting 
// when you manually save