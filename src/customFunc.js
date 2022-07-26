export const getDimenssion = (event, setfirst) => {
  var file, img;
  file = event.target.files[0];
  img = new Image();
  var objectUrl = URL.createObjectURL(file);
  img.src = objectUrl;
  img.onload = function () {
      setfirst({ width:img.naturalWidth, height:img.naturalHeight });
  };
};
