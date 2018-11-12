$(()=>{
    $('#table').load('http://localhost:6008/table')

    $('#add').click(e=>{
        e.preventDefault()
        var file = $('#file').val().split('\\').pop()
        var desc = $('#desc').val()
        var path = '"/images/'+file+'"'
        $('#table').append('<tr><td><a href='+path+'>'+file+'</a></td><td>'+desc+'</td></tr>')
        ajaxPost()
        formPost()
    })

    $('#clean').click(e=>{
        e.preventDefault()
        $('#desc').val('')
        $('#file').val('')
    })

    function ajaxPost() {
        $.ajax({
            type: 'POST',
            contentType: 'application/json',
            url: 'http://localhost:6008/update',
            data: JSON.stringify({file: $('#file').val().split('\\').pop(), desc: $('#desc').val()}),
            success: p => {},
            error: e => {
                alert('1--> Erro no post: ' + JSON.stringify(e))
                console.log('ERRO: ' + e)
            }
        })
    }

    function formPost() {
        var form_data = new FormData($('#myUploadForm')[0]);
        $.ajax({
            type: 'POST',
            url: 'http://localhost:6008/add',
            processData: false,
            contentType: false,
            async: true,
            cache: false,
            data: form_data,
            success: p => {alert('File Sent to System: '+p)},
            error: e => {
                alert('2--> Erro no post: ' + JSON.stringify(e))
                console.log('ERRO: '+ e)
            }
        })
        $('#desc').val('')
        $('#file').val('')
    }
})