// 修改页面样式
// let elements = document.getElementsByClassName("newLogo")[0];
//
// elements.src = "https://dgss0.bdstatic.com/5bVWsj_p_tVS5dKfpU_Y_D3/res/r/image/2017-09-26/352f1d243122cf52462a2e6cdcb5ed6d.png"

// 发送请求
// const http = new XMLHttpRequest()
// let url = "https://star.toutiao.com/v/api/demand/author_list/?page=1&limit=20&need_detail=true&platform_source=1&task_category=1&order_by=score";
// http.open("GET",url)
// http.send()
//
// http.onreadystatechange = function() {
//     if (this.readyState === 4 && this.status === 200) {
//         console.log(http.responseText)
//     }
// }

// alert("111")
// let userNameList = document.getElementsByClassName("list-body");
//
// alert(userNameList)
// for (let i = 0; i < userNameList.length; i++) {
//     alert(userNameList[i])
// }
// alert("222")


// 在页面添加一个按钮
let htmlElement = document.createElement("div");
htmlElement.setAttribute("style", "background-color: red;\n" +
    "    width: 60px;\n" +
    "    position: fixed;\n" +
    "    right: 32px;\n" +
    "    bottom: 310px;\n" +
    "    z-index: 9000;" +
    "    font-size: 28px;" +
    "cursor: pointer;")
htmlElement.setAttribute("id", "freshBtn")
htmlElement.addEventListener("click", getDyuserUrl)
htmlElement.innerText = "点我刷新"
document.getElementsByTagName("body")[0].appendChild(htmlElement)

//获取名字的父节点
function getNamesNode() {
    return document.getElementsByClassName("name-sub");
}

//获取达人名字集合
function getAllNames() {
    let nameSubList = getNamesNode();
    let nameArr = [];
    for (let i = 0; i < nameSubList.length; i++) {
        nameArr.push(nameSubList[i].firstChild.textContent.trim())
    }
    return nameArr;
}

//通过传入到后台
function getDyuserUrl() {

    //名字数组
    let allNames = getAllNames();
    sendMsg(allNames, "obtainUrlKey")

}

function sendMsg(data, cmd) {
    chrome.extension.sendMessage({"data": data, "cmd": cmd}, function (response) {
        //返回结果
        let dataNode = response.data;
        let namesNodeList = getNamesNode();
        for (let j = 0; j < namesNodeList.length; j++) {
            let dataUrl = dataNode[j];
            let linkNode = document.createElement('a');
            linkNode.setAttribute("href", dataUrl);
            linkNode.setAttribute("target", "_blank");
            linkNode.addEventListener("click", function (e) {
                e.stopPropagation()
            });
            linkNode.textContent = "查看详情";
            if (namesNodeList[j].getElementsByTagName("a").length === 0) {
                namesNodeList[j].appendChild(linkNode);
            }
        }
    });
}


// chrome.extension(getURL , inIncognitoContext , lastError , onRequest , sendRequest)
// chrome.i18n
// chrome.runtime(connect , getManifest , getURL , id , onConnect , onMessage , sendMessage)
// chrome.storage