import FileService from './services/FileService';
import { format } from 'timeago.js';

const fileService = new FileService();

class UI {

    async renderFiles() {
        const files = await fileService.getFile();
        const filesCard = document.getElementById('files-card');
        filesCard.innerHTML = '';
        files.forEach(file => {
            const div = document.createElement('div');
            div.className = '';
            div.innerHTML = `
                <div class="card mt-4">
                    <img src="${file.imagePath}" class="img-fluid" />
                    <div class="card-body">
                        <h4 class="card-title">${file.title}</h4>
                        <p class="card-text">${file.author}</p>
                        <p class="card-text">${file.description}</p>
                        <a href="#" class="btn btn-danger delete" _id="${file._id}">X</a>
                        </div>
                        <div class="card-footer text-center">
                            ${format(file.created_at)}
                        </div>
                    </div>
                </div>
            `;
            filesCard.appendChild(div);
        });
    }

    async addNewFile(file) {
        await fileService.postFile(file);
        this.clearFileForm();
        this.renderFiles();
    }

    clearFileForm() {
        document.getElementById('file-form').reset();
    }

    renderMessage(message, colorMessage, secondsToRemove) {
        const div = document.createElement('div');
        div.className = `alert alert-${colorMessage} message`;
        div.appendChild(document.createTextNode(message));

        const container = document.querySelector('.col-md-6');
        const fileForm = document.querySelector('#file-form');

        container.insertBefore(div, fileForm);
        setTimeout(() => {
            document.querySelector('.message').remove();
        }, secondsToRemove);
    }

    async deleteFile(fileId) {
        await fileService.deleteFile(fileId);
        this.renderFiles();
    }

}

export default UI;