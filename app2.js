function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

function procesa () {

    var d = document.getElementById("input").value
        .split("\n")
        .map(function (l) {
            return l.split("\t");
        })
        .filter(function (d) {
            return (d[0] === "") || isNumber(d[0]);
        })

    var output = "";
    for (var i = 0; i < d.length; ++i) {
        var prefix = (d[i][9] === 'facturas') ? "" : "-"
        output += d[i][0] + "\t" + d[i][1] + "\t" + d[i][2] + "\t" + d[i][3] + "\t" + prefix + d[i][8] + "\t" + prefix + d[i][4] + "\t21\t" + prefix + d[i][5];
        output += "\n";
        output += "\t\t\t\t\t" + prefix + d[i][6] + "\t10\t" + prefix + d[i][7];
        output += "\n";
    }

    document.getElementById("output").value = output;
}
