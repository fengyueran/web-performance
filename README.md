# web-performance

### 名称解释:

- First Paint，FP

  首次绘制，这个指标表明首次绘制的时间点，也就是用户第一次看到白屏的时间点。

- First Contentful Paint，FCP

  首次内容绘制，表示一些"内容"被绘制到屏幕的时间点，比如文字、图片等的首次出现。如果首次内容绘制耗时太长，那么：

  - 你的网络连接可能有性能问题
  - 资源太过庞大（如 index.html），传输它们消耗太多时间

- First Meaningful Paint，FMP

  首次有意义绘制，表示页面的主要内容绘制的时间点。
  主要内容如博客的标题和文本、搜索引擎的搜索文本、重要的图片等。FMP=最大布局变化时的绘制，基于 Chromium 的实现，这个绘制是使用 LayoutAnalyzer 进行计算的，它会收集所有的布局变化，当布局发生最大变化时得出时间。而这个时间就是 FMP。

  如果主要内容很久都没有展示出来，那么：
  太多资源（图片、样式、字体、JavaScript）阻塞了 FMP。

- Speed Index

  速度指标，表示填充页面内容的速度。 此指标的分数越低越好。

- First CPU Idle

  最小的交互时间，表示页面(某个元素)刚好可以交互的最小时间。

- Time to Interactive

  页面交互时间，表示整个页面都可以交互的时间点。

- Estimated Input Latency

  预计输入延迟时间，即应用响应用户输入的时间。

### 存在的问题

通过 audits 诊断，drive 主要存在以下问题:

- 加载的资源较多，阻塞页面渲染
- 部分 css、js 未压缩
- 很多资源没有利用浏览器的缓存

### 提升性能的方法

- async/defer

  目前获得 css 的方式会阻塞页面的渲染，尝试添加 async/defer 关键字，使其不阻塞页面的渲染，如果是关键性资源则考虑内联。

- 压缩

  部分 css 没有压缩，可尝试 cssnano 和 csso 等方法。webpack 插件 optimize-css-assets-webpack-plugin 默认使用 cssnano。此外 cozy-client-js.js 也没有压缩，可进行压缩。

- 可以尝试 tree shaking

  分析 css 构成，删除没用的 css。

- 最大限度利用缓存

  利用 etag 和 expire 来让浏览器尽量使用缓存。
