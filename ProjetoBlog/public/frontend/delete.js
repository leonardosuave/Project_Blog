function confirmDelete(form) {
    document.addEventListener('click', (e) => {
        e.preventDefault();
        const del = e.target
        if(del.classList.contains('btnDel')) {
            const decision = confirm('Você quer mesmo deletar?')
            if(decision) {
                form.submit();
            }
        }
    })
}
