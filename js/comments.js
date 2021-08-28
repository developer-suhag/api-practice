fetch('https://jsonplaceholder.typicode.com/comments')
    .then(res => res.json())
    .then(data => showData(data));

const showData = comments => {
    comments.forEach(comment => {
        displayComments(comment);
    });
}


const displayComments = comment => {
    // console.log(comment);
    const allComments = document.getElementById('all-comments');
    /*  // load by click on button
     document.getElementById('show-comment').addEventListener('click', () => {
         const div = document.createElement('div');
         div.classList.add('comment-box');
         div.innerHTML = `
             <h5>Email: ${comment.email}</h5>
             <h3>Title: ${comment.name}</h3>
             <p>${comment.body}</p>
         `;
         allComments.appendChild(div);
     }); */

    // load data on page refersh
    const div = document.createElement('div');
    div.classList.add('comment-box');
    div.innerHTML = `
            <p class="text-success">Email: ${comment.email.toLowerCase()}</p>
            <h3>Title: ${comment.name}</h3>
            <button class="btn btn-outline-success mt-2" onclick = "getCommentId('${comment.id}')"  data-bs-toggle="modal" data-bs-target="#exampleModal">Show Details</button>
        `;
    allComments.appendChild(div);
};

const getCommentId = async commentId => {
    const url = `https://jsonplaceholder.typicode.com/comments/${commentId}`
    const res = await fetch(url);
    const data = await res.json();
    showDetails(data);
};

const showDetails = comment => {
    // console.log(comment);
    const container = document.getElementById('all-comments');
    const modal = document.createElement('div')
    modal.innerHTML = `
    <!-- Modal -->
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Title: ${comment.name}</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <p>${comment.email}</p>
                <p>${comment.body}</p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
            </div>
        </div>
    </div>
    `;
    container.appendChild(modal)
}