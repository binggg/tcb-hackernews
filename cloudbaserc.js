module.exports = {
  envId: "bookerzhao-fid9t",
  functionRoot: "cloud/functions",
  functions: [
    {
      name: "hackernews-api",
      // 超时时间
      timeout: 5,
      // 运行时
      runtime: "Nodejs10.15",
      // 内存
      memorySize: 128,
      // 文件
      handler: "index.main",
    },
    {
      name: "openapi",
      // 超时时间
      timeout: 5,
      // 运行时
      runtime: "Nodejs10.15",
      // 内存
      memorySize: 128,
      // 文件
      handler: "index.main",
    },
  ],
};
