let page = 0;
let jsondata;
let tech_useable;
getData();

document.addEventListener("keydown", function (e) {
    if (e.keyCode === 38) {
        prevpage();
    } else if (e.keyCode === 40) {
        nextpage();
    } else if (e.keyCode === 13) {
        search();
    }
});

function getData() {
    $.get('mungchi.json', function (data) {
        versiondata = data.Version;
        jsondata = data.Sheet1;
        tech_useable = data.전문용어맞음;
    })
        .done(function () {
            loadPage(page);
        }
        );
}



function loadPage(a) {
    page += a;

    var replaceId = /[./]/gi;

    $(document).ready(function () {

        $("#tech_textarea").on("focusout", function () {
            var x = $(this).val();
            if (x.length > 0) {
                if (x.match(replaceId)) {
                    x = x.replace(replaceId, "");
                }
                $(this).val(x);
            }
        }).on("keyup", function () {
            $(this).val($(this).val().replace(replaceId, ""));

        });
    });
    $(document).ready(function () {

        $("#proper_textarea").on("focusout", function () {
            var x = $(this).val();
            if (x.length > 0) {
                if (x.match(replaceId)) {
                    x = x.replace(replaceId, "");
                }
                $(this).val(x);
            }
        }).on("keyup", function () {
            $(this).val($(this).val().replace(replaceId, ""));

        });
    });

    $('#total_para').html(jsondata.length);
    $('.movepage_num').val(page);

    let version = versiondata[0].version;
    let tech_label = jsondata[page].SPC_technical_label;
    let proper_label = jsondata[page].SPC_proper_label;
    let pageNumber = jsondata[page].NO;
    let para_id = jsondata[page].SRC_paragraphs_id;
    let sentence = jsondata[page].SRC_sentence;


    if (tech_label == undefined && proper_label == undefined) {
        $('.top-menu').html('');
        $('.top-menu').append(
            `
                <p>버전 : ${version}  </p>
                <p>NO : <span id="para-num">${pageNumber}</span></p>
                <p>문장식별코드 : <span id="para-id">${para_id}</span><span><button class="copy" onclick="copy()">복사</button></span></p>
                <div class="alert">복사완료</div>
                `
        )

        $('.org-sentence').html('');
        $('.org-sentence').append(`
                <h2>＜원문＞</h2>
                <p id = "org_sentence">${sentence}</p>
                <div class="search-box">
                    <input type="text" class="search-input">
                    <button class="search-btn" onclick="search()">전문용어 검색</button>
                    <p class="useok"></p>
                 </div>
            `)

        $('.spc-label').html('');
        $('.spc-label').append(`
                <h2><전문용어 라벨링＞</h2>
                <textarea id = "tech_textarea"></textarea>
            `)

        $('.spc-original-label').html('');
        $('.spc-original-label').append(`
                <h2>＜고유명사 라벨링＞</h2>
                <textarea id = "proper_textarea"></textarea>
                <h2>＜관습용어 라벨링＞</h2>
            `)

    } else if (tech_label != undefined && proper_label == undefined) {
        $('.top-menu').html('');
        $('.top-menu').append(
            `   <p>버전 : ${version}  </p>
                <p>NO : <span id="para-num">${pageNumber}</span></p>
                <p>문장식별코드 : <span id="para-id">${para_id}</span><span><button class="copy" onclick="copy()">복사</button></span></p>
                <div class="alert">복사완료</div>
                `
        )


        for (let j = 0; j < tech_label.length; j++) {
            sentence = sentence.replaceAll(tech_label.split(',')[j], `<span style="background : rgb(133, 133, 37); border-radius : 5px;">${tech_label.split(',')[j]}</span>`);
        }

        $('.org-sentence').html('');
        $('.org-sentence').append(`
                <h2>＜원문＞</h2>
                <p id = "org_sentence">${sentence}</p>
                <div class="search-box">
                    <input type="text" class="search-input">
                    <button class="search-btn" onclick="search()">전문용어 검색</button>
                    <p class="useok"></p>
                 </div>
            `)

        $('.spc-label').html('');
        $('.spc-label').append(`
                <h2><전문용어 라벨링＞</h2>
                <textarea id = "tech_textarea">${tech_label}</textarea>
            `)

        $('.spc-original-label').html('');
        $('.spc-original-label').append(`
                <h2>＜고유명사 라벨링＞</h2>
                <textarea id = "proper_textarea"></textarea>
            `)
    } else if (tech_label == undefined && proper_label != undefined) {
        $('.top-menu').html('');
        $('.top-menu').append(
            `
                <p>버전 : ${version}  </p>
                <p>NO : <span id="para-num">${pageNumber}</span></p>
                <p>문장식별코드 : <span id="para-id">${para_id}</span><span><button class="copy" onclick="copy()">복사</button></span></p>
                <div class="alert">복사완료</div>
                `
        )

        for (let j = 0; j < proper_label.length; j++) {
            sentence = sentence.replaceAll(proper_label.split(',')[j], `<span style="background : rgb(107, 107, 190); border-radius : 5px;">${proper_label.split(',')[j]}</span>`);
        }

        $('.org-sentence').html('');
        $('.org-sentence').append(`
                <h2>＜원문＞</h2>
                <p id = "org_sentence">${sentence}</p>
                <div class="search-box">
                    <input type="text" class="search-input">
                    <button class="search-btn" onclick="search()">전문용어 검색</button>
                    <p class="useok"></p>
                 </div>
            `)

        $('.spc-label').html('');
        $('.spc-label').append(`
                <h2><전문용어 라벨링＞</h2>
                <textarea id = "tech_textarea"></textarea>
            `)

        $('.spc-original-label').html('');
        $('.spc-original-label').append(`
                <h2>＜고유명사 라벨링＞</h2>
                <textarea id = "proper_textarea">${proper_label}</textarea>
                <h2>＜관습용어 라벨링＞</h2>
            `)
    } else if (tech_label != undefined && proper_label != undefined) {
        $('.top-menu').html('');
        $('.top-menu').append(
            `
                <p>버전 : ${version}  </p>
                <p>NO : <span id="para-num">${pageNumber}</span></p>
                <p>문장식별코드 : <span id="para-id">${para_id}</span><span><button class="copy" onclick="copy()">복사</button></span></p>
                <div class="alert">복사완료</div>
                `
        )

        for (let j = 0; j < tech_label.length; j++) {
            sentence = sentence.replaceAll(tech_label.split(',')[j], `<span style="background : rgb(133, 133, 37); border-radius : 5px;">${tech_label.split(',')[j]}</span>`);
        }

        for (let j = 0; j < proper_label.length; j++) {
            sentence = sentence.replaceAll(proper_label.split(',')[j], `<span style="background : rgb(107, 107, 190); border-radius : 5px;">${proper_label.split(',')[j]}</span>`);
        }

        $('.org-sentence').html('');
        $('.org-sentence').append(`
                <h2>＜원문＞</h2>
                <p id = "org_sentence">${sentence}</p>
                <div class="search-box">
                    <input type="text" class="search-input">
                    <button class="search-btn" onclick="search()">전문용어 검색</button>
                    <p class="useok"></p>
                 </div>
            `)

        $('.spc-label').html('');
        $('.spc-label').append(`
                <h2><전문용어 라벨링＞</h2>
                <textarea id = "tech_textarea">${tech_label}</textarea>
            `)

        $('.spc-original-label').html('');
        $('.spc-original-label').append(`
                <h2>＜고유명사 라벨링＞</h2>
                <textarea id = "proper_textarea">${proper_label}</textarea>
            `)
    }
}


