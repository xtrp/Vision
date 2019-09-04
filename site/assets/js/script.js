// when page is loaded, display container and site
window.addEventListener("load", () => {
	document.querySelector("body > div.container").style.display = "inline-block";
});

// Vision uses FilePond for HTML file input. We implement it here:

// FilePond plugins
FilePond.registerPlugin(FilePondPluginFileEncode);

// create FilePond for image input box
FilePond.create(
	document.querySelector("body > div.container > div.app > div.image_input_container > input[type=file]"),
	{
		labelIdle: "Drag & Drop input image or <span class='filepond--label-action'> Browse File System </span>",
		onaddfile: (error, file) => {
			// file has been added to input box

			// if no error, process file
			if(!error) {
				// variable for encoded image data
				const encodedImageData = file.getFileEncodeDataURL();

				// send request to PHP with encodedImageData, and process results
				let phpAppRequest = new XMLHttpRequest();
				phpAppRequest.open("POST", "app.php", true);

				// set request header
				phpAppRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

				// process request when response is received
				phpAppRequest.onload = () => {
					// 
					if(phpAppRequest.status === 200) {
						console.log(phpAppRequest.response);
					} else {
						// yield error
						alert("Server Error.");
					}
				}

				// send request with encoded image data
				phpAppRequest.send("input_image=" + (encodedImageData.replace(/\+/g, ":")));
			}
		}
	}
);
