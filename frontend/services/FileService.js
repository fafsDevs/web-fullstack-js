class FileService {
    
    constructor() {
        this.URI = '/api/files';
    }

    async getFile() {
        const response = await fetch(this.URI);
        const files = await response.json()
        return files;
    }

    async postFile(file) {
          const res = await fetch(this.URI, {
             method: 'POST',
             body: file
         });
         await res.json();
    }

    async deleteFile(fileId) {
        const res = await fetch(`${this.URI}/${fileId}`, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'DELETE'
        });
        await res.json();
    }
}

export default FileService;