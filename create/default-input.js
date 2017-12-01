exports.directiveName =  prompt('Name', '用来在视图中引用特定的指令', function (data) {
    data = data.replace('用来在视图中引用特定的指令', '');
    return data;
});
exports.noteName =  prompt('@name', '指令描述中的名称', function (data) {
    data = data.replace('指令描述中的名称', '');
    return data;
});
exports.noteDescription =  prompt('@description', '指令功能描述', function (data) {
    data = data.replace('指令功能描述', '');
    return data;
});
exports.noteAuthor =  prompt('@author', '作者', function (data) {
    return data;
});
exports.restrict =  prompt('restrict', '声明方式：A--属性(默认)；E--元素', function (data) {
    data = data.replace('声明方式：A--属性(默认)；E--元素', '') || 'A'
    return data;
});
exports.scopes =  prompt('scopes', '是否开始定义继承作用域: N--放弃', function (data) {
    data = data.replace('是否开始定义继承作用域: N--放弃', '') || 'Y'
    return data;
});
