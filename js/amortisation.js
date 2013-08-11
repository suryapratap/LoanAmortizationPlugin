(function ($) {

    $.fn.amortize = function (options) {
        // This is the easiest way to have default options.
        var o = $.extend({
            // These are the defaults.
            amount: 100000,
            rate: 10.25,
            tenure: 240,
            extras: 0
        }, options);

        function getEmi(P, ar, n) {
            var r = ar / 1200;
            var c = Math.pow((1 + r), n);
            return P * r * c / (c - 1)
        }

        function round2(num) {
            return Math.round(num * 100) / 100;
        }

        var content = '<table class="amTable"><caption>Amortization Table</caption><thead><th>Pmt.No.</th><th>Start Bal</th><th>Sch. Pmt</th><th>Ext. Pmt.</th><th>Tot. Pmt.</th><th>Principal</th><th>Int</th><th>End. Bal.</th><th>Cum. Int.</th></thead><tbody>';

        var emi = getEmi(o.amount, o.rate, o.tenure);

        var ext = o.extras * 1;
        var rloc = o.rate / 1200;
        var bal = o.amount * 1;
        var pno = 1;

        var cui = 0;
        while (bal > 0) {
            var int = bal * rloc;
            var due = bal + int;
            var tp = emi + ext;

            if (due <= tp) {
                if (due <= emi) {
                    emi = due;
                    ext = 0;
                } else {
                    ext = due - emi;
                    ext = ext < 0 ? 0 : ext;
                }
            }

            tp = emi + ext;


            var pri = tp - int;
            var ebal = bal - pri;
            cui += int;

            content += '<tr>';
            content += '<td>' + pno++ + '</td>';
            content += '<td>' + round2(bal) + '</td>';
            content += '<td>' + round2(emi) + '</td>';
            content += '<td>' + round2(ext) + '</td>';
            content += '<td>' + round2(tp) + '</td>';
            content += '<td>' + round2(pri) + '</td>';
            content += '<td>' + round2(int) + '</td>';
            content += '<td>' + round2(ebal) + '</td>';
            content += '<td>' + round2(cui) + '</td>';
            content += '</tr>';

            bal = ebal;
        }

        content += '</tbody>'
        return this.html(content);
    }
}(jQuery)
    )
;

