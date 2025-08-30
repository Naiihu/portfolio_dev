
async function convert() {
    const svgInput = document.getElementById('svgInput');

    const widthInput = document.querySelector('input[name="width"]');
    const heightInput = document.querySelector('input[name="height"]');

    if(svgInput.files[0].type !== 'image/svg+xml') {
        alert('File extension not supported, you must select an SVG file');
    } else {
        const svgInputAsTxt = await svgInput.files[0].text();

        const blob = new Blob([svgInputAsTxt], {type: 'image/svg+xml'});

        const svgToUrl = URL.createObjectURL(blob);

        const img = new Image();

        img.src = svgToUrl;

        function loadImageSrc() {
            if(!img.height && !img.width){
                alert('The svg has no height & width');
            } else if(!img.height) {
                alert('The svg has no height');
            } else if(!img.width) {
                alert('The svg has no width');
            } else {
                const canvas = document.createElement('canvas');

                const context = canvas.getContext('2d');

                canvas.setAttribute('width', parseFloat(widthInput.value) || img.width);
                canvas.setAttribute('height', parseFloat(heightInput.value) || img.height);

                context.drawImage(img, 0, 0, canvas.width, canvas.height);

                const imgUrl = canvas.toDataURL('image/png');

                const output = document.getElementById('pngImg');
                output.src = imgUrl;
            }

            URL.revokeObjectURL(blob);
        }
        if(img.complete) {
            loadImageSrc();
        } else {
            img.addEventListener('load', async () => {
                loadImageSrc();
            });
        }
    }

}

function downloadImg() {
    const svgInput = document.getElementById('svgInput');
    const img = document.getElementById('pngImg');

    const link = document.createElement('a');
    link.href = img.src;
    link.download = svgInput.files[0].name;
    link.click();
}