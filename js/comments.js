fetch('https://jsonplaceholder.typicode.com/comments')
    .then(res => res.json())
    .then(data => showData(data));

const showData = comments => {
    comments.forEach(comment => {
        displayComments(comment);
    });
}


const displayComments = comment => {
    console.log(comment);
    const allComments = document.getElementById('all-comments');
    document.getElementById('show-comment').addEventListener('click', () => {
        const div = document.createElement('div');
        div.classList.add('comment-box');
        div.innerHTML = `
            <h5>Email: ${comment.email}</h5>
            <h3>Title: ${comment.name}</h3>
            <p>${comment.body}</p>
        `;
        allComments.appendChild(div);
    });
}