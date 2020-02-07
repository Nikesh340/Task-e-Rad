$(function () {
    $('.progress').hide();
    $('.spinner').hide();
    $('.dataTable').hide();
});

var processedData;

function intiateFetchSequence() {
    $('.btn').hide();


    $('.progress').show();
    $('.spinner').show();

    processData();

    var current_progress = 0;
    var interval = setInterval(function () {
        current_progress += 1;
        $("#progressbar")
            .css("width", current_progress + "%")
            .attr("aria-valuenow", current_progress)
            .text(current_progress + "% Complete");
        if (current_progress >= 100) {
            clearInterval(interval);
            $('.progress').hide();
            $('.spinner').hide();
            $('#dataTable').DataTable({
                responsive: true,
                data: processedData,
                columns: [
                    {data: 'season', title: 'season', defaultContent: ""},
                    {data: 'team1', title: 'team1', defaultContent: ""},
                    {data: 'team2', title: 'team2', defaultContent: ""},
                    {data: 'toss_winner', title: 'toss_winner', defaultContent: ""},
                    {data: 'winner', title: 'winner', defaultContent: ""},
                    {data: 'player_of_match', title: 'player_of_match', defaultContent: ""},
                    {data: 'venue', title: 'venue', defaultContent: ""},


                ]
            });
            $('.dataTable').show();
        }

    }, 25);


}

function processData() {
    /* set up XMLHttpRequest */
    var url = "assets/data/matches.xlsx";
    var oReq = new XMLHttpRequest();
    oReq.open("GET", url, true);
    oReq.responseType = "arraybuffer";

    oReq.onload = function (e) {
        var arraybuffer = oReq.response;

        /* convert data to binary string */
        var data = new Uint8Array(arraybuffer);
        var arr = new Array();
        for (var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
        var bstr = arr.join("");

        /* Call XLSX */
        var workbook = XLSX.read(bstr, {
            type: "binary"
        });

        /* DO SOMETHING WITH workbook HERE */
        var first_sheet_name = workbook.SheetNames[0];
        /* Get worksheet */
        var worksheet = workbook.Sheets[first_sheet_name];
        processedData = (XLSX.utils.sheet_to_json(worksheet, {
            raw: true
        }));
    };

    oReq.send();
}
