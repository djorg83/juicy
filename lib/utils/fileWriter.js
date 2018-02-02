const { unlinkSync, writeFileSync, appendFileSync } = require('fs');

class FileWriter {
    constructor(absolutePath) {
        this.filePath = absolutePath;
    }

    removeFile() {
        try {
            unlinkSync(this.filePath, 0);
            return this;
        } catch (e) {
            // silence errors when removing a file, if the file didnt exist then who cares
            return this;
        }
    }

    createFile() {
        writeFileSync(this.filePath, '');
        return this;
    }

    emptyFile() {
        this.removeFile();
        return this.createFile();
    }

    appendFile(text = '') {
        appendFileSync(this.filePath, text);
        return this;
    }

    nextLine() {
        return this.appendFile('\n');
    }

    writeLine(line) {
        this.appendFile(line);
        return this.nextLine();
    }

    writeBlock(lines) {
        lines.map(this.writeLine.bind(this));
        return this.nextLine();
    }
}

module.exports = (absolutePath) => new FileWriter(absolutePath);
