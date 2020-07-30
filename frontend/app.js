import './styles/app.css';
import UI from './UI';

document.addEventListener('DOMContentLoaded', () => {
    const ui = new UI();
    ui.renderFiles();
});

document.getElementById('file-form').addEventListener('submit', e => {
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const description = document.getElementById('description').value;
    const image = document.getElementById('image').files;

    const formData = new FormData();
    formData.append('image', image[0]);
    formData.append('title', title);
    formData.append('author', author);
    formData.append('description', description);

    const ui = new UI();
    
    if (title === '' || author === '' || description === '') {
        ui.renderMessage('Please fill all fields', 'danger', 3000);
    } else {
        ui.addNewFile(formData);
        ui.renderMessage('New File Added', 'success', 2000);
    }

    e.preventDefault();
});

document.getElementById('files-card').addEventListener('click', e => {
    if(e.target.classList.contains('delete')) {
        const ui = new UI();
        ui.deleteFile(e.target.getAttribute('_id'));
        ui.renderMessage('File Removed', 'danger', 3000);
    }
    e.preventDefault();
});