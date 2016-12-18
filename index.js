const fs = require('fs');
const argv = require('minimist')(process.argv.slice(2));

if (argv['f'] && argv['i']) {
    const CONF_PATH = argv['f'],
        IMG_URL = argv['i'],
        unit = argv['u']||"/@base",
        WIDTH = argv['w'],
        HEIGHT = argv['h']||'auto';
    let conf_obj = null,
        output = "",
        css = "",
        add = "";
    fs.readFile(CONF_PATH, 'utf8', (err, data) => {
        if (err) throw err;
        conf_obj = JSON.parse(data)['frames'];
        for (key in conf_obj) {
            item = conf_obj[key];
            css += 
`.${key}{
        width: ${item.w}${unit};
        height: ${item.h}${unit};
        background: url('${IMG_URL}') no-repeat -${item.x}${unit} -${item.y}${unit};`
if(WIDTH){
    css += 
`
        background-size:${WIDTH}${unit} ${HEIGHT}${unit};`
}
css +=`
}
`;

        }
         fs.writeFile('./test/test.less', css, function (err) {
                if (err) throw err;
                console.log('done');
            });
    });

} else {
    throw new Error('请输入json文件地址和图片地址!');
}