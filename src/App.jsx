import { Component, useState } from "react";
// 这个文件包含了一个React应用，展示了错误边界（Error Boundary）的使用方式。

// Boom组件：一个故意引发错误的组件
// 当渲染此组件时，它尝试访问未定义对象'foo'的属性，这会导致JavaScript错误



// App组件：主应用组件
// 包含两个按钮，分别用于触发：
// 1. 未捕获的错误 - 直接渲染Boom组件，会导致应用崩溃
// 2. 已捕获的错误 - 在ErrorBoundary内渲染Boom组件，错误会被捕获并显示备用UI

function Boom() {
  foo.bar = "baz";
}
// ErrorBoundary组件：一个错误边界类组件
// 错误边界是React中的特殊组件，可以捕获子组件树中的JavaScript错误
// 记录错误并显示备用UI，而不是让整个组件树崩溃
// 特点：
// 1. 使用class组件实现（函数组件不能作为错误边界）
// 2. 实现了getDerivedStateFromError静态方法来更新状态
// 3. 当子组件发生错误时，渲染备用UI而不是崩溃

function ErrorMessage({ error }) {
  return <h1>出错了！请稍后再试。</h1>;
}


class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    console.log('触发错误边界', error)
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      // 这里的错误提示信息可以自定义
      // return <h1>出错了！请稍后再试。</h1>;
      // 也可以根据需要显示更详细的错误信息或自定义UI组件
      return <ErrorMessage error={this.state.error} />
    }
    return this.props.children;
  }
}

export default function App() {
  const [triggerUncaughtError, settriggerUncaughtError] = useState(false);
  const [triggerCaughtError, setTriggerCaughtError] = useState(false);

  return (
    <>
      <button onClick={() => settriggerUncaughtError(true)}>
        Trigger uncaught error
      </button>
      {triggerUncaughtError && <Boom />}
      <button onClick={() => setTriggerCaughtError(true)}>
        Trigger caught error
      </button>
      {triggerCaughtError && (
        <ErrorBoundary>
          <Boom />
        </ErrorBoundary>
      )}
    </>
  );
}
