function prevpage() {
    loadPage(-50);
}

function nextpage() {
    loadPage(50);
}

function movepage() {
    page = 0;
    
    searchpage = $('.page-num').val();

    searchpage = parseInt(searchpage);
    console.log(searchpage);
    loadPage(searchpage);
}