const compile = require("../compile/compile.js");
const fs = require("fs");
const path = require('path');
const PZ = require('promzard').PromZard;
const chalk = require('chalk');


const def =  require.resolve('./default-input');
const defScope = require.resolve('./default-input-scope');

let filePath = path.join(__dirname, '/template/directive.js');
let template = fs.readFileSync(filePath, "utf-8");
let currentPath = process.cwd();

let pzData = {
    scopes: []
}

let validScope = function(data) {
    let types = {
        "object": 1,
        "string": 1,
        "number": 1,
        "function": 1,
        "boolean": 1
    }
    if(!data) {
        return {
            isValid: false,
            msg: 'error: 请输入'
        };
    }
    data = data.split(/\s+/);
    if(!(data.length >= 3 && data[0] && data[1] && data[2])) {
        return {
            isValid: false,
            msg: 'error: 格式有误'
        };
    }
    if(data[1] !== '=' && data[1] !== '@' && data[1] !== '&') {
        return {
            isValid: false,
            msg: 'error: "scopeType"'
        };
    }
    if(!types[data[2]]) {
        return {
            isValid: false,
            msg: 'error: "valueType"'
        };
    }
    return {
        isValid: true,
        data:{
            name: data[0],
            scopeType: data[1],
            valueType: data[2],
            disp: data[3] || '这里写描述'
        }
    };
}



let pzFn = function(backupFile) {
    return new Promise(function(resolve, reject) {
        let pz = new PZ(process.cwd()+'\.npm-init-'+(+new Date())+'.js', {yes: true})
        pz.backupFile = backupFile;
        pz.on('data', function (data) {
            resolve(data);
        });
    })
};

let resolveFn;
let pzScopeFn = function() {
    return new Promise(function(resolve, reject) {
        resolveFn = resolveFn || resolve;
        pzFn(defScope).then(function(data) {
            if(data.scope === 'N') {
                resolveFn(data);
            }
            else {
                let validData = validScope(data.scope)
                if(validData.isValid) {
                    pzData.scopes.push(validData.data);
                }
                else {
                    console.log(chalk.red(validData.msg))
                }
                return pzScopeFn()
            }
            
        });
    });
};

let creatHtml = function(data) {
    let tagStart = 'div';
    let tagEnd = 'div';
    let scopesText = '';
    if(data.restrict === 'E') {
        tagStart = data.directiveName;
        tagEnd = data.directiveName;
    }
    else {
        tagStart = 'div '+data.directiveName;
    }
    let setAttr = function(name) {
        return name.replace(/[A-Z]/g, function(value){
             return '-'+value.toLowerCase()}
        )
    }
    data.scopes.map(item => {
        if(item.scopeType === '@') {
            scopesText += ' '+`${setAttr(item.name)}="{{${item.name}}}"` + ' ';
        }
        else if(item.scopeType === '&' && item.valueType === 'function') {
            scopesText += ' '+`${setAttr(item.name)}="${item.name}()"` + ' ';
        }
        else {
            scopesText += ' '+`${setAttr(item.name)}="${item.name}"` + ' ';
        }
        
    })
    scopesText = scopesText.replace('  ', ' ');
    //"sfdsAdsf"
    return `<${tagStart} ${scopesText}></${tagEnd}>`;
}
let creatScopes = function(data) {
    var text = '';
    let noteFn = function(data) {
        let parentScopeValue = '';
        if(data.scopeType === '&' && data.valueType === 'function') {
            parentScopeValue = "function(){console.log('执行"+data.name+"函数')}";
        }
        return `//@scope ${data.name} ${data.disp} {type: "${data.valueType}", scopeType: "${data.scopeType}", parentScopeValue:"`+parentScopeValue+`"}`;
    }
    let scopeFn = function(data) {
        return `${data.name} : "${data.scopeType}"`;
    }
    let scopes = [];
    let dot = ','
    data.scopes.map((item, index) => {
        dot = data.scopes.length - 1 == index ? '' : dot;
        text += '                    '+noteFn(item) + '\r\n';
        text += '                    '+scopeFn(item) + dot + '\r\n';
    })
    return text;
}

let parseTemplate = function(pzData, template) {
    let key;
    let newTemplate = template;
    pzData.date = (new Date).toLocaleDateString();
    pzData.html = creatHtml(pzData)
    pzData.scopesData = creatScopes(pzData);
    for (key in pzData) {
        newTemplate = newTemplate.replace('${'+key+'}', pzData[key]);
    }
    return {
        path: path.join(currentPath, '/'+pzData.directiveName, '/'+pzData.directiveName+'.js'),
        dir: path.join(currentPath, '/'+pzData.directiveName),
        context: newTemplate,
        name: pzData.directiveName
    };
}

let writeFile = function() {
    let newFile = parseTemplate(pzData, template);
    let isHas = false;
    try {
        isHas = fs.readdirSync(newFile.dir);
    }
    catch(e) {}
    if(isHas) {
        console.log(chalk.red('创建'+newFile.name+'失败：已有此文件名称'));
       // return;
    }
    else {
        fs.mkdirSync(newFile.dir);
    }
    
    fs.writeFile(newFile.path, newFile.context, function() {
        console.log(chalk.green('创建'+newFile.name+'成功'))
    });
    
    
}

pzFn(def).then(function(data) {
    let key;
    for(key in data) {
        pzData[key] = data[key];
    }
    if(!data.directiveName || !data.noteName) {
        console.log(chalk.red('创建失败：Name或@name没有输入'));
        return;
    }
    if(data.scopes !== 'N') {
        console.log(chalk.yellow('格式:name scopeType valueType; 例:ngmodel @= object'));
        console.log(chalk.grey('scopeType: object || string || number || function || boolean'));
        pzData.scopes = [];
        pzScopeFn().then(function(data) {
            writeFile();
        });
    }
    else{
        writeFile();
    }
});



