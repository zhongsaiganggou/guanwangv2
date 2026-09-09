// 生成管理员密码哈希工具
// 使用方法: node tools/generate-admin-password.js <your-password>

const crypto = require('crypto');

async function hashPassword(password) {
  const salt = crypto.randomBytes(16);
  const iterations = 100000;
  const keylen = 32;
  const digest = 'sha256';
  
  return new Promise((resolve, reject) => {
    crypto.pbkdf2(password, salt, iterations, keylen, digest, (err, derivedKey) => {
      if (err) reject(err);
      resolve({
        hash: derivedKey.toString('hex'),
        salt: salt.toString('hex'),
      });
    });
  });
}

async function main() {
  const password = process.argv[2];
  
  if (!password) {
    console.log('用法: node tools/generate-admin-password.js <你的密码>');
    console.log('');
    console.log('示例: node tools/generate-admin-password.js MySecurePassword123');
    process.exit(1);
  }
  
  console.log('正在生成密码哈希...');
  console.log('');
  
  const { hash, salt } = await hashPassword(password);
  
  console.log('========================================');
  console.log('  管理员密码配置（复制到Cloudflare环境变量）');
  console.log('========================================');
  console.log('');
  console.log(`ADMIN_USERNAME: admin`);
  console.log(`ADMIN_PASSWORD_HASH: ${hash}`);
  console.log(`ADMIN_PASSWORD_SALT: ${salt}`);
  console.log('');
  console.log('JWT_SECRET (随机生成，用于session签名):');
  const jwtSecret = crypto.randomBytes(32).toString('hex');
  console.log(`JWT_SECRET: ${jwtSecret}`);
  console.log('');
  console.log('========================================');
  console.log('  配置步骤:');
  console.log('========================================');
  console.log('1. 登录 Cloudflare Dashboard');
  console.log('2. 进入 Pages → zhongsai-website-v2 → Settings → Environment variables');
  console.log('3. 在 Production 环境添加以下变量:');
  console.log('   - ADMIN_USERNAME = admin');
  console.log('   - ADMIN_PASSWORD_HASH = (上面的哈希值)');
  console.log('   - ADMIN_PASSWORD_SALT = (上面的salt)');
  console.log('   - JWT_SECRET = (上面的JWT密钥)');
  console.log('   - GITHUB_TOKEN = (你的GitHub Personal Access Token)');
  console.log('4. 保存后重新部署');
  console.log('');
  console.log('⚠️  重要: GITHUB_TOKEN需要有repo权限，用于写入文章到GitHub仓库');
  console.log('   生成地址: https://github.com/settings/tokens');
}

main().catch(console.error);
