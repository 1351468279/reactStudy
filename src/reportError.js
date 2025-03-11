function reportError({ type, error, errorInfo }) {
  // The specific implementation is up to you.
  // `console.error()` is only used for demonstration purposes.
  // 检查错误类型并记录 
  if (type === "Uncaught") {
    console.error("检测到未捕获的错误");
  } else if (type === "Caught") {
    console.error("检测到已捕获的错误");
  } else if (type === "Recoverable") {
    console.error("检测到可恢复的错误");
  }
  
  // 如果有错误对象，记录错误信息和堆栈
  if (error) {
    console.error("错误信息:", error.message);
    console.error("错误堆栈:", error.stack);
  }
  // 如果有错误信息对象，记录组件堆栈
  if (errorInfo) {
    console.error("组件堆栈:", errorInfo.componentStack); 
    // 尝试复现错误代码
    if (error && error.stack) {
      const stackLines = error.stack.split('\n');
      console.log('stackLines',stackLines)
      // 检查是否有错误堆栈信息
      if (stackLines && stackLines.length > 0) {
        // 提取第一行作为错误类型和消息
        const errorMessage = stackLines[0];
        console.error("错误类型和消息:", errorMessage); 
        // 查找第一个包含实际代码位置的行（通常是第二行）
        const firstStackFrame = stackLines.length > 1 ? stackLines[1] : null;
        if (firstStackFrame) {
          console.error("错误发生位置:", firstStackFrame.trim());
          
          // 尝试提取函数名
          const functionMatch = firstStackFrame.match(/at\s+(\w+)/);
          if (functionMatch && functionMatch[1]) {
            console.error("错误发生在函数:", functionMatch[1]);
          }
          
          // 尝试提取文件路径
          const filePathMatch = firstStackFrame.match(/\((http[^:]+)/);
          if (filePathMatch && filePathMatch[1]) {
            console.error("错误文件:", filePathMatch[1]);
          }
        }
      }
      const errorLocation = stackLines.find(line => line.includes('.js:') || line.includes('.jsx:'));
      
      if (errorLocation) {
        console.error("错误位置:", errorLocation.trim());
        const match = errorLocation.match(/\((.+):(\d+):(\d+)\)/);
        if (match) {
          const [_, filePath, lineNumber, columnNumber] = match;
          console.error(`错误发生在文件 ${filePath} 的第 ${lineNumber} 行，第 ${columnNumber} 列`);
        }
      }
    }
  }
  console.error(type, error, "Component Stack: ");
  console.error("Component Stack: ", errorInfo.componentStack);
}

export function onCaughtErrorProd(error, errorInfo) {
  if (error.message !== "Known error") {
    reportError({ type: "Caught", error, errorInfo });
  }
}

export function onUncaughtErrorProd(error, errorInfo) {
  reportError({ type: "Uncaught", error, errorInfo });
}

export function onRecoverableErrorProd(error, errorInfo) {
  reportError({ type: "Recoverable", error, errorInfo });
}
