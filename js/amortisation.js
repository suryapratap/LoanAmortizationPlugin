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

        var emi = getEmi(o.amount, o.rate, o.tenure);
        var ext = o.extras * 1;
        var tp = ext + emi;
        var rloc = o.rate / 1200;
        var bal = o.amount * 1;
        var content = '<table class="amTable"><thead><th>Pmt.No.</th><th>Start Bal</th><th>Sch. Pmt</th><th>Ext. Pmt.</th><th>Tot. Pmt.</th><th>Principal</th><th>Int</th><th>End. Bal.</th><th>Cum. Int.</th></thead><tbody>';
        var pno = 1;
        var demi = Math.round(emi * 100) / 100;
        var dtot = Math.round(tp * 100) / 100;
        var dext = Math.round(ext * 100) / 100;
        var cui = 0;
        while (Math.round(bal) > 0) {
            var int = bal * rloc;
            int = int < 1 ? 0 : int;
            var due = bal + int;
            if (due <= tp) {
                if (due <= emi) {
                    emi = due;
                    ext = 0;
                    demi = Math.round(emi * 100) / 100;
                    dext = 0;
                } else {
                    ext = tp - emi - due;
                    dext = Math.round(ext * 100) / 100;
                    dtot = Math.round((emi + ext) * 100) / 100;
                }
                tp = emi + ext;
                dtot = Math.round(tp * 100) / 100;
            }

            var pri = tp - int;
            var ebal = bal - pri;
            cui += int;

            content += '<tr>';
            content += '<td>' + pno++ + '</td>';
            content += '<td>' + Math.round(bal * 100) / 100 + '</td>';
            content += '<td>' + demi + '</td>';
            content += '<td>' + dext + '</td>';
            content += '<td>' + dtot + '</td>';
            content += '<td>' + Math.round(pri * 100) / 100 + '</td>';
            content += '<td>' + Math.round(int * 100) / 100 + '</td>';
            content += '<td>' + Math.round(ebal * 100) / 100 + '</td>';
            content += '<td>' + Math.round(cui * 100) / 100 + '</td>';
            content += '</tr>';

            bal = ebal;
        }

        content += '</tbody>'
        return this.html(content);
    }
}(jQuery));

