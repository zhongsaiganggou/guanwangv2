@echo off
REM ============================================================
REM 中赛钢构自动发文系统 - 任务计划安装脚本
REM 用法：右键 -> 以管理员身份运行
REM ============================================================

echo ============================================================
echo 中赛钢构自动发文系统 - 安装任务计划程序
echo ============================================================
echo.

REM 检查管理员权限
net session >nul 2>&1
if %errorLevel% neq 0 (
    echo ❌ 错误：请以管理员身份运行此脚本！
    echo 右键点击此文件，选择"以管理员身份运行"
    echo.
    pause
    exit /b 1
)

echo ✅ 管理员权限确认
echo.

REM 创建任务计划程序
echo 正在创建任务计划程序...
schtasks /create /tn "ZhongSai_AutoPublisher" /tr "cmd.exe /c D:\zhongsai-website-v2\tools\auto-publisher\run-scheduled.bat" /sc weekly /d TUE,THU,SAT /st 10:00 /f

if %errorLevel% equ 0 (
    echo.
    echo ✅ 任务计划程序创建成功！
    echo.
    echo 任务名称: ZhongSai_AutoPublisher
    echo 运行时间: 每周二、四、六 上午10:00
    echo 运行脚本: D:\zhongsai-website-v2\tools\auto-publisher\run-scheduled.bat
    echo.
    echo ============================================================
    echo 验证任务计划...
    schtasks /query /tn "ZhongSai_AutoPublisher" /v /fo list | findstr /i "任务名 状态 下次运行时间 计划任务"
    echo ============================================================
) else (
    echo.
    echo ❌ 任务计划程序创建失败！
    echo 请检查错误信息并重试。
)

echo.
echo 按任意键退出...
pause >nul
