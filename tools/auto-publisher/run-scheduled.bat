@echo off
REM 中赛钢构自动发文系统 - 运行脚本
REM 每周二、四、六上午10点由Windows任务计划程序调用

cd /d D:\zhongsai-website-v2

REM 记录开始时间
echo ============================================================ >> tools\auto-publisher\logs\scheduler.log
echo [%date% %time%] 自动发文系统启动 >> tools\auto-publisher\logs\scheduler.log

REM 运行自动发文系统
python tools\auto-publisher\run.py >> tools\auto-publisher\logs\scheduler.log 2>&1

REM 记录结束时间
echo [%date% %time%] 自动发文系统结束 >> tools\auto-publisher\logs\scheduler.log
echo ============================================================ >> tools\auto-publisher\logs\scheduler.log
echo. >> tools\auto-publisher\logs\scheduler.log
