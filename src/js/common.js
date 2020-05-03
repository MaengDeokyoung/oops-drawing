(() => {
    let LK = {};

    LK.createImage = (id, parentId, options) => {
        let img = document.createElement('img');

        const image = new Image();
        image.onload = () => {
            img.id = id;
            img.src = image.src;
            img.width = options.width;
            img.height = options.height;
            img.style.left = options.x + "px";
            img.style.top = options.y + "px";
            img.style.position = "absolute";
        };
        image.src = options.src;

        document.getElementById(parentId).appendChild(img);

    };

    window.LK = LK;

})();

const objectPadding = 100;

