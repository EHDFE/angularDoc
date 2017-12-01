# angularcode

angular 组件（指令）通过对注释的编译生成预览DEMO，方便组件的共享、复用。

### 如何使用

下载到全局：
```sh
npm i -g angulardoc
```

在组件当前目录中执行此命令后,可打开预览页面检验当前组件效果
```sh
angulardoc -r
```

在组件当前目录中执行此命令后,把组件注释编译后的数据push到组件库中
```sh
angulardoc -p
```

创建组件(angular directive)
```sh
angulardoc -c
```