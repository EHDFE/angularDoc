exports.scope =  prompt('scope', 'N--放弃', function (data) {
    data = data.replace('N--放弃', '');
    return data;
});