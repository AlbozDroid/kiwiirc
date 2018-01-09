import _ from 'lodash';

// "#chan,#chan2" => 2 channels without a key
// "#chan,#chan2 key" => 2 channels, the first having a key
// "#chan,#chan2 key1,key2" => 2 channels, both having a key
// "#chan,#chan2 ,key2" => 2 channels, the second having a key
export function extractBuffers(str) {
    let spaceIdx = str.indexOf(' ');
    if (spaceIdx === -1) spaceIdx = str.length;

    let bufferNames = str.substr(0, spaceIdx).split(',');
    let keys = str.substr(spaceIdx + 1).split(',');

    let buffers = [];
    bufferNames.forEach((bufferName, idx) => {
        buffers.push({
            name: bufferName,
            key: keys[idx] || '',
        });
    });

    return buffers;
}

export function splitHost(uri) {

}

export function mentionsNick(input, nick) {
    let punc = ',.!:;-+)]?¿\\/<>@';

    let idx = input.toLowerCase().indexOf(nick.toLowerCase());
    if (idx === -1) {
        return false;
    }

    let startIdx = input.lastIndexOf(' ', idx);
    if (startIdx === -1) {
        startIdx = 0;
    } else {
        startIdx++;
    }

    let endIdx = input.indexOf(' ', idx);
    if (endIdx === -1) {
        endIdx = input.length;
    }

    let segment = input.substring(startIdx, endIdx);
    let potentialNick = _.trim(segment, punc);

    return potentialNick.toLowerCase() === nick.toLowerCase();
}


export function queryStringVal(_name, _url) {
    let url = _url || window.location.href;
    let name = _.escapeRegExp(_name);
    let regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
    let results = regex.exec(url);

    if (!results) {
        return null;
    }
    if (!results[2]) {
        return '';
    }

    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}


export function networkErrorMessage(err) {
    let errs = {
        err_unknown_host: 'Unknown domain name or host',
        err_forbidden: 'Forbidden to connect',
        err_timeout: 'Took too long to connect',
        err_refused: 'The server refused the connection',
        err_tls: 'Could not connect securely',
        err_proxy: 'The Kiwi IRC server had an error',
    };

    return errs[err] || 'Unknown error';
}
