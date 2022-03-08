# 理由
由于天天都看着浏览器，所以想写一个浏览器插件

# 开发过程心得
真的坑
js一定要和html文件分开
在html中采用link引用js文件
在manifest.json中的background的scripts中一定要引用在html引用过的js文件才能生效
在manifest.json中的content_scripts的js中引用的js文件就是一登陆或者刷新网站的时候就会执行
相当于是一个很特殊的网页
该网页同样具有localstorage这些缓存

chrome.extension.getBackgroundPage()返回了background.html的window对象

# 插件基本原理
插件本身background.html 插件弹出pop.html
# 参考资料网址
http://chrome.cenchy.com/

