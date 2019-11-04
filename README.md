# node-file-ops

## 这是什么

- 一堆样例代码
- Node.js 实例
- shell-script 实例

## Node.js 实例

1. md5-字串
2. md5-文件

## shell-script 实例

1. md5-文件

## 怎么用

- 直接copy-paste
- `node <js-file-path>`
- `bash <shell-file-path>`

## 性能思考

```shell
# node.js
21.15 MB - 72.00 ms: d50ea4536b72a17f305f1775626c0154
253.76 MB - 761.00 ms: 4d2bc62ba6840fb2cb2a569153cf019e
1.44 GB - 4.34 s: df3e5f32f79848aacc42afc2de94612f
5.56 GB - 18.63 s: af2080eb5e5d1f41ef6fa5de9c45a32a

# shell
21.15 MB - 0 s: d50ea4536b72a17f305f1775626c0154
253.75 MB - 0 s: 4d2bc62ba6840fb2cb2a569153cf019e
1.43 GB - 4.04 s: df3e5f32f79848aacc42afc2de94612f
5.55 GB - 12.12 s: af2080eb5e5d1f41ef6fa5de9c45a32a
```

现象: 文件大小会影响效率, 文件尺寸越大差异越大

可能原因: 差异存在的可能原因是计算update的次数, 若一次计算需要`准备update耗时 + 计算单位源码长度校验值耗时 * n * 文件块长度`,

整个文件计算会花费 `准备执行update耗时 + 计算单位源码长度校验值耗时 * n * 文件块长度`,

而stream方式则是 `n * (准备执行update耗时 + 计算单位源码长度校验值耗时 * 1 * 文件块长度)`,

差异在 `(n-1) * 准备执行update耗时`

***准备执行update耗时*** 指准备该函数的参数等耗时, 比如读取指定长度数据耗时

### **所以减少 *hash.update* 函数调用的次数(n)能缩小差异**
