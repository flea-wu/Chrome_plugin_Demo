//和注入脚本进行通信
// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//     if (message === 'hello') {
//         sendResponse("后台js响应请求");
//     }
// })


// 后台脚本中的方法
function getWebCookies() {
    chrome.cookies.getAll({'domain': '.star.toutiao.com'}, (cks) => {
            let cookie = cks.map((item) => {
                return item.name + "=" + item.value
            }).join(";") + ";";
            console.log(cookie)
        }
    )
}

// 右键菜单
// type:类型

//普通菜单
chrome.contextMenus.create({
    type: 'normal',
    title: 'Menu A',
    id: 'a'
});

//单选菜单
chrome.contextMenus.create({
    type: 'radio',
    title: 'Menu B',
    id: 'b',
    checked: true // 默认选中
});

chrome.contextMenus.create({
    type: 'radio',
    title: 'Menu C',
    id: 'c'
});

//复选菜单
chrome.contextMenus.create({
    type: 'checkbox',
    title: 'Menu D',
    id: 'd',
    checked: true
});

//连续相邻的单选菜单会被自动认为是对同一设置的选项，同时单选菜单会自动在两端生成分割线。

// 在D和E之间主动添加分割线
chrome.contextMenus.create({
    type: 'separator'
});

chrome.contextMenus.create({
    type: 'checkbox',
    title: 'Menu E',
    id: 'e'
});


chrome.contextMenus.create({
    type: 'normal',
    title: 'Menu F',
    id: 'f',
    parentId: 'a'
});

chrome.contextMenus.create({
    type: 'normal',
    title: 'Menu G',
    id: 'g',
    parentId: 'a'
});

//自定义菜单 all、page、frame、selection、link、editable、image、video、audio和launcher
chrome.contextMenus.create({
    type: 'normal',
    title: 'My Menu',
    id: 'h',
    onclick: () => {
        chrome.tabs.create({url: 'http://www.duanyuer.com'})
    }
});


chrome.contextMenus.create({
    type: 'normal',
    title: '使用Google翻译……',
    id: 'cn',
    contexts: ['selection']
});


// 调用后台接口，返回抖大大达人链接

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    let responseData = {};
    if (request.cmd === "obtainUrlKey") {
        //ajax settimeout 等一系列异步操作时发现content_main response接不到回调值 undefined
        // ajax({
        //     type: 'post',
        //     // contentType: 'application/x-www-form-urlencoded',
        //     contentType: 'application/json; charset=utf-8',
        //     url: request.addurl,
        //     // data:{'documents':bibliographic_data},
        //     data: request.adddata,
        //     success: function (w) {
        //         if (w.code == 200) {
        //             //返回
        //             sendResponse({status: 1, msg: "保存成功!"});
        //         } else {
        //             sendResponse({status: 0, msg: "保存失败，错误代码1001"});
        //         }
        //         return true;
        //     },
        //     error: function (xhr, info, e,) {
        //         sendResponse({status: 0, msg: "保存失败，错误代码1002"});
        //     },
        // })

        // return true;//  原因在此   完美解决
        let params = {};
        params.nameList = request.data

        // console.log(JSON.stringify(params))
        let arr = [];
        for (let i = 0; i < 20; i++) {
            arr.push('https://www.doudada.com/');
        }
        axios.post("https://xcx.meizhuahuyu.com/plugins/userLink", params)
            .then(resp => {
                if (resp.data.code === 1001) {
                    responseData.data = resp.data.result;
                } else {
                    responseData.data = arr;
                }
                sendResponse(responseData);
                console.log(resp);
            }).catch(reason => {
                //出异常
            responseData.data = arr;
            sendResponse(responseData);
            console.log(reason);
        });

        // axios.get("http://ip.taobao.com/service/getIpInfo.php?ip=47.103.25.180")
        //     .then(resp => {
        //         console.log(resp);
        //     }).catch(reason => {
        //     console.log(reason);
        // })
    }
    // 必须添加
    return true;
})