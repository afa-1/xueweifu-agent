#!/bin/bash

# 毕业服AI智能提案平台 - GitHub Pages 部署脚本

echo "🚀 开始部署到 GitHub Pages..."

# 构建项目
echo "📦 构建项目..."
npm run build

# 检查构建是否成功
if [ $? -ne 0 ]; then
    echo "❌ 构建失败，请检查错误信息"
    exit 1
fi

# 复制404.html到dist目录
echo "📄 复制404.html文件..."
cp public/404.html dist/

# 添加dist目录到git
echo "📁 添加构建文件到Git..."
git add dist -f
git commit -m "Deploy to GitHub Pages" || echo "No changes to commit"

# 推送到gh-pages分支
echo "🔄 推送到gh-pages分支..."
git subtree push --prefix=dist origin gh-pages 2>/dev/null || {
    echo "📝 创建gh-pages分支..."
    git subtree split --prefix=dist -b gh-pages
    git push origin gh-pages
}

echo "✅ 部署完成！"
echo "🌐 访问地址: https://afa-1.github.io/graduation-ai-platform/"