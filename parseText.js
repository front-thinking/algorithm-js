/**
 * 类似于Vue中的模板解析
 * */
function parseText (text) {

    const tagRE = /\{\{((?:.|\n)+?)\}\}/g

    if (!tagRE.test(text)) {
        return;
    }

    const tokens = [];
    let lastIndex = tagRE.lastIndex = 0;
    let match, index;

    while (( match = tagRE.exec(text))){
        index = match.index;

        if(index > lastIndex) {
            tokens.push(JSON.stringify(text.slice(lastIndex, index)));
        }

        tokens.push(`_s(${match[1].trim()})`);

        lastIndex = index + match[0].length;

    }

    if (lastIndex < text.length) {
        tokens.push(JSON.stringify(text.slice(lastIndex)));
    }

    return tokens.join('+');

}

function _s(val) {
    return val == null
        ? ''
        : typeof val === 'object'
            ? JSON.stringify(val, null, 2)
            : String(val);
}

function getStr(obj, tpl) {
    let strFunc = new Function('obj', 'with(obj){str = ' + tpl + '} return str;');
    return strFunc(obj);
}