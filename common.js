let page = 0;

loadPage(0);

function loadPage(a) {
    $('.box').html('');


    $.get('기초과학_1~10000_json검수용.json', function (data) {

        page += a;
        data = data.Sheet1;
        console.log(page);
        for (let i = page; i < page + 50; i++) {
            if (data[i].SPC_technical_label == undefined && data[i].SPC_proper_label == undefined) {
                
                $('.box').append(

                    `<tr>
                    <th>${data[i].NO}</th>
                    <td>${data[i].SRC_paragraphs_id}</td>
                    <td style="text-align : left">${data[i].SRC_sentence}</td>
                    <td class="change${i}"><textarea class="SPC_rabel${i}"}></textarea></td>
                    <td class="change${i}"><textarea class="SPC_rabel${i}"}></textarea></td>
                </tr>
                `
                );
                // <td><button onclick=
                // "
                // $('.change${i}').html($('.SPC_rabel${i}')[0].value);
                // ">
                // fix</button></td>

            } else if (data[i].SPC_technical_label != undefined && data[i].SPC_proper_label == undefined) {

                let sentence = data[i].SRC_sentence;

                for (let j = 0; j < data[i].SPC_technical_label.length; j++) {
                    sentence = sentence.replace(data[i].SPC_technical_label.split(',')[j], `<span style="background : yellow">${data[i].SPC_technical_label.split(',')[j]}</span>`);
                }

                $('.box').append(
                    `<tr>
                    <th>${data[i].NO}</th>
                    <td>${data[i].SRC_paragraphs_id}</td>
                    <td style="text-align : left">${sentence}</td>
                    <td class="change${i}"><textarea class="SPC_rabel${i}" >${data[i].SPC_technical_label}</textarea></td>
                    <td class="change${i}"><textarea class="SPC_rabel${i}"}></textarea></td>
                </tr>`
                )

            } else if (data[i].SPC_technical_label == undefined && data[i].SPC_proper_label != undefined) {
                let sentence = data[i].SRC_sentence;

                for (let j = 0; j < data[i].SPC_proper_label.length; j++) {
                    sentence = sentence.replace(data[i].SPC_proper_label.split(',')[j], `<span style="background : orange">${data[i].SPC_proper_label.split(',')[j]}</span>`);
                }
                $('.box').append(
                    `<tr>
                    <th>${data[i].NO}</th>
                    <td>${data[i].SRC_paragraphs_id}</td>
                    <td style="text-align : left">${sentence}</td>
                    <td class="change${i}"><textarea class="SPC_rabel${i}"}></textarea></td>
                    <td class="change${i}"><textarea class="SPC_rabel${i}" >${data[i].SPC_proper_label}</textarea></td>
                </tr>`
                )
            } else {
                let sentence = data[i].SRC_sentence;


                for (let j = 0; j < data[i].SPC_technical_label.length; j++) {
                    sentence = sentence.replace(data[i].SPC_technical_label.split(',')[j], `<span style="background : yellow">${data[i].SPC_technical_label.split(',')[j]}</span>`);
                }
                for (let j = 0; j < data[i].SPC_proper_label.length; j++) {
                    sentence = sentence.replace(data[i].SPC_proper_label.split(',')[j], `<span style="background : orange">${data[i].SPC_proper_label.split(',')[j]}</span>`);
                }


                $('.box').append(
                    `<tr>
                    <th>${data[i].NO}</th>
                    <td>${data[i].SRC_paragraphs_id}</td>
                    <td style="text-align : left">${sentence}</td>
                    <td class="change${i}"><textarea class="SPC_rabel${i}" >${data[i].SPC_technical_label}</textarea></td>
                    <td class="change${i}"><textarea class="SPC_rabel${i}" >${data[i].SPC_proper_label}</textarea></td>
                </tr>`
                )
            }
        }
    })

}