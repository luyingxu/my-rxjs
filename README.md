# Rxjs（核心概念 + 简单实现）
## 使用方法
```js
import { Observable, map } from 'rxjs';

const source = new Observable((observer)=> {
    let i = 0;
    const timer = setInterval(()=> {
        observer.next(++i);
    }, 1000)
    setTimeout(()=> {
        observer.error('error');
    }, 2500);
    return function unsubscribe() {
        clearInterval(timer);
    };
})
const subscription = source
.pipe(
    map(item => item + 1),
    map(item => item * 10),
)
.subscribe({
    next: (v)=> { console.log(v)},
    error: (v) => { console.error('Error', v)},
    complete: (v) => { console.log('Complete')},
})

setTimeout(() => {
    subscription.unsubscribe();
}, 5500);

```
## 核心概念
1. Observable (创建， 订阅， 执行， 清理)
2. Observer （next, error, complete）
3. Operator (transform input Observable to another)
## 实现过程
### 数据生产与消费
- 测试驱动, 替换import
- [v1] 实现数据生产与消费（Observable + Observer）
    - 通过subscribe实现对function的调用
    - 目标： sync/async + multiple returns <img width="800" alt="image" src="https://user-images.githubusercontent.com/102499728/188781179-e281abfe-b92c-4cee-8e9d-2543cc921eaa.png">
    - TODO： 
    1. 缺少状态判断（完成状态以后不再生产、消费数据）
    2. 清理
- [v2] +状态判断, 完成了数据的生产与消费
    - Next： 数据处理  
### 数据处理
- [v3] 数据处理（operator）
    - map
- [v4] 链式处理 (pipe)


