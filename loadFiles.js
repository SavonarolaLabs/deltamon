const sourceFolder = "/Users/x86/Documents/deltamon_export/";
const targetFolder = "/Users/x86/repos/deltamon/static/monster/";
const fs = require("fs");

let allFiles = [];
fs.readdir(sourceFolder, (err, files) => {
	allFiles = files.sort();
	allFiles.forEach((f, i) => {
		fs.createReadStream(sourceFolder + f).pipe(
			fs.createWriteStream(targetFolder + (i + 1) + ".jpg")
		);
	});
	//console.log(allFiles)
	//allFiles = [...files]
});
