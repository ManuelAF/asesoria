function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

function procesa () {

    var ColumnaBaseImponible = 5;

    var d = document.getElementById("input").value
        .split("\n")
        .map(function (l) {
            return l.split("\t");
        })
        .filter(function (d) {
            return (d[0] === "") || isNumber(d[0]);
        })

    var Facturas = {};
    var FacturaActual = "";
    for (var i = 0; i < d.length; ++i) {
        if (isNumber(d[i][0])) {
            FacturaActual = d[i][0];
            Facturas[FacturaActual] = {
                Fecha : d[i][1],
                Nombre: d[i][2],
                NIF: d[i][3],
                Importe: d[i][4],
                Bases: {}
            }
        }
        if (!Facturas[FacturaActual].Bases.hasOwnProperty(d[i][5])) {
            Facturas[FacturaActual].Bases[d[i][5]] = [];
        }
        Facturas[FacturaActual].Bases[d[i][5]].push({t: d[i][6], c: d[i][7]});
    }

    var output = "";
    for (var f in Facturas) {

        if (Facturas.hasOwnProperty(f)) {

            for (var b in Facturas[f].Bases) {
                if (Facturas[f].Bases.hasOwnProperty(b)) {

                    output += [ f, Facturas[f].Fecha, Facturas[f].Nombre, Facturas[f].NIF, Facturas[f].Importe, b ].join("\t");
                    output += "\t";

                    Facturas[f].Bases[b].forEach(function (TipoYCuota) {
                        output += [ TipoYCuota.t, TipoYCuota.c ].join("\t");
                        output += "\t";
                    });

                    output += "\n";
                }
            }
        }
    }
    document.getElementById("output").value = output;
}