function search() {
    $('.useok').html('');
    var want_search = $('.search-input').val();
    var useok = 0;

    for (var i = 0; i < tech_useable.length; i++) {
        if (want_search == tech_useable[i].search_spc) {
            useok = 1;
            break;
        } else {
            useok = 0;
        }
    }

    if (useok == 1) {
        $('.useok').append(`
            <p style="color : green; margin-bottom : 10px;">사용가능</p>
            <button class="search_copy" onclick="search_copy1()">~~,</button>
            <button class="search_copy" onclick="search_copy2()">,~~</button>
            `)
    } else {
        $('.useok').append(`
            <p style="color : red">사용불가</p>
            `)
    }
}

function copy() {
    let copyText_no = document.getElementById("para-num");
    let copyText1 = document.getElementById("para-id");
    let copyText_org = document.getElementById("org_sentence");
    let copyText2 = document.getElementById("tech_textarea").value;
    let copyText3 = document.getElementById("proper_textarea").value;
    let textArea = document.createElement("textarea");

    textArea.value = copyText_no.textContent + "\t" + copyText1.textContent + "\t" + copyText_org.textContent + "\t" + copyText2 + "\t" + copyText3;
    document.body.appendChild(textArea);

    textArea.select();
    document.execCommand("Copy");
    textArea.remove();


    $('.alert').addClass('show');

    setTimeout(() => {
        $('.alert.show').removeClass('show');
    }, 600);
}

function nextpage() {
    loadPage(1);
}

function prevpage() {
    loadPage(-1);
}

function movepage() {
    page = 0;
    var movepage_num = $('.movepage_num').val();

    movepage_num = parseInt(movepage_num);
    loadPage(movepage_num);
}

function search_copy1() {
    let searchcopy1 = $('.search-input').val();
    let textArea = document.createElement("textarea");

    textArea.value = searchcopy1 + ",";
    document.body.appendChild(textArea);

    textArea.select();
    document.execCommand("Copy");
    textArea.remove();
}

function search_copy2() {
    let searchcopy1 = $('.search-input').val();
    let textArea = document.createElement("textarea");

    textArea.value = "," + searchcopy1;
    document.body.appendChild(textArea);

    textArea.select();
    document.execCommand("Copy");
    textArea.remove();
}