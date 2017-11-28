# angularcode

angular 组件（指令）通过对注释的编译生成预览DEMO，方便组件的共享、复用。

### 如何使用

下载到全局：
```sh
npm i -g angulardoc
```

在组件当前目录中执行此命令后可打开预览页面
```sh
angulardoc -p
angulardoc --preview
```

在组件当前目录中执行此命令后把组件DEMO数据push到组件库中
```sh
angulardoc -push
```