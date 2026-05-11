toolSystem-server/
├── src/
│ ├── features/ # 功能模块（核心）
│ │ ├── video-conversion/ # 功能1: 视频转换
│ │ │ ├── routes.js # 路由定义
│ │ │ ├── controller.js # 请求处理
│ │ │ ├── service.js # 业务逻辑
│ │ │ ├── schemas.js # JSON Schema校验
│ │ │ ├── queue.js # BullMQ队列（如果需要）
│ │ │ ├── worker.js # 独立Worker进程
│ │ │ ├── utils.js # 模块内部工具函数
│ │ │ └── index.js # 模块导出入口
│ │ │
│ │ ├── audio-extraction/ # 功能2: 音频提取
│ │ │ ├── routes.js
│ │ │ ├── controller.js
│ │ │ ├── service.js
│ │ │ ├── schemas.js
│ │ │ └── index.js
│ │ │
│ │ ├── thumbnail-generator/ # 功能3: 缩略图生成
│ │ │ ├── routes.js
│ │ │ ├── controller.js
│ │ │ ├── service.js
│ │ │ └── index.js
│ │ │
│ │ ├── video-compression/ # 功能4: 视频压缩
│ │ │ ├── routes.js
│ │ │ ├── controller.js
│ │ │ ├── service.js
│ │ │ └── index.js
│ │ │
│ │ └── user-upload/ # 功能5: 用户上传管理
│ │ ├── routes.js
│ │ ├── controller.js
│ │ ├── service.js
│ │ ├── schemas.js
│ │ └── index.js
│ │
│ ├── shared/ # 跨模块共享代码
│ │ ├── plugins/ # Fastify插件（全局）
│ │ │ ├── cors.js
│ │ │ ├── auth.js
│ │ │ ├── error-handler.js
│ │ │ └── rate-limit.js
│ │ │
│ │ ├── config/ # 配置管理
│ │ │ ├── index.js
│ │ │ └── environments/
│ │ │ ├── development.js
│ │ │ ├── staging.js
│ │ │ └── production.js
│ │ │
│ │ ├── utils/ # 通用工具函数
│ │ │ ├── logger.js
│ │ │ ├── fileHelper.js
│ │ │ ├── redisClient.js
│ │ │ └── validators.js
│ │ │
│ │ ├── middlewares/ # 全局中间件
│ │ │ ├── auth.js
│ │ │ ├── logging.js
│ │ │ └── fileUpload.js
│ │ │
│ │ ├── models/ # 数据模型（如果用了ORM）
│ │ │ ├── Task.js
│ │ │ └── User.js
│ │ │
│ │ └── constants/ # 全局常量
│ │ ├── errorCodes.js
│ │ └── fileTypes.js
│ │
│ └── app.js # Fastify实例注册
│
├── workers/ # 独立Worker进程（可选）
│ ├── conversion-worker.js
│ └── compression-worker.js
│
├── tests/ # 测试（按功能模块镜像）
│ ├── features/
│ │ ├── video-conversion/
│ │ └── audio-extraction/
│ └── shared/
│
├── scripts/ # 运维脚本
│ ├── deploy.sh
│ └── cleanup-uploads.js
│
├── uploads/ # 临时上传目录
├── outputs/ # 转换输出目录
├── logs/ # 日志目录
│
├── .env.example
├── .gitignore
├── package.json
└── README.md
