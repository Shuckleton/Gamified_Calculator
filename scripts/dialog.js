const createDialogBox=(message,classification)=>{
    
    const dialog = document.createElement('dialog');
    dialog.innerHTML=`
    <p>${classification}</p>
    <p>${message}</p>
    <button class ="dialogBtn">OK</button>
    `;
    dialog.className='dialog'
    document.body.appendChild(dialog);


    dialog.showModal();

    dialog.querySelector('button').addEventListener('click', () => {
        dialog.close();
        dialog.remove(); 
    });

}