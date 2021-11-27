export const getToaster = (text) => {
  return {
    text: text,
    duration: 3000,
    destination: "https://github.com/apvarun/toastify-js",
    newWindow: true,
    close: true,
    gravity: "top", // `top` or `bottom`
    position: "left", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: "linear-gradient(to bottom right, #fd04dc, #00e1ff)",
    },
    onClick: function () {}, // Callback after click
  };
};
